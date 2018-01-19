const output = require('./responder.js');

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

	    if (lowerCaseWord === 'tomorrow' || lowerCaseWord === 'next' || lowerCaseWord === 'in' || lowerCaseWord === 'on' || lowerCaseWord === 'at') {
  	  	if (timeIndex === undefined) {
  	  	  timeIndex = index;	
  	  	}
  	  }  	  
  	});

  	if (taskIndex && timeIndex) {
  	  task = words.slice(taskIndex + 1, timeIndex).join(' ');
  	  time = words.slice(timeIndex).join(' ');
      reminders.reminderMaker(task, time, username, workspaceId, ws, wss);
  	} else {
  	  errorMessage = 'Hmm. I didn\'t quite get that. Try something like "/helper-bot remind me to take out the trash 2 hours."';
  	  output.responder(workspaceId, errorMessage, ws, wss);
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
  } else if (text.indexOf('note') > -1 || text.indexOf('list') > -1 || text.indexOf('log') > -1) { 
    if (text.indexOf('add') > -1 || text.indexOf('post') > -1) {
      let note = undefined;
      let noteIndex = undefined;
      let commandIndex = undefined;

      words.forEach((word, index) => {
        let lowerCaseWord = word.toLowerCase();
        
        if (lowerCaseWord === 'add' || lowerCaseWord === 'post') {
          noteIndex = index;
        }

        if (lowerCaseWord === 'to') {
          if (commandIndex === undefined) {
            commandIndex = index;
          }
        }
      });

      if (noteIndex && commandIndex) {
        note = words.slice(noteIndex + 1, commandIndex).join(' ');
        notes.noteAdder(note, username, workspaceId, ws, wss);
      } else {
        errorMessage = 'Hmm. I didn\'t quite get that. Try something like "/helper-bot add pick up the groceries to my to-do list."';
        output.responder(workspaceId, errorMessage, ws, wss);
      }
    } else if (text.indexOf('send') > -1 || text.indexOf('show') > -1) {
      notes.notesFetcher(username, workspaceId, ws, wss);
    } else {
      errorMessage = 'Hmm. I didn\'t quite get that. Try something like "/helper-bot add something to my notes" or "/helper-bot send me my to-do list."';
      output.responder(workspaceId, errorMessage, ws, wss);
    }
  } else {
  	//invoke error handler -- connect this to NLP API**
    errorMessage = 'Hmm. I didn\'t quite get that. I can help with stuff like setting up reminders, creating to-do lists/ notes, and fetching the latest news.';
    output.responder(workspaceId, errorMessage, ws, wss);
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

// /helper-bot add take out the trash to my to do list
// /helper-bot add take out the trash to my notes
// /helper-bot post take out the trash to my notes
// /helper-bot post take out the trash to my log
// -----------------
// /helper-bot send me my notes
// /helper-bot show me my notes
// /helper-bot send me my to do list

// /helper-bot aaaahhhh!

