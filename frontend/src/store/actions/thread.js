import types from '../types';

export const getThread = (boardId, threadId) => ({
  type: types.thread.GET_THREAD,
  boardId,
  threadId,
});

export const createThread = (boardId, data) => ({
  type: types.threads.CREATE_THREAD,
  boardId,
  data,
});

const actions = {
  getThread,
  createThread
};

export default actions;
