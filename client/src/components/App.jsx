import React from 'react';
import { Input, Button, Popover, PopoverHeader, PopoverBody, Alert } from 'reactstrap';
import { connect, sendMessage, getMessagesOfUser, getWorkSpaceMessagesFromServer, sendDirectMessage } from '../socketHelpers';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import Body from './Body.jsx';
import Dropzone from 'react-dropzone';
import upload from 'superagent';
import Typing from './Typing.jsx'

//The main component of the App. Renders the core functionality of the project.
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Default message informs the user to select a workspace
      messages: [
        {
          text: 'Welcome to slackk-casa! Please select or create a workspace!',
          username: 'Slack-bot',
          id: 0,
          createdAt: new Date(),
          workspaceId: 0,
        },
      ],
      currentUser: '',
      users: [],
      usernames: [],
      workSpaces: [],
      privateChannels: [],
      query: '',
      currentWorkSpaceId: 0,
      currentWorkSpaceName: '',
      poll: [],
      popoverOpen: false,
      typer: '',
      typerWorkSpaceId: '',
      renderTyping: false,
      selectedUser: 'All users', // for selected messages by user filter
      workspaceMentioned: [],
      currentPrivateChannelId: '',
      currentPrivateChannelName: '',
    };
    this.handleSelectedUser = this.handleSelectedUser.bind(this);
    this.getMessagesByKeywords = this.getMessagesByKeywords.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.toggleTwo = this.toggleTwo.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    let server = location.origin.replace(/^http/, 'ws');
    // connect to the websocket server
    connect(server, this);
    this.setState({ currentUser: this.props.location.state.username });
  }

  // changes the query state based on user input in text field
  handleChange(event) {
    this.setState({
      query: event.target.value,
    });
  }

  // sends message on enter key pressed and clears form
  // only when shift+enter pressed breaks to new line
  handleKeyPress(event) {
    // on key press enter send message and reset text box
    if (event.charCode === 13 && !event.shiftKey) {
      event.preventDefault();
      if (this.state.currentWorkSpaceId !== '') {
        sendMessage({
          username: this.props.location.state.username,
          text: this.state.query,
          workspaceId: this.state.currentWorkSpaceId,
        });        
      } else {
        sendDirectMessage({
          username: this.props.location.state.username,
          text: this.state.query,
          privateChannelId: this.state.currentPrivateChannelId
        });             
      } 
      // resets text box to blank string
      this.setState({
        query: '',
      });
    }
  }

  handleSelectedUser(event) {
    // if it's private channel, show all messages when click on refresh (search)
    // if (currentPrivateChannelId !== '') {

    // }
    let currentWorkSpaceId = this.state.currentWorkSpaceId;
    // event.target.value is user when one was selected from option selection
    // event is this.selectedUser when one changes input in search textbox   
    let username = event ? event.target.value : this.state.selectedUser; 
    if (username === "All users") {
        getWorkSpaceMessagesFromServer(currentWorkSpaceId);     
    } else {
      getMessagesOfUser(username, currentWorkSpaceId);
    } 
    this.setState( { selectedUser: username } );      
  }

  //grabs all existing workspaces
  loadWorkSpaces() {
    fetch('/workspaces')  // fetches all workspaces. Returns response if succeed
      .then(resp => resp.json())  // parses resp to a JSON. Returns workSpaces if succeed
      .then(workSpaces => this.setState({ workSpaces }))  // finally, set State
      .catch(console.error);
  }

  // if msg isn't undefined, receives message to client from other user
  loadPrivateChannels(msg) {
    fetch(`/privatechannels/${this.props.location.state.username}`)
      .then(resp => resp.json())
//      .then(privateChannels => this.setState({ privateChannels }))
      .then(privateChannels => {
        this.setState({ privateChannels })
        if (msg) {
          let privateChannels = this.state.privateChannels;
            for (let i = 0; i < privateChannels.length; i++) {
              if (privateChannels[i].id === msg.privateChannelId) {
                if (msg.privateChannelId === this.state.currentPrivateChannelId) {
                  // user got message at current private channel
                  this.setState({ messages: [...app.state.messages, msg.message] });        
                } else {
                  alert(`${msg.message.username} sent you a new message`);
                }
              }
            }         
        }
      })
      .catch(console.error);
  }

  //Helper function to reassign current workspace
  changeCurrentWorkSpace(id, name) {
    this.setState({ 
      currentWorkSpaceId: id, 
      currentWorkSpaceName: name,
      currentPrivateChannelId: '',
      currentPrivateChannelName: '',  
      selectedUser: 'All users' 
    });
  }

  //Helper function to reassign current private channel
  changeCurrentPrivateChannel(id, otherUser) {
    this.setState({ 
      currentPrivateChannelId: id, 
      currentPrivateChannelName: otherUser,
      currentWorkSpaceId: '',
      currentWorkSpaceName: ''
    });
  }

  getMessagesByKeywords(query) {
    // search only if query not empty
    if (query.value !== '') {
      let messages = this.state.messages
        .filter(message => message.text.includes(query.value));
      this.setState( { messages } );
    }
  }
  //renders nav bar, body(which contains all message components other than input), and message input
  
  onDrop(files) {
    //use upload to send file to server
      upload.post('/aws/upload')
      .attach('theseNamesMustMatch', files[0])
      .end((err, res) => {
        if (err) console.log(err);
        console.log('File uploaded!');
        // send aws url (res) as text to web-sockets
        event.preventDefault();
        // use sendMessage to send aws s3 url to websocket
        sendMessage({
          username: this.props.location.state.username,
          text: res.text,
          workspaceId: this.state.currentWorkSpaceId,
        });
      })
  }

  toggleTwo() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  handleKeyDown(event) {
    sendTypeStatus({
      username: this.props.location.state.username,
      workspaceId: this.state.currentWorkSpaceId,
    });
  }

  render() {
    let {
      messages, 
      usernames, 
      query, 
      workSpaces, 
      currentWorkSpaceId, 
      currentWorkSpaceName, 
      selectedUser,
      privateChannels,
      currentPrivateChannelId,
      currentPrivateChannelName,
      currentUser,
      workspaceMentioned,
      popoverOpen
    } = this.state;
  //  let currUser = this.props.location.state.username;
    return (
      <div className="app-container">
        <NavBar 
          currentWorkSpaceName={currentWorkSpaceName}
          currentPrivateChannelName={currentPrivateChannelName} 
        />
        <Body
          usernames={usernames}
          messages={messages}
          workSpaces={workSpaces}
          loadWorkSpaces={() => this.loadWorkSpaces()}
          changeCurrentWorkSpace={(id, name) => this.changeCurrentWorkSpace(id, name)}
          currentWorkSpaceId={currentWorkSpaceId}
          handleSelectedUser={this.handleSelectedUser}
          getMessagesByKeywords={this.getMessagesByKeywords}
          selectedUser={selectedUser}
          workspaceMentioned={workspaceMentioned}
          currentUser={this.props.location.state.username}
          loadPrivateChannels={() => this.loadPrivateChannels()}
          privateChannels={privateChannels}
          currentUser={currentUser}
          changeCurrentPrivateChannel={(id, otherUser) => this.changeCurrentPrivateChannel(id, otherUser)}
          currentPrivateChannelId={currentPrivateChannelId} 
        />
        <div className="input-box">
          <div className="typing-alert">
            {this.state.renderTyping && this.state.currentWorkSpaceId === this.state.typerWorkSpaceId && this.props.location.state.username !== this.state.typer ? <Typing typer={this.state.typer}/> : <Alert color="light" style={{padding: "0 0 0 0", margin: "0 0 0 0", opacity: "0"}}>Hello</Alert>}
          </div>
          <div className="input-container">
            <Input
              value={query}
              className="message-input-box"
              type="textarea"
              name="text"
              placeholder={`Message #${currentWorkSpaceName || 'select a workspace or or direct a message!'}`}
              onChange={event => this.handleChange(event)}
              onKeyPress={event => this.handleKeyPress(event)}
              onKeyDown={event => this.handleKeyDown(event)}
            />
          </div> 
          <div className="upload-file-button">
            <Button className="upload-button" id="Popover2" onClick={this.toggleTwo} color="success">+</Button>
            <Popover placement="bottom" isOpen={popoverOpen} target="Popover2" toggleTwo={this.toggleTwo}>
              <PopoverHeader>Upload File</PopoverHeader>
              <PopoverBody>
                <Dropzone onDrop={this.onDrop}>
                  <div>Drop or click to select a file to upload.</div>
                </Dropzone>
              </PopoverBody>
            </Popover>
          </div>
        </div>
      </div>
    );
  }
}