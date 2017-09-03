export const GET_THREADS = 'GET_THREADS';
export const GET_THREADS_SUCCEEDED = 'GET_THREADS_SUCCEEDED';
export const GET_THREADS_FAILED = 'GET_THREADS_FAILED';

export const CREATE_THREAD = 'CREATE_THREAD';
export const CREATE_THREAD_SUCCEEDED = 'CREATE_THREAD_SUCCEEDED';
export const CREATE_THREAD_FAILED = 'CREATE_THREAD_FAILED';

export const getThreads = ({ boardId }) => ({
  type: GET_THREADS,
  boardId,
});

export const createThread = (boardId, thread) => ({
  type: CREATE_THREAD,
  boardId,
  thread,
});
