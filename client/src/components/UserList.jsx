import React from 'react';
import UserEntry from './UserEntry.jsx';
import { Container, ListGroup } from 'reactstrap';


export default ({ usernames, handleSelectedUser }) => (
	<Container>	
		<select onChange={(e) => handleSelectedUser(e)}>
			<option value="All users" selected>All users</option>
   			{usernames.map(username => <UserEntry username={username} />)}
   		</select>
    </Container>
);