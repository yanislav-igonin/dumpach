import { List } from 'immutable';
import { GET_THREADS_SUCCEEDED } from '../actions';

const threads = (state = List(), action) => {
  switch (action.type) {
    case GET_THREADS_SUCCEEDED:
      return action.threads;

    default:
      return state;
  }
};

export default threads;
