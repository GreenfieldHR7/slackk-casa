import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
		query: ''
	}
  }

  searchMessageByKeywords(query) {
  	this.props.getMessagesByKeywords(query);
  	this.setState( { query: '' } );
  }

  handleChangeInInput(e) {
  	this.props.handleSelectedUser();
  	if (e) {
	  	this.setState( { query: e.target.value });  		
  	}
  }
	
  render() {
	let { 
		getMessagesByKeywords, 
		handleSelectedUser 
	} = this.props;
	let query = this.state.query;
	return (
		<form>
			<input type='text' value={query} ref={input => query = input}
				onChange={(e) => this.handleChangeInInput(e)}></input>
			<input type='button' value='Search' 
				onClick={(e) => this.searchMessageByKeywords(query)}></input>
			<input type='button' value='Refresh'
				onClick={(e) => this.handleChangeInInput()}></input>
		</form>
	); 	
  }
}