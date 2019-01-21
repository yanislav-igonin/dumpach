import types from '../types';

const initialState = {
  isFetching: true,
  data: {},
};

const threads = (state = initialState, action) => {
  switch (action.type) {
    case types.thread.GET_THREAD:
      return { isFetching: true, data: {} };
    case types.thread.GET_THREAD_SUCCESS:
      return {
        isFetching: false,
        data: action.data,
      };
    case types.thread.UPDATE_THREAD_SUCCESS:
      return {
        data: action.data,
      };
    default:
      return state;
  }
};

export default threads;
