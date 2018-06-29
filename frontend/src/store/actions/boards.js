import types from '../types';

const getBoards = () => ({
  type: types.boards.GET_BOARDS,
});

const actions = {
  getBoards,
};

export default actions;
