import React from 'react';

class PollOption extends React.Component {
	constructor(props) {
		super(props);
	}

	handleClick() {
		if (!this.props.option.users.includes(this.props.currentUser)) {
			this.props.option.count++;
			this.props.option.users.push(this.props.currentUser);		
		} else {
			this.props.option.count--;
			const userIndex = this.props.option.users.indexOf(this.props.currentUser);
			this.props.option.users.splice(userIndex, 1);
		}
		console.log('click', this.props.option);
	}

	render() {
		let { option, } = this.props;
		console.log('option', option);
		let count = '';
		if (option.count > 0) {
			count = `+ ${option.count}`;
		}
		return (
			<li onClick={() => this.handleClick()}> {option.name}{count} </li>
		)
	}
}

export default PollOption