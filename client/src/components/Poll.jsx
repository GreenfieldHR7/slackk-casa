import React from 'react';
import PollOption from './PollOption.jsx'

class Poll extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { data, currentUser } = this.props;
		return (
			<div>
				<media>
					<img 
					src="/images/poll-image.jpeg"
					alt="poll-image"
					className ="poll-image"
					/>
				</media>
				Poll:
				<div className="poll-title">{data.name}</div>
				<ol className="poll-data">
					{data.options.map((option) => {
						return <PollOption option={option} currentUser={currentUser}/>
					})}
				</ol>
			</div>
		)
	}
}

export default Poll