import React, { PureComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Snackbar from '../Snackbar';

export default class Admin extends PureComponent {
  checkAuthorization() {
    const { match, location } = this.props;
    const token = getCookie('token');
    
    if (token === undefined) {
      if(location.pathname !== '/admin/login'){
        return <Redirect to={`${match.url}/login`} />;
      }
    } else {
        // validate token
        return <Redirect to={`${match.url}/dashboard`} />;
    }
  };

  render() {
    
    
    return (
      <div className="admin">
        {this.checkAuthorization()}

        <Switch>
          <Route path="/admin/login" component={Login} />
          {/* <Route path="/" component={} /> */}
        </Switch>

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
