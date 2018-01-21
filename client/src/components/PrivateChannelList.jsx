import React from 'react';
import { Alert, Row, Col } from 'reactstrap';
import PrivateChannelEntry from './PrivateChannelEntry.jsx';
import CreatePrivateChannel from './CreatePrivateChannel.jsx';

export default class PrivateChannelList extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
		privateChannelQuery: '',
		allUsers: []
	};
	this.getPrivateChannelQuery = this.getPrivateChannelQuery.bind(this);
	this.createPrivateChannel = this.createPrivateChannel.bind(this);	
  }

  //grabs the value from the input field
  getPrivateChannelQuery(query) {
    this.setState({ privateChannelQuery: query });
  }

  //posts the query to the server that results in a success or failed creation
  createPrivateChannel() {
    let { privateChannels, currentUser } = this.props;
    let { privateChannelQuery } = this.state;
    if (privateChannelQuery.length > 0) {
    	if (this.isPrivateChannelOpen(privateChannelQuery, currentUser)) {
    		// alert 'private channel already open'
    		alert('private channel is already open');
    	} else if (privateChannelQuery === currentUser) {
    		alert('Can\'t open a channel with yourself');
    	} else {
    		// get all users in db
    		this.checkUserInDB(privateChannelQuery, currentUser);
    	}
    }
  }

  // checks if private channel between 2 users are already open
  isPrivateChannelOpen(otherUser, currentUser) {
  	let { privateChannels } = this.props;
	for (let i = 0 ; i < privateChannels.length; i++) {
		if ((privateChannels[i].username1 === otherUser && 
			privateChannels[i].username2 === currentUser) ||
			(privateChannels[i].username2 === otherUser && 
			privateChannels[i].username1 === currentUser))
			return true;
	}	
	return false;
  }

  checkUserInDB(otherUser, currentUser) {
  	let { loadPrivateChannels } = this.props;
  	fetch('/users')  
      .then(resp => resp.json())
      .then(data => {
      	let found = false;
      	for (var i = 0; i < data.length && !found; i++) {
      		if (data[i].username === otherUser) {
      			found = true;
 				fetch('/privatechannels', {
        			method: 'POST',
        			body: JSON.stringify({ currUser: currentUser, otherUser: otherUser }),
        			headers: { 'content-type': 'application/json' },
      			})
        		.then(resp => (resp.status === 201 ? loadPrivateChannels() : alert('Failed to load private channels')))
        		.catch(console.error);
    		} else if (!found && i === data.length - 1) {
				alert(`There's no user ${otherUser}`);	
    		}
      	} 
      })
      .catch(console.error);
  }
 	
  render() {
  	let {
  		privateChannels,
  		currentUser,
  		changeCurrentPrivateChannel,
  		currentPrivateChannelId,
  		waitingMessageInChannels,
  	} = this.props;
	return (
	  <div>
	    <Row>
          <Col>
            <h3 className="workSpace-header"> Privates! </h3>{' '}
          </Col>
          <Col className="mt-2">
            <CreatePrivateChannel
              getPrivateChannelQuery={this.getPrivateChannelQuery}
              createPrivateChannel={this.createPrivateChannel}
              currentUser={currentUser}
            />
          </Col>
        </Row>
	    {privateChannels.map(privateChannel => 
		  <PrivateChannelEntry 
		  	privateChannel={privateChannel} 
		  	currentUser={currentUser}
		  	changeCurrentPrivateChannel={changeCurrentPrivateChannel}
            currentPrivateChannelId={currentPrivateChannelId}
            waitingMessageInChannels={waitingMessageInChannels}
		  />)}
	    <br />
        <br />
	  </div>
	)		
  }
}