import types from '../types';

const initialState = {
  isFetching: false,
  data: [],
};

const boards = (state = initialState, action) => {
  switch (action.type) {
    case types.boards.GET_BOARDS:
      return {
        isFetching: true,
        data: [],
      };
    case types.boards.GET_BOARDS_SUCCESS:
      return {
        isFetching: false,
        data: action.data,
      };
    default:
      return state;
  }
};

export default boards;
