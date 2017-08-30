import React from 'react';
import { connect } from 'react-redux';

import CreateThreadForm from './components/CreateThreadForm';
import { createThread } from './actions';
import ThreadPreview from './components/ThreadPreview';

const Threads = ({ children, params, threads, dispatch }) => (
  <div className="threads">
    <h1 className="main-page__title">{location.pathname}</h1>

    {params.threadId === undefined ? (
      <CreateThreadForm
        handleSubmit={(thread) => {
          debugger
          dispatch(createThread(params.boardId, thread));
        }}
      />
    ) : null}

    {params.threadId === undefined ? (
      threads.map(thread => (
        <ThreadPreview thread={thread} key={location.pathname + thread.id} />
      ))
    ) : null}

    {children}
  </div>
);

const mapStateToProps = state => ({
  threads: state.get('threads'),
});

export default connect(mapStateToProps)(Threads);
