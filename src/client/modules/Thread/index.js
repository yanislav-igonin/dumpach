import React from 'react';
import { connect } from 'react-redux';

import AnswerIntThreadForm from './components/AnswerIntThreadForm';
import ThreadContainer from './components/ThreadContainer';

const Thread = ({ match, dispatch }) => (
  <div className="thread">
    <AnswerIntThreadForm match={match} />
    <ThreadContainer
      boardId={match.params.boardId}
      threadId={match.params.threadId}
    />
  </div>
);

export default connect()(Thread);
