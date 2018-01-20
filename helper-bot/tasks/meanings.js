const rp = require('request-promise');
const TextRazor = require('textrazor');

//const config = require('../../config.js');
const output = require('../../helper-bot/responder.js');


const processTextWithNLP = (text, workspaceId, ws, wss) => {
  // let textRazor = new TextRazor(config.textRazerAPI_Token);
  // let content = text;
  // let options = { extractors: 'topics' }

  // textRazor.exec(content, options)
  //   .then(meaning => {
  //   	let errorMessage = `Hmm. I didn't quite catch that. Unfortunately, I can only help with stuff like setting up reminders, creating to-do lists/ notes, and fetching the news.`;

  //   	if (meaning.response.coarseTopics) {
	 //    	let topics = [];
    		
	 //    	meaning.response.coarseTopics.forEach(topic => {
	 //    		topics.push(topic.label.toLowerCase());
	 //    	});

		//     errorMessage = `Hmm. It looks like you are looking for help with ${topics[0]} or ${topics[1]}. Unfortunately, I can only help with stuff like setting up reminders, creating to-do lists/ notes, and fetching the news.`;
  //   	}

	 //    output.responder(workspaceId, errorMessage, ws, wss);
  //   }) 
  //   .catch(err => {
  //   	console.error(err);
  //   })
}


module.exports = {processTextWithNLP};
