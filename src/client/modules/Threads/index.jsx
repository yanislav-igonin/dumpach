import React from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';

// import './index.scss';

const Threads = ({ children, params }) =>
  <div className="threads">
    <h1 className="main-page__title">
      {location.pathname}
    </h1>

    {children}
  </div>;

export default connect()(Threads);
