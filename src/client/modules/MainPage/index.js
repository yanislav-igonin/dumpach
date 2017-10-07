import React from 'react';
import { Link } from 'react-router';

import Snackbar from '../Snackbar';

import './index.scss';

const MainPage = ({ children }) => (
  <div className="main-page">
    <h1 className="main-page__title">Dumpach</h1>
    <div className="main-page__source-link-container">
      <Link
        target="_blank"
        to="https://github.com/yanislav-igonin/dumpach/tree/master"
      >
        Sources
        <i className="fa fa-github" aria-hidden="true" />
      </Link>
    </div>
    <h2 className="main-page__under-construction">
      Still under construction
      <i className="fa fa-wrench" aria-hidden="true" />
    </h2>

    <ul className="main-page__boards-list">
      <li>
        <Link to="/b">/b</Link>
      </li>
      <li>
        <Link to="/dev">/dev</Link>
      </li>
    </ul>

    {children}

    <Snackbar />
  </div>
);

export default MainPage;
