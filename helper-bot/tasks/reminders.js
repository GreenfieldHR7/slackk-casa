const output = require('../../helper-bot/responder.js');

const at_Handler = require('./handlers/at.js');
const in_Handler = require('./handlers/in.js');
const next_Handler = require('./handlers/next.js');
const nextAt_Handler = require('./handlers/nextAt.js');
const on_Handler = require('./handlers/on.js');
const onAt_Handler = require('./handlers/onAt.js');
const tomorrow_Handler = require('./handlers/tomorrow.js');
const tomorrowAt_Handler = require('./handlers/tomorrowAt.js');


const reminderMaker = (task, timeText, username, workspaceId, ws, wss) => {
  let maxTimeOut = 604801; //number of seconds in seven days
  let immediateBotMessageOnError;
  let timeOut;

	//on Sunday at 5pm
  if (timeText.indexOf('on') > -1 && timeText.indexOf('at') > -1) {
  	console.log('on Sunday at 5pm');

	//tomorrow at 5pm
  } else if (timeText.indexOf('tomorrow') > -1 && timeText.indexOf('at') > -1) {
  	console.log('tomorrow at 5pm');

	//next Tuesday at 5pm
  } else if (timeText.indexOf('next') > -1 && timeText.indexOf('at') > -1) {
  	console.log('next Tuesday at 5pm');

	//in 60 seconds
  } else if (timeText.indexOf('in') > -1) {
  	timeOut = in_Handler.timeOutCalculator(timeText);

	//at 5pm
  } else if (timeText.indexOf('at') > -1) {
  	timeOut = at_Handler.timeOutCalculator(timeText);

	//on Sunday
  } else if (timeText.indexOf('on') > -1) {
  	timeOut = on_Handler.timeOutCalculator(timeText);

	//tomorrrow
  } else if (timeText.indexOf('tomorrow') > -1) {
  	timeOut = tomorrow_Handler.timeOutCalculator(timeText);

	//next Tuesday -- treats this as the next upcoming Tuesday (e.g. saying next Tuesday on Monday would equate to tomorrow)
  } else if (timeText.indexOf('next') > -1) {
  	timeOut = next_Handler.timeOutCalculator(timeText);

	//error
  } else {
  	timeOut = undefined;
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


module.exports = {reminderMaker};

// VALID INPUT FORMATS
// /helper-bot remind me to brush my teeth in 60 seconds
// /helper-bot remind me to brush my teeth in 2 minutes
// /helper-bot remind me to brush my teeth in 3 hours

// /helper-bot remind me to take out the trash on Sunday
// /helper-bot remind me to take out the trash at 5pm
// /helper-bot remind me to take out the trash tomorrow at 5pm
// /helper-bot remind me to take out the trash next week
