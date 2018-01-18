const output = require('../../helper-bot/responder.js');


const reminderMaker = (task, time, workspaceId) => {
  console.log(task);
  console.log(time);

  //reminder = 'I will remind you to x in y'
  //output.responder('reminders', workspaceId, reminder, ws, wss);
};


module.exports = {reminderMaker};

// VALID INPUT FORMATS
// /helper-bot remind me to take out the trash tomorrow at 5pm
// /helper-bot remind me to pack later today
// /helper-bot remind me to pack later next week
// /helper-bot remind me to brush my teeth in 60 seconds
// /helper-bot remind me to take out the trash on Sunday
// /helper-bot remind aaaaahhhhhhh!