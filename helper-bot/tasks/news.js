const request = require('request');
const config = require('../../config.js');

// const response = require('./responder.js');


const newsFetcher = (term, workspaceId) => {
  if (term) {
  	//
  } else {
  	let options = { 
  	  method: 'GET',
      url: 'https://newsapi.org/v2/top-headlines',
      qs: { 
      	country: 'us', 
      	apiKey: config.googleNewsAPI_Token
      }
    };

    request(options, (error, response, body) => {
      if (error) {
      	console.error(error);
      } else {
        let res = JSON.parse(body);
        let news = [];

        for (let i = 0; i < 5; i++) {
          let article = res.articles[i];
          news.push(article.title);
        }

        console.log(news);
      }
    });
  }

  //why is this undefined??
  console.log(workspaceId);

  //response.responder('news', true, 'test message from newsFetcher');
};


module.exports = {newsFetcher};