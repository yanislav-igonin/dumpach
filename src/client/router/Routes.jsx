import React from 'react';
import { Router, browserHistory, Route } from 'react-router';
import MainPage from '../modules/MainPage';

const Routes = () =>
  <Router history={browserHistory}>
    <Route path="/" component={MainPage} />
  </Router>;

export default Routes;
