import React from 'react';
import PrivateChannelEntry from './PrivateChannelEntry.jsx';

export default class PrivateChannelList extends React.Component {
  constructor(props) {
	super(props);
	this.state = {};
  }

  render() {
  	let {
  		privateChannels,
  		currentUser,
  		changeCurrentPrivateChannel,
  		currentPrivateChannelId,
  	} = this.props;
	return (
	  <div>
	    {privateChannels.map(privateChannel => 
		  <PrivateChannelEntry 
		  	privateChannel={privateChannel} 
		  	currentUser={currentUser}
		  	changeCurrentPrivateChannel={changeCurrentPrivateChannel}
            currentPrivateChannelId={currentPrivateChannelId}
		  />)}
	  </div>
	)		
  }
}