import React, { PureComponent } from 'react';
import Snackbar from '../Snackbar';

export default class Admin extends PureComponent {
  static onEnter = (nextState, replace, user) => {
    const token = getCookie('token');
    if (token === undefined) {
      if (nextState.location.pathname !== '/admin/login') {
        replace('/admin/login');
      }
    } else {
      if (nextState.location.pathname !== '/admin/dashboard') {
        replace('/admin/dashboard');
      }
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

const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};
