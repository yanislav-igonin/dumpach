import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBoards } from './store/actions/boards';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount = () => {
    this.props.getBoards();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
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
)(App);
