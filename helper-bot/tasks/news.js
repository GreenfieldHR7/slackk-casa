// const response = require('./responder.js');

const newsFetcher = (term, workspaceId) => {
  console.log(term);
  
  //why is this undefined??
  console.log(workspaceId);



  //response.responder('news', true, 'test message from newsFetcher');
};


module.exports = {newsFetcher};