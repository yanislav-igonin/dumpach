import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import AnswerIntThreadForm from './components/AnswerIntThreadForm';
import { answerInThread, getThread } from './duck';
import ThreadContainer from './components/ThreadContainer';

const Thread = ({ params, location, dispatch, thread }) => (
  <div className="thread">
    <h1 className="main-page__title">{location.pathname}</h1>
    <AnswerIntThreadForm
      dispatch={dispatch}
      handleSubmit={(post, callback) => {
        dispatch(answerInThread(params, post, callback));
      }}
    />
    <ThreadContainer thread={thread} boardId={params.boardId} />

    <Link to="#" style={{ cursor: 'pointer' }} onClick={(e) => {
      e.preventDefault();
      dispatch(getThread(params)
    )}}>
      Update thread
    </Link>
  </div>
);

const mapStateToProps = (state) => ({
  thread: state.get('thread'),
});

export default connect(mapStateToProps)(Thread);
