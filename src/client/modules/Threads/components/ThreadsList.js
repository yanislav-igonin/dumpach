import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getThreads } from '../duck';
import ThreadPreview from './ThreadPreview';

class ThreadsList extends Component {
  componentDidMount() {
    this.props.getThreads(this.props.boardId);
  }

  componentWillReceiveProps(nextProps) {
    // or componentDidUpdate
    if (nextProps.boardId !== this.props.boardId) {
      this.props.getThreads(nextProps.boardId);
    }
  }

  render() {
    const { threads } = this.props;
    return (
      <div>
        {threads.map((thread) => <ThreadPreview key={thread.id} thread={thread} />)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  threads: state.threads,
});

export default connect(mapStateToProps, { getThreads })(ThreadsList);
