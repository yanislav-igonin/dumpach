import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import Threads from '../Threads';
import Thread from '../Thread';
import Snackbar from '../Snackbar';


import './index.scss';

const MainPage = ({ match, location }) => (
  <div className="main-page">

    <div className="main-page__overlay" />

    <h1 className="main-page__title">Dumpach</h1>
    <div className="main-page__source-link-container">
      <Link
        target="_blank"
        to="https://github.com/yanislav-igonin/dumpach/tree/master"
      >
        Sources
        <Icon name="github" />
      </Link>
    </div>
    <h2 className="main-page__under-construction">
      Still under construction
      <Icon className="wrench-icon" name="wrench" />

      Build: 20
    </h2>

    <ul className="main-page__boards-list">
      <li>
        <Link to="/b">/b</Link>
      </li>
      <li>
        <Link to="/dev">/dev</Link>
      </li>
    </ul>

    <h1 className="main-page__title">{location.pathname}</h1>

    <Switch>
      <Route path={`/:boardId/:threadId`} component={Thread} />
      <Route path={`/:boardId`} component={Threads} />
    </Switch>
    
    <Snackbar />
  </div>
);

export default MainPage;
