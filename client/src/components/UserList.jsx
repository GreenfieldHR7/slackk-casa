import React from 'react';
import UserEntry from './UserEntry.jsx';
import { Container, ListGroup } from 'reactstrap';

export default ({ usernames, handleSelectedUser, selectedUser }) => (
	<Container>	
		<select value={selectedUser} onChange={(e) => handleSelectedUser(e)}>
			<option value="All users">All users</option>
   			{usernames.map(username => <UserEntry username={username} />)}
   		</select>
    </Container>
);