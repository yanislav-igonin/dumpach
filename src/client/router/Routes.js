import React from 'react';
import { Router, browserHistory, Route, IndexRedirect } from 'react-router';
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

const Routes = ({ getThread, getThreads }) => (
  <Router history={browserHistory}>
    <Route path="admin" component={Admin}>
      <IndexRedirect to="login" />
      <Route
        path="login"
        component={Login}
        onEnter={(nextState, replace) => Admin.onEnter(nextState, replace)}
      />
      <Route
        path="dashboard"
        component={Dashboard}
        onEnter={(nextState, replace) => Admin.onEnter(nextState, replace)}
      />
    </Route>

    <Route path="/" component={MainPage}>
      <Route path="not_found" component={NotFound} />
      <Route
        path=":boardId"
        component={Threads}
        onEnter={({ params }) => getThreads(params)}
      />
      <Route
        path=":boardId/:threadId"
        component={Thread}
        onEnter={({ params }) => getThread(params)}
      />
    </Route>
  </Router>
);

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { getThread, getThreads })(Routes);
