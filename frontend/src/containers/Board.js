import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { getThreads } from '../store/actions/threads';
import ThreadCard from '../components/ThreadCard';

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
      <div className="board-container" style={{ display: 'inline-block' }}>
        {threads.list.map(thread => (
          <div style={{ display: 'inline-block' }}>
            <ThreadCard thread={thread} />
          </div>
        ))}
      </div>
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
