import React from 'react';
import { getPrivateChannelMessagesFromServer } from '../socketHelpers/index.js';

export default class privateChannelEntry extends React.Component {
  constructor(props) {
	super(props);
	this.state = {};
  }

  getDirectMessages(event) {
  //	let { handleFail, changeCurrentWorkSpace, workSpace } = this.props;
  //  handleFail();
    let { 
	  changeCurrentPrivateChannel, 
	  privateChannel,
	  currentUser,	   
    } = this.props;
    getPrivateChannelMessagesFromServer(privateChannel.id);
 	let otherName = privateChannel.username1 === currentUser ? privateChannel.username2 : privateChannel.username1; 
    changeCurrentPrivateChannel(privateChannel.id, otherName);
  }

  render() {
  	let {
	  privateChannel, 
	  currentUser,
	  currentPrivateChannelId,
    waitingMessageInChannels
  	} = this.props;
 	  let otherUser = privateChannel.username1 === currentUser ? privateChannel.username2 : privateChannel.username1; 	
    // remove waiting messages from state if user is in the same private message
    if (waitingMessageInChannels[privateChannel.id]) {
      if (privateChannel.id === currentPrivateChannelId) {
        waitingMessageInChannels[privateChannel.id] = undefined;      
      } else if (privateChannel.id !== currentPrivateChannelId) {
          return (
                  <div className="workSpace-entry-container">
                  <h5 
                      className="workSpace-name workSpace-hover" 
                      onClick={event => this.getDirectMessages(event)}>
                    {' '}
                    # {otherUser} {' '} <span className="waitingMessage"> {waitingMessageInChannels[privateChannel.id]} </span>
                  </h5>
                  </div>
              )            
          } 
      } return (
       		<div className="workSpace-entry-container">
       			{privateChannel.id === currentPrivateChannelId ? (
      			<h5
                  	className="workSpace-name highlight-workSpace"
                  	onClick={event => this.getDirectMessages(event)}
                	>
                  	{' '}
                  	# {otherUser}
                	</h5>
       			) : (
                		<h5 
                			className="workSpace-name workSpace-hover" 
                			onClick={event => this.getDirectMessages(event)}>
                  	{' '}
                  	# {otherUser}
                	</h5>
       			)}
       		</div>
       	)
  }
}