import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './modules/Dashboard';
import { authorize } from 'ducks/user';
import Snackbar from '../Snackbar';

class Admin extends PureComponent {
  checkAuthorization() {
    const { match, location } = this.props;
    const token = getCookie('token');

    if (token === undefined) {
      if (location.pathname !== '/admin/login') {
        return <Redirect to={`${match.url}/login`} />;
      }
    } else {
      this.props.authorize(token);
      if (location.pathname === '/admin') {
        return <Redirect to={`${match.url}/dashboard`} />;
      }
    }
  }

  render() {
    const { match } = this.props;
    return (
      <div className="admin">

        {this.checkAuthorization()}

        <Switch>
          <Route path={`${match.url}/login`} component={Login} />
          <Route path={`${match.url}/dashboard`} component={Dashboard} />
        </Switch>

        <Snackbar />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // user: state.user,
});

export default connect(mapStateToProps, { authorize })(Admin);

const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};
