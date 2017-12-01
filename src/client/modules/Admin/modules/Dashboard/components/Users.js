import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Switch, Route } from 'react-router-dom';
// import { Menu } from 'semantic-ui-react';
// import Thread from './Thread';
// import Threads from './Threads';

import { getUsers } from '../../../duck/users';

class Users extends Component {
  componentDidMount = () => {
    this.props.getUsers();
  }
  

  render() {
    return (
      <div className="users">
        <div className="users__content">
          users
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { getUsers })(Users);
