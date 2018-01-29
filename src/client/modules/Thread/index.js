import React from 'react';
import { connect } from 'react-redux';

import AnswerForm from 'shared/components/AnswerForm';
import ThreadContainer from './components/ThreadContainer';

const Thread = ({ match }) => (
  <div className="thread">
    <AnswerForm match={match} isAnswer={true} />
    <ThreadContainer match={match} />
  </div>
);

export default connect()(Thread);
