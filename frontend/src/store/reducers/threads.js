import types from '../types';

const initialState = {
  isFetching: true,
  data: [],
  count: 0,
  isLastPage: true,
};

const threads = (state = initialState, action) => {
  switch (action.type) {
    case types.threads.GET_THREADS:
      return {
        ...state,
        isFetching: true,
        data: [],
      };
    case types.threads.GET_THREADS_SUCCESS:
      return {
        isFetching: false,
        data: action.data.data,
        count: action.data.count,
        isLastPage: action.data.is_last_page,
      };
    default:
      return state;
  }
};

export default threads;
