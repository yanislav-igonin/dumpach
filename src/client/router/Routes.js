import React from 'react';
import { Router, browserHistory, Route } from 'react-router';
import { connect } from 'react-redux';
import MainPage from '../modules/MainPage';
import Threads from '../modules/Threads';
import Thread from '../modules/Thread';
import NotFound from '../modules/NotFound';
import Admin from '../modules/Admin';
import Login from '../modules/Admin/components/Login';
import Dashboard from '../modules/Admin/components/Dashboard';
import { getThreads } from '../modules/Threads/duck';
import { getThread } from '../modules/Thread/duck';

const Routes = ({ dispatch, user }) => (
  <Router history={browserHistory}>
    <Route path="admin" component={Admin}>
      <Route
        path="login"
        component={Login}
        onEnter={(nextState, replace) => Admin.onEnter(nextState, replace, user)}
      />
      <Route
        path="dashboard"
        component={Dashboard}
        onEnter={(nextState, replace) => Admin.onEnter(nextState, replace, user)}
      />
    </Route>

    <Route path="/" component={MainPage}>
      <Route path="not_found" component={NotFound} />
      <Route
        path=":boardId"
        component={Threads}
        onEnter={({ params }) => dispatch(getThreads(params))}
      />
      <Route
        path=":boardId/:threadId"
        component={Thread}
        onEnter={({ params }) => dispatch(getThread(params))}
      />
    </Route>
  </Router>
);

const mapStateToProps = (state) => ({
  user: state.get('user'),
});

export default connect(mapStateToProps)(Routes);
