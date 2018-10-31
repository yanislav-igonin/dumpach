import types from '../types';

export const getThreads = (boardId, limitPerPage, offset = 0) => ({
  type: types.threads.GET_THREADS,
  boardId,
  limitPerPage,
  offset,
});

const actions = {
  getThreads,
};

export default actions;
