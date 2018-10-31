import types from '../types';

export const getThreads = (boardId, limitPerPage) => ({
  type: types.threads.GET_THREADS,
  boardId,
  limitPerPage,
});

const actions = {
  getThreads,
};

export default actions;
