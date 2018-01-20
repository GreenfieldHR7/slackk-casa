const request = require('request');
const config = require('../../config.js');
const output = require('../../helper-bot/responder.js');


const newsFetcher = (term, workspaceId, ws, wss) => {
  if (term) {
  	let options = { 
  	  method: 'GET',
      url: 'https://newsapi.org/v2/everything',
      qs: { 
      	q: term,
      	sortBy: 'popularity',
      	apiKey: config.googleNewsAPI_Token
      },
      json: true
    };

    requester(options, workspaceId, ws, wss);
  } else {
  	let options = { 
  	  method: 'GET',
      url: 'https://newsapi.org/v2/top-headlines',
      qs: { 
      	country: 'us', 
      	apiKey: config.googleNewsAPI_Token
      },
      json: true
    };

    requester(options, workspaceId, ws, wss);
  }
};

const requester = (options, workspaceId, ws, wss) => {
  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
    } else {
      let news = [];

      for (let i = 0; i < 10; i++) {
        let article = body.articles[i];
        news.push(article.title);
      }

      let newsMessage = news.join('; ');
      output.responder(workspaceId, newsMessage, ws, wss);
    }
  });
}


module.exports = {newsFetcher};