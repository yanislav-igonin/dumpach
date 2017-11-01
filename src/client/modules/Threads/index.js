import React from 'react';
import ThreadsList from './components/ThreadsList';

// import CreateThreadForm from './components/CreateThreadForm';
// import { createThread } from './duck';
// import ThreadPreview from './components/ThreadPreview';

const Threads = ({ match, location }) => (
  <div className="threads">
    <h1 className="main-page__title">{location.pathname}</h1>
    {/* <CreateThreadForm
      dispatch={dispatch}
      handleSubmit={(thread) => {
        dispatch(createThread(params.boardId, thread));
      }} */}
      
    <ThreadsList boardId={match.params.boardId} />
  </div>
);

export default Threads;
