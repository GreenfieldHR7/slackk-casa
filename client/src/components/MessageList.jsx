import React from 'react';
import { Container, ListGroup } from 'reactstrap';
import MessageEntry from './MessageEntry.jsx';
// import UserEntry from './UserEntry.jsx';

//container for message components
export default ({ messages, usernames, currentWorkSpaceId }) => (
  <div>
{/*   {usernames.map(username => <UserEntry username={username} />)}
*/}  <div className="message-list-container">
	<Container>	
			{messages.map(message => <MessageEntry message={message} key={message.id} />)}
    </Container>
  </div>
  </div>
);