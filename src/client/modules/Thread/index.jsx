import React from 'react';
import { connect } from 'react-redux';

import ThreadContainer from './components/ThreadContainer';

const Thread = ({ thread }) =>
  <div className="thread">
    <ThreadContainer thread={thread} />
  </div>;

const mapStateToProps = state => ({
  thread: state.get('thread'),
});

export default connect(mapStateToProps)(Thread);
