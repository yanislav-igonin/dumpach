import React from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';

import AnswerIntThreadForm from './components/AnswerIntThreadForm';
import { answerInThread, getThread } from './actions';
import ThreadContainer from './components/ThreadContainer';

const Thread = ({ params, dispatch, thread }) => (
  <div className="thread">
    <h1 className="main-page__title">{location.pathname}</h1>
    <AnswerIntThreadForm
      handleSubmit={(post, callback) => {
        dispatch(answerInThread(params, post, callback));
      }}
    />
    <ThreadContainer thread={thread} boardId={params.boardId} />

    <Button color="primary" onClick={() => dispatch(getThread(params))}>
      Update thread
    </Button>
  </div>
);

const mapStateToProps = state => ({
  thread: state.get('thread'),
});

export default connect(mapStateToProps)(Thread);
