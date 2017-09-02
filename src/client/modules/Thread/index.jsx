import React from 'react';
import { connect } from 'react-redux';

import AnswerIntThreadForm from './components/AnswerIntThreadForm';
import { answerInThread } from './actions';
import ThreadContainer from './components/ThreadContainer';

const Thread = ({ params, dispatch, thread }) => (
  <div className="thread">
    <h1 className="main-page__title">{location.pathname}</h1>
    <AnswerIntThreadForm
      handleSubmit={(post) => {
        dispatch(answerInThread(params, post));
      }}
    />
    <ThreadContainer thread={thread} />
  </div>
);

const mapStateToProps = state => ({
  thread: state.get('thread'),
});

export default connect(mapStateToProps)(Thread);
