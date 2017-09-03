import React from 'react';
import { connect } from 'react-redux';

import CreateThreadForm from './components/CreateThreadForm';
import { createThread } from './actions';
import ThreadPreview from './components/ThreadPreview';

const Threads = ({ children, params, dispatch, threads }) => (
  <div className="threads">
    <h1 className="main-page__title">{location.pathname}</h1>
    <CreateThreadForm
      handleSubmit={(thread) => {
        dispatch(createThread(params.boardId, thread));
      }}
    />

    {threads.map(thread => (
      <ThreadPreview thread={thread} key={location.pathname + thread.id} />
    ))}
  </div>
);

const mapStateToProps = state => ({
  threads: state.get('threads'),
});

export default connect(mapStateToProps)(Threads);
