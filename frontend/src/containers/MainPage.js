import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Paper from '@material-ui/core/Paper';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DrawerMenu from '../components/DrawerMenu';

import { getBoards } from '../store/actions/boards';

class MainPage extends Component {
  state = {
    isMenuOpened: true,
  };

  componentDidMount = () => {
    this.props.getBoards();
  };

  toggleDrawer = () => {
    const { isMenuOpened } = this.state;

    this.setState({ isMenuOpened: !isMenuOpened });
  };

  render() {
    const { boards } = this.props;
    const { isMenuOpened } = this.state;

    return (
      <Router>
        <div className="main-page-container">
          <div className="main-page-content" />

          <IconButton
            color="secondary"
            aria-label="open drawer"
            onClick={this.toggleDrawer}
          >
            <MenuIcon />
          </IconButton>

          <DrawerMenu
            open={isMenuOpened}
            onClose={this.toggleDrawer}
            boards={boards.list}
          />
          <Switch />
        </div>
      </Router>
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
