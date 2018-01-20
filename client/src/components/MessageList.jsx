import React from 'react';
import { Container, ListGroup } from 'reactstrap';
import MessageEntry from './MessageEntry.jsx';

//container for message components
export default ({ messages, usernames, currentWorkSpaceId, currentUser}) => (
	<div className="message-list-container">
	<Container>	
			{messages.map(message => <MessageEntry message={message} key={message.id} currentUser={currentUser} />)}
    </Container>
  </div>
);