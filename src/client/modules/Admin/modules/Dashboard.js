import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Drawer from 'material-ui/Drawer';
import { logout } from '../duck';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="contrast"
            aria-label="Menu"
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            Admin
          </Typography>
          <Button color="contrast" onClick={props.logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
          <Drawer
            type="persistent"
            
            open={true}
          >

          </Drawer>
    </div>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { logout })(
  withStyles(styles)(ButtonAppBar)
);
