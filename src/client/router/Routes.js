import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from '../modules/MainPage';
import Admin from '../modules/Admin';
const Routes = () => (
  <Router>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/" component={MainPage} />
    </Switch>
  </Router>
);

export default Routes;
