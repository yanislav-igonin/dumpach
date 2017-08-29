import React from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';

// import './index.scss';

const Threads = ({ children, params }) =>
  <div className="threads">
    <h1 className="main-page__title">
      {location.pathname}
    </h1>

    {/* <Link to={`/${params.boardId}/1`}>1</Link>
    <Link to={`/${params.boardId}/2`}>2</Link>
    <Link to={`/${params.boardId}/3`}>3</Link> */}

    {children}
  </div>;

export default connect()(Threads);
