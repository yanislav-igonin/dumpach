export const GET_THREAD = 'GET_THREAD';
export const GET_THREAD_SUCCEEDED = 'GET_THREAD_SUCCEEDED';
export const GET_THREAD_FAILED = 'GET_THREAD_FAILED';

export const getThread = ({ boardId, threadId }) => ({
  type: GET_THREAD,
  boardId,
  threadId,
});
