import React from 'react';

class PollOption extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { option, } = this.props;

		let count = '';
		if (option.count > 0) {
			count = `-${option.count}`;
		}
		return (
			<li> {option.name} </li>
		)
	}
}

export default PollOption