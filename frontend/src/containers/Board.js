import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getThreads } from '../store/actions/threads';
import ThreadPreview from '../components/ThreadPreview';

const BoardContainer = styled.div``;

class Board extends Component {
  componentDidMount = () => {
    const { boardId } = this.props.match.params;
    const { settings } = this.props;
    
    this.props.getThreads(boardId, settings.threads.limitPerPage);
  };

  componentDidUpdate = prevProps => {
    const { boardId } = this.props.match.params;
    const { boardId: prevBoardId } = prevProps.match.params;
    const { settings } = this.props;

    if (boardId !== prevBoardId) {
      this.props.getThreads(boardId, settings.threads.limitPerPage);
    }
  };

  render() {
    const { threads } = this.props;

    return (
      <BoardContainer>
        {threads.data.map(thread => (
          <ThreadPreview thread={thread} key={thread.id} />
        ))}
      </BoardContainer>
    );
  }
}

const mapStateToProps = ({ settings, threads }) => ({
  settings,
  threads
});

const mapDispatchToProps = dispatch => ({
  getThreads: (boardId, limitPerPage) => {
    dispatch(getThreads(boardId, limitPerPage));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
