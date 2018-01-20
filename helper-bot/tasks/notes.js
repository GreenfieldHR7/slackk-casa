const output = require('../../helper-bot/responder.js');


const notes = {};

const noteAdder = (note, username, workspaceId, ws, wss) => {
	if (!notes[username]) {
		notes[username] = [];
	}

	if (notes[username].indexOf(note) === -1) {
		notes[username].push(note);
		let botAddMessageOnSuccess = `Hey ${username}, I\'ve added ${note} to your log.`;
		output.responder(workspaceId, botAddMessageOnSuccess, ws, wss);
	} else {
		let botAddMessageOnDuplicate = `Oops ${username}! Looks like ${note} is already in your log.`;
		output.responder(workspaceId, botAddMessageOnDuplicate, ws, wss);
	}
};

const notesFetcher = (username, workspaceId, ws, wss) => {
	if (notes[username]) {
		let noteList = notes[username].join(', ');
		let botFetchMessageOnSuccess = `Hey ${username}, here is your log: ${noteList}`;
		output.responder(workspaceId, botFetchMessageOnSuccess, ws, wss);
	} else {
		let botFetchMessageOnError = `Hey ${username}, I\'ve got some good news. Your log is empty.`;
	  output.responder(workspaceId, botFetchMessageOnError, ws, wss);
	}
};


module.exports = {noteAdder, notesFetcher};
