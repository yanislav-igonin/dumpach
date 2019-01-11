import types from '../types';

export const getThreads = (boardId, threadsPerPage, offset = 0) => ({
  type: types.threads.GET_THREADS,
  boardId,
  threadsPerPage,
  offset,
});

const actions = {
  getThreads,
};

export default actions;
