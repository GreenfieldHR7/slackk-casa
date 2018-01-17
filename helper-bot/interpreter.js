

//const tasks = require('./tasks');

const interpreter = (text, username, workspaceId) => {
  if (text.indexOf('remind') > -1) {
  	console.log('reminder');
  } else if (text.indexOf('news') > -1) {
  	console.log('news');
  } else {
  	console.log('error');
  }
}


module.exports = { interpreter };

//remind me to take out the trash tomorrow at 5pm

//send me news
//send me news about cats
//send me news on cats