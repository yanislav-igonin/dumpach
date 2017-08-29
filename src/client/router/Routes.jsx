import React from 'react';
import { Router, browserHistory, Route } from 'react-router';
import MainPage from '../modules/MainPage';
import Threads from '../modules/Threads';
import Thread from '../modules/Thread';

const Routes = () =>
  <Router history={browserHistory}>
    <Route path="/" component={MainPage}>
      <Route path=":boardId" component={Threads}>
        <Route path=":threadId" component={Thread} />
      </Route>
    </Route>
  </Router>;

export default Routes;
