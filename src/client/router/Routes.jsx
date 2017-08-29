import React from 'react';
import { Router, browserHistory, Route } from 'react-router';
import MainPage from '../modules/MainPage';
import Threads from '../modules/Threads';

const Routes = () =>
  <Router history={browserHistory}>
    <Route path="/" component={MainPage}>
      <Route path=":boardId" component={Threads}>
        <Route path=":threadId" component={Threads} />
      </Route>
    </Route>
  </Router>;

export default Routes;
