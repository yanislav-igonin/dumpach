import React from 'react';
import { connect } from 'react-redux';

import AnswerForm from '../../components/AnswerForm';
import ThreadsList from './components/ThreadsList';

const Threads = ({ match }) => (
  <div className="threads">
    <AnswerForm match={match} />
    <ThreadsList boardId={match.params.boardId} />
  </div>
);

export default connect()(Threads);
