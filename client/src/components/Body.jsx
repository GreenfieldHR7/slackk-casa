import React from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import MessageList from './MessageList.jsx';
import WorkSpaceList from './WorkSpaceList.jsx';
import PrivateChannelList from './PrivateChannelList.jsx';
import UserList from './UserList.jsx';
import Search from './Search.jsx';
import PropTypes from 'prop-types';

//container for other containers
export default class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {
      workSpaces,
      messages,
      usernames,
      loadWorkSpaces,
      changeCurrentWorkSpace,
      currentWorkSpaceId,
      handleSelectedUser,
      getMessagesByKeywords,
      selectedUser,
      workspaceMentioned,
      privateChannels,
      loadPrivateChannels,
      currentUser, 
      changeCurrentPrivateChannel,
      currentPrivateChannelId,    
    } = this.props;

    Notification.requestPermission().then(function(permission) {
      if (permission === 'default') {
        console.log(`The permission request was dismissed. Allow a retry`);
        return;
      }
    });

    return (
      <Container fluid>
       <Row>
          <Col className="side-bar-col" xs="2">
            <Row>
              <WorkSpaceList
                workSpaces={workSpaces}
                loadWorkSpaces={loadWorkSpaces}
                changeCurrentWorkSpace={changeCurrentWorkSpace}
                currentWorkSpaceId={currentWorkSpaceId}
                workspaceMentioned={workspaceMentioned}
                currentUser={currentUser}
              />
            </Row>
            <Row>
              <PrivateChannelList
                privateChannels={privateChannels}
                loadPrivateChannels={loadPrivateChannels}
                currentUser={currentUser}
                changeCurrentPrivateChannel={changeCurrentPrivateChannel}
                currentPrivateChannelId={currentPrivateChannelId}                
              />
            </Row>
          </Col>
          <Col className="message-list-col" xs="8">
          <div className="filter-messages">
            <UserList 
              usernames={usernames} 
              handleSelectedUser={handleSelectedUser}
              selectedUser={selectedUser}
            />
            <Search 
              getMessagesByKeywords={getMessagesByKeywords}
              handleSelectedUser={handleSelectedUser}              
            />
          </div>
            <MessageList messages={messages} currentWorkSpaceId={currentWorkSpaceId} currentUser={currentUser} />
          </Col>
        </Row>
      </Container>

    );
  }
}

Body.propTypes = {
  messages: PropTypes.array,
  workspaces: PropTypes.array,
  currentWorkSpaceId: PropTypes.number,
}