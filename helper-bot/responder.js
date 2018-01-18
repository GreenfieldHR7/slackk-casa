const socket = require('../server/webSocket.js');
const db = require('../database');


const response = (code, message, method, data) =>
  JSON.stringify({
    code,
    message,
    method,
    data,
  });

const responder = async (task, workspaceId, message, ws, wss) => {
  if (task === 'news') {
    let postedMessage = await db.postMessage(
      message,
      'helper-bot',
      workspaceId,
    );
  
    [postedMessage] = postedMessage.rows;

    ws.send(response(201, 'Post success', 'POSTMESSAGE', postedMessage));

  	socket.updateEveryoneElse(ws, wss, response(200, 'New message', 'NEWMESSAGE', {
      message: postedMessage,
      workspaceId: workspaceId,
    }));

  } else if (task === 'notes') {
  	//
  } else if (task === 'reminders') {
  	//
  }
}


module.exports = {responder};