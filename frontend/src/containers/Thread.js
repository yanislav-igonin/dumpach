import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getThread } from '../store/actions/thread';
import Post from '../components/Post';

const ThreadContainer = styled.div``;

class Thread extends Component {
  componentDidMount = () => {
    const { boardId, threadId } = this.props.match.params;
    this.props.getThreads(boardId, threadId);
  };

  componentDidUpdate = prevProps => {
    const { boardId, threadId } = this.props.match.params;
    const { boardId: prevBoardId, threadId: prevThreadId } = prevProps.match.params;

    if (boardId !== prevBoardId || threadId !== prevThreadId) {
      this.props.getThread(boardId, threadId);
    }
  };

  render() {
    const { thread } = this.props;
    
    return (
      <ThreadContainer>
        {thread.isFetching
          ? null
          : thread.data.posts.map((post, indexInThread) => (
            <Post post={post} indexInThread={indexInThread} thread={thread.data} />
          ))}
      </ThreadContainer>
    );
  }
}

const mapStateToProps = ({ thread }) => ({
  thread
});

const mapDispatchToProps = dispatch => ({
  getThreads: (boardId, threadId) => {
    dispatch(getThread(boardId, threadId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Thread);
