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
  	} = this.props;
 	let otherUser = privateChannel.username1 === currentUser ? privateChannel.username2 : privateChannel.username1; 	
  	return (
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