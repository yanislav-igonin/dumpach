import React from 'react';
import { Link } from 'react-router';

import './index.scss';

const MainPage = () =>
  <div className="main-page">
    <h1 className="main-page__title">Dumpach</h1>

    <ul className="main-page__boards-list">
      <li>
        <Link to="b">/b</Link>
      </li>
      <li>
        <Link to="dev">/dev</Link>
      </li>
    </ul>
  </div>;

export default MainPage;
