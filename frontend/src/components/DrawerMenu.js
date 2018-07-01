import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';

const DrawerMenu = ({ open, onClose, boards }) => (
  <Drawer open={open} style={{ width: 240 }} onClose={onClose}>
    <Typography variant="display1">Boards</Typography>

    <Divider />

    {boards.map((board) => (
      <Link key={board.id} to={`/boards/${board.id}`}>
        <ListItem button>{board.id}</ListItem>
      </Link>
    ))}
  </Drawer>
);

export default DrawerMenu;
