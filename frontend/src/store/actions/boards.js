import types from '../types';

export const getBoards = () => ({
  type: types.boards.GET_BOARDS,
});

const actions = {
  getBoards,
};

export default actions;
