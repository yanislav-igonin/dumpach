import types from '../types';

export const getThreads = (boardId) => ({
  type: types.threads.GET_THREADS,
  boardId
});

const actions = {
  getThreads,
};

export default actions;
