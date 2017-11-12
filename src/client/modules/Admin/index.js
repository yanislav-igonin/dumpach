import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import { authorize } from './duck';
import Snackbar from '../Snackbar';

class Admin extends PureComponent {
  constructor(props){
    super(props);

    this.lastLocation = '';
  }
  checkAuthorization() {
    const { match, location } = this.props;
    const token = getCookie('token');

    if (token === undefined) {
      if (location.pathname !== '/admin/login') {
        return <Redirect to={`${match.url}/login`} />;
      }
    } else {
      debugger
      if (location.pathname !== this.lastLocation) {
        this.props.authorize(token);
        if(location.pathname === '/admin'){
          return <Redirect to="/admin/dashboard" />;
        }
      }
      this.lastLocation = location.pathname;
    }
  }

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

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { authorize })(Admin);

const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};
