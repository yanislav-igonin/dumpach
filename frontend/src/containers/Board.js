import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { getThreads } from '../store/actions/threads';

const styles = (theme) => ({
  appBarColor: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    boxShadow: 'none',
  },
});

class Board extends Component {
  componentDidMount = () => {
    const { boardId } = this.props.match.params;
    this.props.getThreads(boardId);
  };

  render() {
    return <div className="board-container">board</div>;
  }
}

const mapStateToProps = ({ threads }) => ({
  threads,
});

const mapDispatchToProps = (dispatch) => ({
  getThreads: (boardId) => {
    dispatch(getThreads(boardId));
  },
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Board),
);
