import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import DrawerMenu from '../components/DrawerMenu';

import { getBoards } from '../store/actions/boards';

const styles = (theme) => ({
  appBarColor: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    boxShadow: 'none'
  }
});

class MainPage extends Component {
  state = {
    isMenuOpened: false,
  };

  componentDidMount = () => {
    this.props.getBoards();
  };

  toggleDrawer = () => {
    const { isMenuOpened } = this.state;

    this.setState({ isMenuOpened: !isMenuOpened });
  };

  render() {
    const { boards, classes } = this.props;
    const { isMenuOpened } = this.state;

    return (
      <Router>
        <div className="main-page-container">
          <div className="main-page-content" />

          <AppBar position="static" className={classes.appBarColor} >
            <Toolbar disableGutters={true}>
              <IconButton
                color="secondary"
                aria-label="open drawer"
                onClick={this.toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="secondary">
                Dumpach
              </Typography>
            </Toolbar>
          </AppBar>

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

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MainPage),
);
