import React from 'react';
import UserEntry from './UserEntry.jsx';
import { Container, ListGroup } from 'reactstrap';


export default ({ usernames }) => (
	<Container>	
   		{usernames.map(username => <UserEntry username={username} />)}
    </Container>
);