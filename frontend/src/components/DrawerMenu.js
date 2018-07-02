import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Sms from '@material-ui/icons/Sms';

const styles = (theme) => {
  console.log(theme);
  return {
    drawerPaper: {
      position: 'relative',
      width: 240,
    },
  };
};

class DrawerMenu extends Component {
  state = {
    isBoardsOpened: false,
  };

  openBoards = () => {
    const { isBoardsOpened } = this.state;
    this.setState({ isBoardsOpened: !isBoardsOpened });
  };

  render() {
    const { open, onClose, boards, classes } = this.props;
    const { isBoardsOpened } = this.state;

    return (
      <Drawer open={open} classes={{ paper: classes.drawerPaper }} onClose={onClose}>
        <List
          component="nav"
        >

          <ListItem button onClick={this.openBoards}>
            <ListItemIcon>
                <Sms color="secondary"/>
              </ListItemIcon>

            <ListItemText inset primary="boards" />
            {isBoardsOpened ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isBoardsOpened} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {boards.map((board) => (
                <NavLink
                  key={board.id}
                  to={`/${board.id}`}
                  style={{
                    textDecoration: 'none',
                    color: 'rgba(0, 0, 0, 0.54)',
                  }}
                  activeStyle={{
                    fontWeight: 'bold',
                    color: '#f50057',
                    textDecoration: 'none',
                  }}
                >
                  <ListItem button>{board.id}</ListItem>
                </NavLink>
              ))}
            </List>
          </Collapse>
        </List>
      </Drawer>
    );
  }
}

export default withStyles(styles)(DrawerMenu);
