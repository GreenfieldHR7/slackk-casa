let ws = null;
let app = null;
let sent = false;
const beep = new Audio('/sounds/pling.wav'); // sound on receive msg
const oneup = new Audio('/sounds/coin.wav'); // sound on send msg

const getUniqueUsernamesFromMessages = (users) => {
  let uniqueUsernames = [];
  for (let i = 0; i < users.length; i++) {
    uniqueUsernames.push(users[i].username);
  }
  return [...new Set(uniqueUsernames)];
};

const loadUsers = users => {
  let usernames = getUniqueUsernamesFromMessages(users);
  app.setState({usernames});
}

/* takes in an array of messages
  objects and sets the component state messages
  with the new array of messages recieved */
const loadMessages = (messages) => {
  app.setState({ messages });
};

/* takes in message as object
   msg ({id: INT, text: STRING, createdAt: DATE, workspaceId: INT})
   and concats message to message state of app */
const addNewMessage = (message) => {
  if (sent) {
    sent = false;
  } else {
    beep.play();
  }
  app.setState({ messages: [...app.state.messages, message] });
};

// takes in an array of users and sets the current app state
const setUsers = (users) => {
  app.setState({ users });
};

// takes in a parameter and sends that parameter to the socket server
const sendMessage = (data) => {
  const msg = {
    method: 'POSTMESSAGE',
    data: {
      username: data.username,
      text: data.text,
      workspaceId: data.workspaceId,
    },
  };
  oneup.play();
  sent = true;
  ws.send(JSON.stringify(msg));
  getUsersInChannel(data.workspaceId);  // updates users select options
};

// takes a workspace Id as INT for parameter and returns the messages for that current workspace
const getWorkSpaceMessagesFromServer = (id) => {
  const msg = { method: 'GETMESSAGES', data: { workspaceId: id } };
  ws.send(JSON.stringify(msg));
};

const getUsersInChannel = (id) => {
  const msg = { method: 'GETUSERSINCHANNEL', data: { workspaceId: id } };
  ws.send(JSON.stringify(msg));
};

const getMessagesOfUser = (user, workSpaceId) => {
  const msg = { method: 'GETMESSAGESOFUSER', data: { user, workspaceId: workSpaceId } };
  ws.send(JSON.stringify(msg));
};

// Looks at a message to see if a user was mentioned and returns users mentioned
const getUsersMentioned = (msg) => {
  let potentialUsers = [];

  const splitByMention = msg.split('@');
  splitByMention.splice(0, 1);

  for (var i = 0; i < splitByMention.length; i++) {
    let indexOfSpace = splitByMention[i].indexOf(' ');
    //in case @user is the last message
    if (indexOfSpace === -1) {
      indexOfSpace = splitByMention[i].length;
    }
    potentialUsers.push(splitByMention[i].substring(0, indexOfSpace));
  }
  return { names: potentialUsers, isNotified: false };
};

//notifies users in the mentioned workspace
const notifyUsersMentioned = (msg) => {
  const workspaceId = msg.workspaceId
  const usersMentioned = getUsersMentioned(msg.message.text);
  const notificationMessage = `New mention from ${msg.message.username}`;
  app.setState({ workspaceMentioned: [...app.state.workspaceMentioned, { usersMentioned, workspaceId, notificationMessage }] });
}

// takes in all new messages and filters and concats messages that match the current workSpace
const filterMsgByWorkSpace = (msg) => {
  if (sent) {
    sent = false;
  } else {
    beep.play();
  }

  if (msg.workspaceId === app.state.currentWorkSpaceId) {
    app.setState({ messages: [...app.state.messages, msg.message] });
  }
};

// ws refers to websocket object
const afterConnect = () => {
  ws.onmessage = (event) => {
    let serverResp = JSON.parse(event.data);
    // TODO: better error handling. Temp till complete switch statements
    if (serverResp.code === 400) {
      console.log(serverResp.method);
      throw serverResp.message;
    }

    switch (serverResp.method) {
      case 'GETMESSAGES':
        loadMessages(serverResp.data);
        break;
      case 'NEWMESSAGE':
        filterMsgByWorkSpace(serverResp.data);
        notifyUsersMentioned(serverResp.data);
        break;
      case 'GETUSERS':
        setUsers(serverResp.data);
        break;
      case 'POSTMESSAGE':
        addNewMessage(serverResp.data);        
        break;
      case 'GETMESSAGESOFUSER':
        loadMessages(serverResp.data);
        break;
      case 'GETUSERSINCHANNEL':
        loadUsers(serverResp.data);
        break;
      default:
    }
  };
};

// takes in server ip or wss protocall to connect to server
// takes in component to have scope in function
const connect = (server, component) => {
  // create new socket server instance
  ws = new WebSocket(server);
  app = component;
  // on connection run the callback
  ws.addEventListener('open', () => {
    console.log('Connected to the server');
    // sets state to current socket session for App methods to have access
    app.setState({ ws });

    // gets workspaces after connection
    app.loadWorkSpaces();

    // calls after connect function that takes in the socket session
    // and app component
    afterConnect();
  });
};

export { connect, sendMessage, afterConnect, getWorkSpaceMessagesFromServer, getMessagesOfUser, getUsersInChannel };
