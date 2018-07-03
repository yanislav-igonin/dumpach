import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  // appBarColor: {
  //   backgroundColor: 'rgba(0, 0, 0, 0)',
  //   boxShadow: 'none',
  // },
});

class Board extends Component {
  render() {
    return <div className="board-container">board</div>;
  }
}

const mapStateToProps = ({}) => ({
  // boards,
});

const mapDispatchToProps = (dispatch) => ({
  // getBoards: () => {
  //   dispatch(getBoards());
  // },
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Board),
);
