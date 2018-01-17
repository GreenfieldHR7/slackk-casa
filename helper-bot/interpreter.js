//const tasks = require('./tasks');

const interpreter = (text, username, workspaceId) => {
  let words = text.split(' ');
  let errorMessage = '';
  
  if (text.indexOf('remind') > -1) {
  	let task = undefined;
  	let taskIndex = undefined;
  	let timeToRemind = undefined;
  	let timeToRemindIndex = undefined;

  	words.forEach((word, index) => {
  	  let lowerCaseWord = word.toLowerCase();
  	  
  	  if (lowerCaseWord === 'to') {
  	  	taskIndex = index;
  	  }

	  if (lowerCaseWord === 'tomorrow' || lowerCaseWord === 'next' || lowerCaseWord === 'later' || lowerCaseWord === 'in' || lowerCaseWord === 'on') {
  	  	if (timeToRemindIndex === undefined) {
  	  	  timeToRemindIndex = index;	
  	  	}
  	  }  	  
  	});

  	if (taskIndex && timeToRemindIndex) {
  	  task = words.slice(taskIndex + 1, timeToRemindIndex).join(' ');
  	  timeToRemind = words.slice(timeToRemindIndex).join(' ');
	  
      //invoke tasks.reminder(task, timeToRemind);
	  console.log(task);
	  console.log(timeToRemind);
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
	
	//invoke tasks.newsfetcher(term);
	console.log(term);
  } else {
  	errorMessage = 'Hmm. I didn\'t quite get that. I can help with stuff like setting up reminders and fetching the latest news';
  	
  	//invoke error handler
  	console.log(errorMessage);
  }
}


module.exports = { interpreter };

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

