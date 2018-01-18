import React, { Component } from 'react';
import { Button, Color, Alert } from 'reactstrap';
import { getWorkSpaceMessagesFromServer, getUsersInChannel } from '../socketHelpers/index.js';
import PropTypes from 'prop-types';

export default class WorkSpaceEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick(event) {
    let { handleFail, changeCurrentWorkSpace, workSpace, workspaceMentioned, currentUser } = this.props;
    handleFail();
    getWorkSpaceMessagesFromServer(workSpace.id);
    getUsersInChannel(workSpace.id);
    changeCurrentWorkSpace(workSpace.id, workSpace.name);

    for (var i = 0; i < workspaceMentioned.length; i++) {
      const mention = workspaceMentioned[i];
      if (mention.workspaceId === workSpace.id) {
        let indexUser = mention.usersMentioned.names.indexOf(currentUser);
        mention.usersMentioned.names.splice(indexUser, 1);
        if (mention.usersMentioned.names.includes('channel')) {
          indexUser = mention.usersMentioned.names.indexOf('channel');
          mention.usersMentioned.names.splice(indexUser, 1);
        }
      }
    }
  }

  render() {
    let { workSpace, currentWorkSpaceId, workspaceMentioned, currentUser } = this.props;

    //notification for users mentioned within the workspace
    let workspaceName = '#' + workSpace.name;
    for (var i = 0; i < workspaceMentioned.length; i++) {
      const mention = workspaceMentioned[i];
      if (mention.usersMentioned.names.includes(currentUser) || mention.usersMentioned.names.includes('channel')) {
        if (!mention.usersMentioned.isNotified) {
          const notification = new Notification(mention.notificationMessage);
          mention.usersMentioned.isNotified = true;
        }
        if (mention.workspaceId === workSpace.id) {
          workspaceName = <Alert color="dark"> # {workSpace.name} </Alert>
        }
      }
    }

    return (
      <div className="workSpace-entry-container">
        {workSpace.id === currentWorkSpaceId ? (
          <h5
            className="workSpace-name highlight-workSpace"
            onClick={event => this.handleClick(event)}
          >
            {' '}
            {workspaceName}
          </h5>
        ) : (
          <h5 className="workSpace-name workSpace-hover" onClick={event => this.handleClick(event)}>
            {' '}
            {workspaceName}
          </h5>
        )}
      </div>
    );
  }
}

WorkSpaceEntry.propTypes = {
  currentWorkSpaceId: PropTypes.number,
}