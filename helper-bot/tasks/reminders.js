const output = require('../../helper-bot/responder.js');


const reminderMaker = (task, time, username, workspaceId) => {
  let timeInterval = undefined;
  let immediateBotMessageOnError = '';
  let immediateBotMessageOnSuccess = '';
  let timedBotMessageOnSuccess = '';
  
  //do logic to try to set timeInterval

  if (timeInterval) {
  	//
  } else {
	  immediateBotMessageOnError = `Hey ${username}, I couldn't work out when you wanted me to remind you to ${task}. Please try again.`;
	  console.log(immediateBotMessageOnError);
  	//output.responder('reminders', workspaceId, immediateBotMessageOnError, ws, wss);
  }
};


module.exports = {reminderMaker};

// VALID INPUT FORMATS
// /helper-bot remind me to take out the trash tomorrow at 5pm
// /helper-bot remind me to pack later today
// /helper-bot remind me to pack later next week
// /helper-bot remind me to brush my teeth in 60 seconds
// /helper-bot remind me to take out the trash on Sunday
// /helper-bot remind aaaaahhhhhhh!