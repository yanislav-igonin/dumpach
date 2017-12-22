import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getThread } from '../duck';
import Post from './Post';

class ThreadContainer extends Component {
  componentDidMount() {
    const { boardId, threadId } = this.props;
    this.props.getThread(boardId, threadId);
  }
  componentWillReceiveProps(nextProps) {
    const { boardId, threadId } = nextProps;
    if (boardId !== this.props.boardId && threadId !== this.props.threadId) {
      this.props.getThread(boardId, threadId);
    }
  }

  render() {
    const { boardId, threadId, thread, getThread } = this.props;
    return (
      <div className="thread" style={{ padding: '0 10px 0 10px' }}>
        {thread.posts !== undefined
          ? thread.posts.map((post, index) => (
              <Post boardId={boardId} post={post} index={index} key={post.id} />
            ))
          : null}

        <div
          className="thread__update-thread-link-container"
          style={{ margin: '2em 0' }}
        >
          <Link
            to="#"
            style={{ cursor: 'pointer', fontSize: '1.3em' }}
            onClick={(e) => {
              e.preventDefault();
              getThread(boardId, threadId);
            }}
          >
            Update thread
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  thread: state.thread,
});

export default connect(mapStateToProps, { getThread })(ThreadContainer);
