import types from '../types';

export const getThread = (boardId, threadId) => ({
  type: types.thread.GET_THREAD,
  boardId,
  threadId
});

export const createThread = (boardId, data, clearForm, redirectOnThread) => ({
  type: types.thread.CREATE_THREAD,
  boardId,
  data,
  clearForm,
  redirectOnThread
});

const actions = {
  getThread,
  createThread
};

export default actions;
