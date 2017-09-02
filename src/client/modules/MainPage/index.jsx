import React from 'react';
import { Link } from 'react-router';

import './index.scss';

const MainPage = ({ children }) => (
  <div className="main-page">
    <h1 className="main-page__title">Dumpach</h1>
    <h2 className="main-page__under-construction">
      Still under construction
      <i className="fa fa-wrench icon" aria-hidden="true" />
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
  </div>
);

export default MainPage;
