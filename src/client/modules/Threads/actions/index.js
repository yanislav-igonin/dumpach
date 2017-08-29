export const GET_THREADS = 'GET_THREADS';
export const GET_THREADS_SUCCEEDED = 'GET_THREADS_SUCCEEDED';
export const GET_THREADS_FAILED = 'GET_THREADS_FAILED';

export const getThreads = ({ boardId }) => ({
  type: GET_THREADS,
  boardId,
});
