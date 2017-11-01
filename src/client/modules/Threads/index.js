import React from 'react';
import { connect } from 'react-redux';

import ThreadsList from './components/ThreadsList';
import CreateThreadForm from './components/CreateThreadForm';
import { createThread } from './duck';

const Threads = ({ match, dispatch }) => (
  <div className="threads">
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
