import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { getWorkSpaceMessagesFromServer, getUsersInChannel } from '../socketHelpers/index.js';
import PropTypes from 'prop-types';

export default class WorkSpaceEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick(event) {
    let { handleFail, changeCurrentWorkSpace, workSpace } = this.props;
    handleFail();
    getWorkSpaceMessagesFromServer(workSpace.id);
    getUsersInChannel(workSpace.id);
    changeCurrentWorkSpace(workSpace.id, workSpace.name);
  }

  render() {
    let { workSpace, currentWorkSpaceId } = this.props;
    return (
      <div className="workSpace-entry-container">
        {workSpace.id === currentWorkSpaceId ? (
          <h5
            className="workSpace-name highlight-workSpace"
            onClick={event => this.handleClick(event)}
          >
            {' '}
            # {workSpace.name}
          </h5>
        ) : (
          <h5 className="workSpace-name workSpace-hover" onClick={event => this.handleClick(event)}>
            {' '}
            # {workSpace.name}
          </h5>
        )}
      </div>
    );
  }
}

WorkSpaceEntry.propTypes = {
  currentWorkSpaceId: PropTypes.number,
}