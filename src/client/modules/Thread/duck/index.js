import { Map } from 'immutable';

export const GET_THREAD = 'GET_THREAD';
export const GET_THREAD_SUCCEEDED = 'GET_THREAD_SUCCEEDED';
export const GET_THREAD_FAILED = 'GET_THREAD_FAILED';

export const ANSWER_IN_THREAD = 'ANSWER_IN_THREAD';
export const ANSWER_IN_THREAD_SUCCEEDED = 'ANSWER_IN_THREAD_SUCCEEDED';
export const ANSWER_IN_THREAD_FAILED = 'ANSWER_IN_THREAD_FAILED';

export const getThread = ({ boardId, threadId }) => ({
  type: GET_THREAD,
  boardId,
  threadId,
});

export const answerInThread = ({ boardId, threadId }, post, callback) => ({
  type: ANSWER_IN_THREAD,
  boardId,
  threadId,
  post,
  callback,
});

const threads = (state = Map(), action) => {
  switch (action.type) {
    case GET_THREAD_SUCCEEDED:
      return Map(action.thread);
      
    case ANSWER_IN_THREAD_SUCCEEDED:
      return Map(action.thread);

    default:
      return state;
  }
};

export default threads;
