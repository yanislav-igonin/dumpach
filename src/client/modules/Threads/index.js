import React from 'react';
import { connect } from 'react-redux';

import ThreadsList from './components/ThreadsList';
import CreateThreadForm from './components/CreateThreadForm';
import { createThread } from './duck';

const Threads = ({ match, location, dispatch }) => (
  <div className="threads">
    <h1 className="main-page__title">{location.pathname}</h1>
    <CreateThreadForm
      dispatch={dispatch}
      handleSubmit={(thread) => {
        dispatch(createThread(match.params.boardId, thread));
      }}
    />

    <ThreadsList boardId={match.params.boardId} />
  </div>
);

export default connect()(Threads);
