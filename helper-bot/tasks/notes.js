const output = require('../../helper-bot/responder.js');


const notes = {};

const noteAdder = (note, username, workspaceId, ws, wss) => {
	if (!notes[username]) {
		notes[username] = [];
	}

	if (notes[username].indexOf(note) === -1) {
		notes[username].push(note);
		let botAddMessageOnSuccess = `Hey ${username}, I\'ve added ${note} to your log.`;
		output.responder('notes', workspaceId, botAddMessageOnSuccess, ws, wss);
	} else {
		let botAddMessageOnDuplicate = `Oops ${username}! Looks like ${note} is already in your log.`;
		output.responder('notes', workspaceId, botAddMessageOnDuplicate, ws, wss);
	}
};

const notesFetcher = (username, workspaceId, ws, wss) => {
	if (notes[username]) {
		let noteList = notes[username];
		let botFetchMessageOnSuccess = `Hey ${username}, here is your log: ${noteList}`;

		console.log(botFetchMessageOnSuccess);
		output.responder('notes', workspaceId, botFetchMessageOnSuccess, ws, wss);
	} else {
		let botFetchMessageOnError = `Hey ${username}, I\'ve got some good news. Your log is empty.`;
	  output.responder('notes', workspaceId, botFetchMessageOnError, ws, wss);
	}
};


module.exports = {noteAdder, notesFetcher};