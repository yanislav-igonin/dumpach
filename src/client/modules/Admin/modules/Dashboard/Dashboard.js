import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { logout } from '../../duck';

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

class ButtonAppBar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpened: false,
    };
  }

  toggleDrawer = () => {
    const { drawerOpened } = this.state;
    this.setState({ drawerOpened: !drawerOpened });
  };

  goTo(path) {
    browserHistory.push(`dashboard/${path}`);
  }

  render() {
    const { classes, children } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="contrast"
              aria-label="Menu"
              onClick={this.toggleDrawer}
            >
              <Icon>menu</Icon>
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              Admin
            </Typography>
            <Button color="contrast" onClick={this.props.logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.drawerOpened} onRequestClose={this.toggleDrawer}>
          <List>
            <ListItem button onClick={() => this.goTo('boards')}>
              <ListItemIcon>
                <Icon>inbox</Icon>
              </ListItemIcon>
              <ListItemText primary="Boards" />
            </ListItem>
            
            {/* <ListItem button onClick={() => this.goTo('boards')}>
              <ListItemIcon>
                <Icon>accessible</Icon>
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem> */}
            
          </List>
        </Drawer>

        {children}
      </div>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { logout })(
  withStyles(styles)(ButtonAppBar)
);
