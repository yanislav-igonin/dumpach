import React from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';

const styles = (theme) => {
  console.log(theme);
  return {
    drawerPaper: {
      position: 'relative',
      width: 240,
    },
  };
};

const DrawerMenu = ({ open, onClose, boards, classes }) => (
  <Drawer open={open} classes={{ paper: classes.drawerPaper }} onClose={onClose}>
    <Typography variant="display1" align="center">
      Boards
    </Typography>

    <Divider />

    {boards.map((board) => (
      <NavLink
        key={board.id}
        to={`/${board.id}`}
        style={{
          textDecoration: 'none',
          color: 'rgba(0, 0, 0, 0.54)'
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
  </Drawer>
);

export default withStyles(styles)(DrawerMenu);
