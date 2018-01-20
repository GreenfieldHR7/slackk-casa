import React from 'react';
import { Alert } from 'reactstrap'

export default class App extends React.Component {
	constructor(props) {
		super(props);
    }
    renderEmoji() {
      const emoji = ['🤩', '🤠', '😻', '💩', '🎃', '💃', '😘', '🐶', '🐻', '🐼', '🍎', '🍓', '🍒', '🍔']
      let number = Math.floor(Math.random() * Math.floor(emoji.length));
      return emoji[number];
    }
    render() {
    	return (
    		  <Alert color="light" style={{padding: "0 0 0 0", margin: "0 0 0 0"}}>{this.props.typer} is typing {this.renderEmoji()}</Alert>
    	)
    }
}