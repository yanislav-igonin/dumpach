import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import Threads from '../Threads';

// import Snackbar from '../Snackbar';

import './index.scss';

const MainPage = ({ match }) => (
  <div className="main-page">
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
    </h2>

    <ul className="main-page__boards-list">
      <li>
        <Link to="/b">/b</Link>
      </li>
      <li>
        <Link to="/dev">/dev</Link>
      </li>
    </ul>

    <Route path={`/:boardId`} component={Threads} />

    {/* <Snackbar /> */}
  </div>
);

export default MainPage;
