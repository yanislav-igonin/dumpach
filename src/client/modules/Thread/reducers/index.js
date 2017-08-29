import { List } from 'immutable';
import { GET_THREADS_SUCCEEDED } from '../actions';

const threads = (state = List(), action) => {
  switch (action.type) {
    case GET_THREADS_SUCCEEDED:
      return state.push(`data${new Date().getTime()}`);

    default:
      return state;
  }
};

export default threads;
