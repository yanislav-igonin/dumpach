import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import { logout } from '../duck';


function ButtonAppBar(props) {
  return (
    <div className='dashboard'>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className='menu-icon'
            color="contrast"
            aria-label="Menu"
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography type="title" color="inherit" className='dashboard__title'>
            Admin
          </Typography>
          <Button color="contrast" onClick={props.logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {logout})(ButtonAppBar);
