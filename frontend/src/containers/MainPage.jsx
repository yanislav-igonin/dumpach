import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import IndexPage from '../components/IndexPage';
import DrawerMenu from '../components/DrawerMenu';
import Board from './Board';
import Thread from './Thread';

import { getBoards } from '../store/actions/boards';

const styles = () => ({
  appBarColor: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    boxShadow: 'none'
  }
});

class MainPage extends PureComponent {
  state = {
    isMenuOpened: false
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
          <AppBar position="sticky" className={classes.appBarColor}>
            <Toolbar disableGutters={true}>
              <IconButton color="primary" aria-label="open drawer" onClick={this.toggleDrawer}>
                <Icon>menu</Icon>
              </IconButton>

              <NavLink
                to="/"
                style={{
                  textDecoration: 'none'
                }}
                activeStyle={{
                  textDecoration: 'none'
                }}
              >
                <Typography variant="title" color="primary">
                  dumpach
                </Typography>
              </NavLink>
            </Toolbar>
          </AppBar>

          <DrawerMenu open={isMenuOpened} onClose={this.toggleDrawer} boards={boards.data} />

          {/* <div className="main-page-content" style={{ padding: 10 }}> */}
          <div className="main-page-content">
            <Switch>
              <Route exact={true} path="/" render={() => <IndexPage boards={boards.data} />} />
              <Route exact={true} path="/:boardId" component={Board} />
              <Route exact={true} path="/:boardId/:threadId" component={Thread} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ boards }) => ({
  boards
});

const mapDispatchToProps = dispatch => ({
  getBoards: () => {
    dispatch(getBoards());
  }
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainPage)
);
