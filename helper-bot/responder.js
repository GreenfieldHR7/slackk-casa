const socket = require('../server/webSocket.js');
const db = require('../database');


const response = (code, message, method, data) =>
  JSON.stringify({
    code,
    message,
    method,
    data,
  });

const sendBotMessage = async (workspaceId, message, ws, wss) => {
  let postedMessage = await db.postMessage(
    message,
    'helper-bot',
    workspaceId,
  );

  [postedMessage] = postedMessage.rows;
  ws.send(response(201, 'Post success', 'POSTMESSAGE', postedMessage));

	socket.updateEveryoneElse(
	  ws, 
	  wss, 
	  response(200, 'New message', 'NEWMESSAGE', {
      message: postedMessage,
      workspaceId: workspaceId,
    })
  );  
}

//don't need the control flow
const responder = (task, workspaceId, message, ws, wss) => {
  if (task === 'news') {
    sendBotMessage(workspaceId, message, ws, wss);
  } else if (task === 'notes') {
  	sendBotMessage(workspaceId, message, ws, wss);
  } else if (task === 'reminders') {
  	sendBotMessage(workspaceId, message, ws, wss);
  } else if (task === 'error') {
    sendBotMessage(workspaceId, message, ws, wss);
  }
}


module.exports = {responder};