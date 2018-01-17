import React from 'react';
import { Container, ListGroup } from 'reactstrap';

export default ({ username }) => (
	<option value={username}>
		{username}
	</option>
);