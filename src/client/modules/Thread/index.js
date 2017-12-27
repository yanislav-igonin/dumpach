import React from 'react';
import { connect } from 'react-redux';

import AnswerForm from '../../components/AnswerForm';
import ThreadContainer from './components/ThreadContainer';

const Thread = ({ match }) => (
  <div className="thread">
    <AnswerForm match={match} isAnswer={true} />
    <ThreadContainer
      boardId={match.params.boardId}
      threadId={match.params.threadId}
    />
  </div>
);

export default connect()(Thread);
