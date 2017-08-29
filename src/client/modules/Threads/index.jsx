import React from 'react';
import { connect } from 'react-redux';

import ThreadPreview from './components/ThreadPreview';

const Threads = ({ children, params, threads }) => (
  <div className="threads">
    <h1 className="main-page__title">{location.pathname}</h1>

    {threads.map(thread => (
      <ThreadPreview thread={thread} key={location.pathname + thread.id} />
    ))}

    {children}
  </div>
);

const mapStateToProps = state => ({
  threads: state.get('threads'),
});

export default connect(mapStateToProps)(Threads);
