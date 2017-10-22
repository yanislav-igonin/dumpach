import React, { PureComponent } from 'react';
import Snackbar from '../Snackbar';

export default class Admin extends PureComponent {
  static onEnter = (nextState, replace, user) => {
    const { login } = user.toJS();
    if (login === undefined) {
      if (nextState.location.pathname !== '/admin/login') {
        replace('/admin/login');
      }
    } else {
      replace('/admin/dashboard');
    }
  };

  render() {
    const { children } = this.props;

    return (
      <div className="admin">
        {children}
        <Snackbar />
      </div>
    );
  }
}
