import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getThread } from '../store/actions/thread';
import Post from '../components/Post';

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
      <div>
        {thread.isFetching
          ? null
          : thread.data.posts.map((post, indexInThread) => (
            <Post post={post} indexInThread={indexInThread} thread={thread.data} />
          ))}
      </div>
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
