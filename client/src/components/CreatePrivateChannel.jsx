import React from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

//this is the button and then the actual popup that appears to create a workspace
export default class CreatePrivateChannel extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
    };
  }
  //Changes the popout state
  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }
  //calls private channel creation then pops back down
  handleClick() {
    this.props.createPrivateChannel();
    this.closePopUp();
  }

  //grabs the input value
  handleChange(event) {
    event.preventDefault();
    this.props.getPrivateChannelQuery(event.target.value);
  }

  //Closes popup for sure
  closePopUp() {
    this.setState({
      popoverOpen: false,
    });
  }
  //Renders the button. When clicked, the button will toggle the popup.
  render() {
    return (
      <div>
        <Button id="Popover1" onClick={this.toggle}>
          +
        </Button>
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target="Popover1"
          toggle={this.toggle}
        >
          <PopoverHeader>Enter username: </PopoverHeader>
          <PopoverBody>
            <input type="text" placeholder="username.." onChange={event => this.handleChange(event)} />
            <button onClick={() => this.handleClick()}> Add </button>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}
