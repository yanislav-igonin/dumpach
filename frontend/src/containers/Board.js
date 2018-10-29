import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getThreads } from '../store/actions/threads';
import ThreadPreview from '../components/ThreadPreview';

const BoardContainer = styled.div``;

class Board extends Component {
  componentDidMount = () => {
    const { boardId } = this.props.match.params;
    this.props.getThreads(boardId);
  };

  componentDidUpdate = prevProps => {
    const { boardId } = this.props.match.params;
    const { boardId: prevBoardId } = prevProps.match.params;
    if (boardId !== prevBoardId) {
      this.props.getThreads(boardId);
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

const mapStateToProps = ({ threads }) => ({
  threads
});

const mapDispatchToProps = dispatch => ({
  getThreads: boardId => {
    dispatch(getThreads(boardId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
