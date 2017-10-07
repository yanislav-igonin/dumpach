import React from 'react';
import { Router, browserHistory, Route } from 'react-router';
import { connect } from 'react-redux';
import MainPage from '../modules/MainPage';
import Threads from '../modules/Threads';
import Thread from '../modules/Thread';
import { getThreads } from '../modules/Threads/actions';
import { getThread } from '../modules/Thread/duck';

const Routes = ({ dispatch }) => (
  <Router history={browserHistory}>
    <Route path="/" component={MainPage}>
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

export default connect()(Routes);
