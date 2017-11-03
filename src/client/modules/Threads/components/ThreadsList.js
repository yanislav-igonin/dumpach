import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getThreads } from '../duck';
import ThreadPreview from './ThreadPreview';

class ThreadsList extends Component {
  componentDidMount() {
    this.props.getThreads(this.props.boardId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.boardId !== this.props.boardId) {
      this.props.getThreads(nextProps.boardId);
    }
  }

  render() {
    const { threads, boardId } = this.props;
    return (
      <div style={{ padding: '0 10px 0 10px' }}>
        {threads.map((thread) => (
          <ThreadPreview key={thread.id} boardId={boardId} thread={thread} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  threads: state.threads,
});

export default connect(mapStateToProps, { getThreads })(ThreadsList);
