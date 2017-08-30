import { Map } from 'immutable';
import { GET_THREAD_SUCCEEDED } from '../actions';

const threads = (state = Map(), action) => {
  switch (action.type) {
    case GET_THREAD_SUCCEEDED:
      return Map(action.thread);

    default:
      return state;
  }
};

export default threads;
