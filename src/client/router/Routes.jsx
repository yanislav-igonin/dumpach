import React from 'react';
import { Router, browserHistory, Route } from 'react-router';
import Main from '../components/Main';

const Routes = () =>
  <Router history={browserHistory}>
    <Route path="/" component={Main} />
  </Router>;

export default Routes;
