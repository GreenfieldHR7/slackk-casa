//const socket = require('../../client/src/socketHelpers/index.js');

// let server = location.origin.replace(/^http/, 'ws');

// socket.connect(server, this);

const responder = (task, workspaceId, message) => {
  if (task === 'news') {
  	console.log(task);
  	console.log(workspaceId);
  	console.log(message);


  	// socket.sendMessage({
  	//   username: 'helper-bot',
   //    text: message,
   //    workspaceId: 1,
  	// });
  } else if (task === 'notes') {
  	//
  } else if (task === 'reminders') {
  	//
  }
}


module.exports = {responder};