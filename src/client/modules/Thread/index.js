import React from 'react';
import { connect } from 'react-redux';

import AnswerIntThreadForm from './components/AnswerIntThreadForm';
import ThreadContainer from './components/ThreadContainer';
import { answerInThread } from './duck';

const Thread = ({ match, dispatch }) => (
  <div className="thread">
    <AnswerIntThreadForm
      dispatch={dispatch}
      handleSubmit={(post, callback) => {
        dispatch(
          answerInThread(match.params.boardId, match.params.threadId, post, callback)
        );
      }}
    />
    <ThreadContainer
      boardId={match.params.boardId}
      threadId={match.params.threadId}
    />
  </div>
);

export default connect()(Thread);
