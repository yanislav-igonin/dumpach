import types from '../types';

const initialState = {
  isFetching: false
};

const threads = (state = initialState, action) => {
  switch (action.type) {
    case types.thread.GET_THREAD:
      return { isFetching: true };
    case types.thread.GET_THREAD_SUCCESS:
      return {
        isFetching: false,
        data: action.data,
      };
    default:
      return state;
  }
};

export default threads;
