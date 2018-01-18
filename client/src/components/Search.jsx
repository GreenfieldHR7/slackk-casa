import React from 'react';

export default ({ getMessagesByKeywords, handleSelectedUser }) => {
	let query = '';
	return (
		<form className="example" action="action_page.php">
			<input type='text' id='link_id' ref={input => query = input}
				onChange={(e) => handleSelectedUser()}></input>
			<input type='button' id='link' value='Search' 
				onClick={(e) => getMessagesByKeywords(query)}></input>
		</form>
	); 
};