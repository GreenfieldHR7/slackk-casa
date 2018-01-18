const request = require('request');
const config = require('../../config.js');
const output = require('../../helper-bot/responder.js');


const newsFetcher = (term, workspaceId) => {
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

    requester(options, workspaceId);
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

    requester(options, workspaceId);
  }
};

const requester = (options, workspaceId) => {
  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
    } else {
      let news = [];

      for (let i = 0; i < 5; i++) {
        let article = body.articles[i];
        news.push(article.title);
      }

      output.responder('news', workspaceId, news);
    }
  });
}


module.exports = {newsFetcher};