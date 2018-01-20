let ws = null;
let app = null;
let sent = false;
let sentType = false;
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

// send typing status to client
let timer = null;
const addTypeStatus = (message) => {
  app.setState({
    typer: message.data.username,
    typerWorkSpaceId: message.data.workspaceId,
    renderTyping: true
  })
  
  if (timer) clearInterval(timer)
  timer = setTimeout(() => app.setState({renderTyping: false}), 500)
}

// use keydown to track if the user is typing or not, pass username and workspaceid
const sendTypeStatus = (data) => {
  const msg = {
    method: 'SENDTYPESTATUS',
    data: {
      username: data.username,
      workspaceId: data.workspaceId,
    },
  };
  sentType = true;
  ws.send(JSON.stringify(msg));
}

const sendDirectMessage = (data) => {
  const msg = {
    method: 'POSTDIRECTMESSAGE',
    data: {
      username: data.username,
      text: data.text,
      privateChannelId: data.privateChannelId,
    },
  };
  oneup.play();
  sent = true;
  ws.send(JSON.stringify(msg));
}

// takes a workspace Id as INT for parameter and returns the messages for that current workspace
const getWorkSpaceMessagesFromServer = (id) => {
  const msg = { method: 'GETMESSAGES', data: { workspaceId: id } };
  ws.send(JSON.stringify(msg));
};

const getPrivateChannelMessagesFromServer = (id) => {
  const msg = { method: 'GETDIRECTMESSAGES', data: { privateChannelId: id } };
  ws.send(JSON.stringify(msg));
}

const getUsersInChannel = (id) => {
  const msg = { method: 'GETUSERSINCHANNEL', data: { workspaceId: id } };
  ws.send(JSON.stringify(msg));
};

const getMessagesOfUser = (user, workSpaceId) => {
  const msg = { method: 'GETMESSAGESOFUSER', data: { user, workspaceId: workSpaceId } };
  ws.send(JSON.stringify(msg));
};

const updatePoll = (data, workspaceId, messageId) => {
  const msg = { method: 'UPDATEPOLL', data: { data, workspaceId, messageId } };
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

  //notifies users in the mentioned workspace
  const workspaceId = msg.workspaceId;
  const usersMentioned = getUsersMentioned(msg.message.text);
  const notificationMessage = `New mention from ${msg.message.username}`;
  app.setState({ workspaceMentioned: [...app.state.workspaceMentioned, { usersMentioned, workspaceId, notificationMessage }] });

  if (msg.workspaceId === app.state.currentWorkSpaceId) {
    app.setState({ messages: [...app.state.messages, msg.message] });
  }
};

const filterMsgByPrivateChannel = (msg) => {
  if (sent) {
    sent = false;
  } else {
    beep.play();
  }
  // app.loadPrivateChannels();  // sending message to new user which isn't in privateChannels state yet
  // let privateChannels = app.state.privateChannels;
  // for (let i = 0; i < privateChannels.length; i++) {
  //   if (privateChannels[i].id === msg.privateChannelId) {
  //     if (msg.privateChannelId === app.state.currentPrivateChannelId) {
  //       // user got message at current private channel
  //       app.setState({ messages: [...app.state.messages, msg.message] });        
  //     } else {
  //       alert(`${msg.message.username} sent you a new message`);
  //     }
  //   }
  // }
  app.loadPrivateChannels(msg)  // sending message to new user which isn't in privateChannels state yet
 
}


// ws refers to websocket object
const afterConnect = () => {
  ws.onmessage = (event) => {
    let serverResp = JSON.parse(event.data);
    // TODO: better error handling. Temp till complete switch statements
    if (serverResp.code === 400) {
      console.log(serverResp)
      console.log(serverResp.method);
      throw serverResp.message;
    }
    switch (serverResp.method) {
      case 'GETMESSAGES':
        loadMessages(serverResp.data);
        break;
      case 'GETDIRECTMESSAGES':
        loadMessages(serverResp.data);
      case 'NEWMESSAGE':
        filterMsgByWorkSpace(serverResp.data);
        notifyUsersMentioned(serverResp.data);
        break;
      // new direct message from other user
      case 'NEWDIRECTMESSAGE':
        filterMsgByPrivateChannel(serverResp.data);
        break;
      case 'GETUSERS':
        setUsers(serverResp.data);
        break;
      case 'POSTMESSAGE':
        addNewMessage(serverResp.data);        
        break;
      case 'POSTDIRECTMESSAGE':
      console.log(serverResp);
        addNewMessage(serverResp.data);        
        break;
      case 'GETMESSAGESOFUSER':
        loadMessages(serverResp.data);
        break;
      case 'GETUSERSINCHANNEL':
        loadUsers(serverResp.data);
        break;
<<<<<<< HEAD
      case 'UPDATEPOLL':
        loadMessages(serverResp.data);
        break;
      case 'SENDTYPESTATUS':
        addTypeStatus(serverResp.data);
=======
      case 'SENDTYPESTATUS':
        addTypeStatus(serverResp.data);
        break;
      // new direct message from other user
      case 'NEWDIRECTMESSAGE':
        filterMsgByPrivateChannel(serverResp.data);
>>>>>>> Merge
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

    // gets private channels after connection
    app.loadPrivateChannels();

    // calls after connect function that takes in the socket session
    // and app component
    afterConnect();
  });
};

export { 
  connect, 
  sendMessage, 
  afterConnect, 
  getWorkSpaceMessagesFromServer, 
  getMessagesOfUser, 
  getUsersInChannel,
  getPrivateChannelMessagesFromServer,
<<<<<<< HEAD
  updatePoll
};
=======
  sendDirectMessage
};
>>>>>>> Implement post direct message live
