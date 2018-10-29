import types from '../types';

export const getThread = (boardId, threadId) => ({
  type: types.thread.GET_THREAD,
  boardId,
  threadId,
});

const actions = {
  getThread,
};

export default actions;
