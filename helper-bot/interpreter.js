const output = require('./responder.js');

const meanings = require('./tasks/meanings.js');
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
  } else if (text.indexOf('news') > -1 || text.indexOf('stories') > -1 || text.indexOf('headlines') > -1) {
  	let term = undefined;

  	words.forEach((word, index) => {
  	  let lowerCaseWord = word.toLowerCase();
  	  
  	  if (lowerCaseWord === 'on' || lowerCaseWord === 'about') {
  	  	term = words.slice(index + 1).join(' ');
  	  } 
  	});
	  news.newsFetcher(term, workspaceId, ws, wss);  
  } else if (text.indexOf('note') > -1 || text.indexOf('list') > -1 || text.indexOf('log') > -1) { 
    if (text.indexOf('add a') > -1 || text.indexOf('post a') > -1) {
      let note = undefined;
      let noteIndex = undefined;

      words.forEach((word, index) => {
        let lowerCaseWord = word.toLowerCase();
        
        if (lowerCaseWord === 'to') {
          noteIndex = index;
        }
      });

      if (noteIndex) {
        note = words.slice(noteIndex + 1).join(' ');
        notes.noteAdder(note, username, workspaceId, ws, wss);
      } else {
        errorMessage = `Hmm. I didn't quite get that. Try something like "/helper-bot add a note to pick up the groceries."`;
        output.responder(workspaceId, errorMessage, ws, wss);
      }
    } else if (text.indexOf('add') > -1 || text.indexOf('post') > -1) {
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
        errorMessage = `Hmm. I didn't quite get that. Try something like "/helper-bot add pick up the groceries to my to-do list."`;
        output.responder(workspaceId, errorMessage, ws, wss);
      }
    } else if (text.indexOf('send') > -1 || text.indexOf('show') > -1) {
      notes.notesFetcher(username, workspaceId, ws, wss);
    } else {
      errorMessage = `Hmm. I didn't quite get that. Try something like "/helper-bot add something to my notes" or "/helper-bot send me my to-do list."`;
      output.responder(workspaceId, errorMessage, ws, wss);
    }
  } else {
    meanings.processTextWithNLP(text, workspaceId, ws, wss);
  }
}


module.exports = {interpreter};

