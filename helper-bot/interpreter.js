const responder = require('./responder.js');

const news = require('./tasks/news.js');
const notes = require('./tasks/notes.js');
const reminders = require('./tasks/reminders.js');


const interpreter = (text, username, workspaceId, ws, wss) => {
  let words = text.split(' ');
  let errorMessage = '';
  
  if (text.indexOf('remind') > -1) {
  	let task = undefined;
  	let taskIndex = undefined;
  	let time = undefined;
  	let timeIndex = undefined;

  	words.forEach((word, index) => {
  	  let lowerCaseWord = word.toLowerCase();
  	  
  	  if (lowerCaseWord === 'to') {
  	  	taskIndex = index;
  	  }

	  if (lowerCaseWord === 'tomorrow' || lowerCaseWord === 'next' || lowerCaseWord === 'later' || lowerCaseWord === 'in' || lowerCaseWord === 'on') {
  	  	if (timeIndex === undefined) {
  	  	  timeIndex = index;	
  	  	}
  	  }  	  
  	});

  	if (taskIndex && timeIndex) {
  	  task = words.slice(taskIndex + 1, timeIndex).join(' ');
  	  time = words.slice(timeIndex).join(' ');
	  
      reminders.reminderMaker(task, time, workspaceId);
  	} else {
  	  errorMessage = 'Hmm. I didn\'t quite get that. Try something like "/helper-bot remind me to take out the trash tomorrow at 5pm"';
  	  
  	  //invoke error handler
  	  console.log(errorMessage);
  	}
  } else if (text.indexOf('news') > -1 || text.indexOf('stories') > -1) {
  	let term = undefined;

  	words.forEach((word, index) => {
  	  let lowerCaseWord = word.toLowerCase();
  	  
  	  if (lowerCaseWord === 'on' || lowerCaseWord === 'about') {
  	  	term = words.slice(index + 1).join(' ');
  	  } 
  	});
	
	news.newsFetcher(term, workspaceId, ws, wss);
  } else {
  	errorMessage = 'Hmm. I didn\'t quite get that. I can help with stuff like setting up reminders and fetching the latest news';
  	
  	//invoke error handler
  	console.log(errorMessage);
  }
}


module.exports = { interpreter };

// VALID INPUT FORMATS
// /helper-bot remind me to take out the trash tomorrow at 5pm
// /helper-bot remind me to pack later today
// /helper-bot remind me to pack later next week
// /helper-bot remind me to brush my teeth in 60 seconds
// /helper-bot remind me to take out the trash on Sunday
// /helper-bot remind aaaaahhhhhhh!

// /helper-bot send me stories about cats
// /helper-bot send me news on cats
// /helper-bot send me stories about cats
// /helper-bot send me news

// /helper-bot aaaahhhh!

