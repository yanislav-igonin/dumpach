import { List } from 'immutable';
import { browserHistory } from 'react-router';
import { GET_THREADS_SUCCEEDED, CREATE_THREAD_SUCCEEDED } from '../actions';


const threads = (state = List(), action) => {
  switch (action.type) {
    case GET_THREADS_SUCCEEDED:
      return List(action.threads);

    case CREATE_THREAD_SUCCEEDED:
      browserHistory.push(action.threadId);
      break;

    default:
      return state;
  }
};

export default threads;
