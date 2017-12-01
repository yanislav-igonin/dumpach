import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Switch, Route } from 'react-router-dom';
// import { Menu } from 'semantic-ui-react';
// import Thread from './Thread';
// import Threads from './Threads';

// import { deleteThread } from '../../../../Threads/duck';

class Users extends Component {
  

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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { })(Users);
