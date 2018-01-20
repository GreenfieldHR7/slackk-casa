const checkPoll = (message) => {
  const splitMessage = message.split(' "');
  let poll = { name: splitMessage[1], options: [] };
  if (splitMessage[0] === '/poll') {
    for (var i = 2; i < splitMessage.length; i++) {
      //removes extra '"' at the end of poll title and options
      splitMessage[i] = splitMessage[i].substr(0, splitMessage[i].length - 1);
      poll.options.push({ name: splitMessage[i], count: 0, users: []});
    }
    return poll;
  } else {
    return null;
  }
}

module.exports = { checkPoll };