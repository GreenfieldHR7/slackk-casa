import React from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import MessageList from './MessageList.jsx';
import WorkSpaceList from './WorkSpaceList.jsx';
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
    } = this.props;
    return (
      <Container fluid>
       <Row>
          <Col className="side-bar-col" xs="2">
            <WorkSpaceList
              workSpaces={workSpaces}
              loadWorkSpaces={loadWorkSpaces}
              changeCurrentWorkSpace={changeCurrentWorkSpace}
              currentWorkSpaceId={currentWorkSpaceId}
            />
          </Col>
          <Col className="message-list-col" xs="10">
            <MessageList messages={messages} currentWorkSpaceId={currentWorkSpaceId}/>
          </Col>
          <Col>
            <UserList usernames={usernames} handleSelectedUser={handleSelectedUser}/>
            <Search 
              getMessagesByKeywords={getMessagesByKeywords}
              handleSelectedUser={handleSelectedUser} 
            />
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