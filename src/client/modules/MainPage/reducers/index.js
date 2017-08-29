import { List } from 'immutable';
import { ADD_ASYNC_SUCCEEDED } from '../actions';

const dataReducer = (state = List(), action) => {
  switch (action.type) {
    case ADD_ASYNC_SUCCEEDED:
      return state.push(`data${new Date().getTime()}`);

    default:
      return state;
  }
};

export default dataReducer;
