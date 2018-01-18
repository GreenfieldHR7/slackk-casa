const output = require('../../helper-bot/responder.js');


const reminderMaker = (task, timeMessage, username, workspaceId) => {
  let maxTimeOut = 604801; //seven days in seconds
  let immediateBotMessageOnError;
  
  let timeOut = timeCalculator(timeMessage);

  if (timeOut < maxTimeOut) {
	  let immediateBotMessageOnSuccess = `Got it, ${username}. I'm going to send you a reminder to ${task} ${timeMessage}`;
	  let timedBotMessageOnSuccess = `Yo ${username}, this is a reminder to ${task}`;

	  console.log(immediateBotMessageOnSuccess);

  	setTimeout(() => {
  		console.log(timedBotMessageOnSuccess)	
  	}, timeOut * 1000);
  } else if (timeInterval > maxTimeOut) {
  	//
	} else {
	  immediateBotMessageOnError = `Hey ${username}, I couldn't work out when you wanted me to remind you to ${task}. Please try again.`;
  	//output.responder('reminders', workspaceId, immediateBotMessageOnError, ws, wss);
  }
};

const timeCalculator = (timeMessage) => {
	let timeInputs = timeMessage.split(' ');
	let timeOut = 1;

	timeInputs.forEach(input => {
		for (let key in timeTable) {
			if (input.indexOf(key) > -1) {
				timeOut *= timeTable[key];
			}
		}

		if (parseInt(input)) {
			timeOut *= input;
		}
	});

	return timeOut;
};

const timeTable = {
	second: 1,
	minute: 60,
	hour: 60 * 60,
	day: 60 * 60 * 24
};


module.exports = {reminderMaker};

// VALID INPUT FORMATS
// /helper-bot remind me to brush my teeth in 60 seconds
// /helper-bot remind me to brush my teeth in 2 minutes
// /helper-bot remind me to brush my teeth in 3 hours

// /helper-bot remind me to take out the trash tomorrow at 5pm
// /helper-bot remind me to pack later today
// /helper-bot remind me to pack later next week
// /helper-bot remind me to take out the trash on Sunday
