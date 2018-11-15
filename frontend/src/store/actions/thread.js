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

export const updateThread = (boardId, threadId, data, clearForm) => ({
  type: types.thread.UPDATE_THREAD,
  boardId,
  threadId,
  data,
  clearForm
});

const actions = {
  getThread,
  createThread,
  updateThread
};

export default actions;
