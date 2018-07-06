import types from '../types';

const initialState = {
  isFetching: false,
  list: [],
};

const boards = (state = initialState, action) => {
  switch (action.type) {
    case types.boards.GET_BOARDS:
      return {
        isFetching: true,
        list: [],
      };
    case types.boards.GET_BOARDS_SUCCESS:
      return {
        isFetching: false,
        list: action.data,
      };
    default:
      return state;
  }
};

export default boards;
