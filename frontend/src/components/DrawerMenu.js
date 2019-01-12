import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';

import helpers from '../helpers';

const styles = (theme) => {
  return {
    drawerPaper: {
      position: 'relative',
      width: 240,
    },
    smsIcon: {
      color: theme.palette.primary.main,
    },
  };
};

// TODO: think about design
class DrawerMenu extends Component {
  state = {
    isBoardsOpened: false,
  };

  openBoards = () => {
    const { isBoardsOpened } = this.state;
    this.setState({ isBoardsOpened: !isBoardsOpened });
  };

  render() {
    const { open, onClose, boards: sections, classes } = this.props;
    const { isBoardsOpened } = this.state;

    return (
      <Drawer open={open} classes={{ paper: classes.drawerPaper }} onClose={onClose}>
        <List component="nav">
          <ListItem button onClick={this.openBoards}>
            <ListItemIcon classes={{ root: classes.smsIcon }}>
              <Icon>sms</Icon>
            </ListItemIcon>

            <ListItemText inset primary="boards" />
            {isBoardsOpened ? (
              <Icon color="primary">expand_less</Icon>
            ) : (
              <Icon color="primary">expand_more</Icon>
            )}
          </ListItem>
          <Collapse in={isBoardsOpened} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {sections.map((section) => {
                return section.boards.map((board) => (
                  <NavLink
                    key={board.id}
                    to={`/${board.id}`}
                    style={{
                      textDecoration: 'none',
                      color: '#fff',
                    }}
                    activeStyle={{
                      fontWeight: 'bold',
                      color: '#e65100',
                      textDecoration: 'none',
                    }}
                  >
                    <ListItem button>
                      {board.id} -{' '}
                      {helpers.strings.capitalizeFirstLetter(board.title)}
                    </ListItem>
                  </NavLink>
                ));
              })}
            </List>
          </Collapse>
        </List>
      </Drawer>
    );
  }
}

export default withStyles(styles)(DrawerMenu);
