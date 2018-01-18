const output = require('../../helper-bot/responder.js');


const reminderMaker = (task, timeText, username, workspaceId, ws, wss) => {
  let maxTimeOut = 604801; //seven days in seconds
  let immediateBotMessageOnError;
  
  let timeOut = timeCalculator(timeText);

  if (timeText.indexOf('on') > -1 && timeText.indexOf('at') > -1) {
  	//on Sunday at 5pm
  	console.log('on Sunday at 5pm');

  } else if (timeText.indexOf('tomorrow') > -1 && timeText.indexOf('at') > -1) {
  	//tomorrow at 5pm
  	console.log('tomorrow at 5pm');

  } else if (timeText.indexOf('next') > -1 && timeText.indexOf('at') > -1) {
  	//next Tuesday at 5pm
  	console.log('next Tuesday at 5pm');

  } else if (timeText.indexOf('on') > -1) {
  	//on Sunday
  	console.log('on Sunday');

  } else if (timeText.indexOf('at') > -1) {
  	//at 5pm
  	console.log('at 5pm');

  } else if (timeText.indexOf('in') > -1) {
  	//in 60 seconds
  	console.log('in 60 seconds');

  } else if (timeText.indexOf('tomorrow') > -1) {
  	//tomorrrow
  	console.log('tomorrow');

  } else if (timeText.indexOf('next') > -1) {
  	//next Tuesday
  	console.log('next Tuesday');

  } else {
  	//error
  	console.log('error');
  }

  //valid inputs within allowable range
  if (timeOut < maxTimeOut) {
	  let immediateBotMessageOnSuccess = `Got it, ${username}. I'm going to send you a reminder to ${task} ${timeText}.`;
	  let timedBotMessageOnSuccess = `Yo ${username}, this is a reminder to ${task}.`;

	  output.responder('reminders', workspaceId, immediateBotMessageOnSuccess, ws, wss);

  	setTimeout(() => {
  		output.responder('reminders', workspaceId, timedBotMessageOnSuccess, ws, wss)
  	}, timeOut * 1000);
  
  //valid inputs outside of allowable range
  } else if (timeOut > maxTimeOut) {
  	immediateBotMessageOnError = `Wow! Sorry ${username}, but I refuse to set reminders past 7 days. I simply will not do it.`;
    output.responder('reminders', workspaceId, immediateBotMessageOnError, ws, wss);
	
  //invalid input(s)
	} else {
	  immediateBotMessageOnError = `Hey ${username}, I couldn't work out when you wanted me to remind you to ${task}. Please try again.`;
  	output.responder('reminders', workspaceId, immediateBotMessageOnError, ws, wss);
  }
};

//only handles numbers (1,2,3...) not one, two, three
const timeCalculator = (timeText) => {
	let timeInputs = timeText.split(' ');
	let validTimeTableInput = false;
	let validNumberInput = false;
	let timeOut = 1;

	timeInputs.forEach(input => {
		for (let key in timeTable) {
			if (input.indexOf(key) > -1) {
				timeOut *= timeTable[key];
				validTimeTableInput = true;
			}
		}

		if (parseInt(input)) {
			timeOut *= input;
			validNumberInput = true;
		}
	});

	return validTimeTableInput && validNumberInput  ? timeOut : undefined;
};

const timeTable = {
	second: 1,
	minute: 60,
	hour: 60 * 60,
	day: 60 * 60 * 24
};

const weekTable = {
	mon: 1,
	tue: 2,
	wed: 3,
	thu: 4,
	fri: 5,
	sat: 6,
	sun: 7
};


module.exports = {reminderMaker};

// VALID INPUT FORMATS
// /helper-bot remind me to brush my teeth in 60 seconds
// /helper-bot remind me to brush my teeth in 2 minutes
// /helper-bot remind me to brush my teeth in 3 hours

// /helper-bot remind me to take out the trash on Sunday
// /helper-bot remind me to take out the trash at 5pm
// /helper-bot remind me to take out the trash tomorrow at 5pm
// /helper-bot remind me to take out the trash next week
