import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { getBoards } from '../store/actions/boards';

class MainPage extends Component {
  componentDidMount = () => {
    this.props.getBoards();
  };

  render() {
    const { boards } = this.props;

    return (
      <div className="main-page-container">
        <h1>Boards</h1>
        {boards.list.map((board) => <p>{board.id}</p>)}
      </div>
    );
  }
}

const mapStateToProps = ({ boards }) => ({
  boards,
});

const mapDispatchToProps = (dispatch) => ({
  getBoards: () => {
    dispatch(getBoards());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainPage);
