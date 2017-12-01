//TYPES
export const GET_THREADS = 'GET_THREADS';
export const GET_THREADS_SUCCEEDED = 'GET_THREADS_SUCCEEDED';
export const GET_THREADS_FAILED = 'GET_THREADS_FAILED';

export const DELETE_THREAD = 'DELETE_THREAD';
export const DELETE_THREAD_SUCCEEDED = 'DELETE_THREAD_SUCCEEDED';
export const DELETE_THREAD_FAILED = 'DELETE_THREAD_FAILED';

export const CREATE_THREAD = 'CREATE_THREAD';
export const CREATE_THREAD_SUCCEEDED = 'CREATE_THREAD_SUCCEEDED';
export const CREATE_THREAD_FAILED = 'CREATE_THREAD_FAILED';

//ACTION CREATORS
export const getThreads = (boardId) => ({
  type: GET_THREADS,
  boardId,
});

export const deleteThread = (boardId, threadId) => ({
  type: DELETE_THREAD,
  boardId,
  threadId,
});

export const createThread = (boardId, thread) => ({
  type: CREATE_THREAD,
  boardId,
  thread,
});

//REDUCER
const threads = (state = [], action) => {
  switch (action.type) {
    case GET_THREADS_SUCCEEDED:
      return action.threads;

    case DELETE_THREAD_SUCCEEDED:
      return state.slice().filter((thread) => thread.id !== action.threadId);

    default:
      return state;
  }
};

export default threads;
