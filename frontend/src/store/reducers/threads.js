import types from '../types';

const initialState = {
  isFetching: false,
  list: [],
};

const threads = (state = initialState, action) => {
  switch (action.type) {
    case types.threads.GET_THREADS:
      return {
        isFetching: true,
        list: [],
      };
    case types.threads.GET_THREADS_SUCCESS:
      return {
        isFetching: false,
        list: action.data,
      };
    default:
      return state;
  }
};

export default threads;
