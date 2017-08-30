import { put, takeLatest } from 'redux-saga/effects';

import {
  GET_THREADS,
  GET_THREADS_SUCCEEDED,
  GET_THREADS_FAILED,
  CREATE_THREAD,
  CREATE_THREAD_SUCCEEDED,
  CREATE_THREAD_FAILED,
} from '../actions';

function* getThreads(action) {
  try {
    const threads = yield fetch(`/api/${action.boardId}`)
      .then(res => res.json())
      .catch((err) => {
        throw { message: err.message };
      });

    yield put({ type: GET_THREADS_SUCCEEDED, threads });
  } catch (e) {
    yield put({ type: GET_THREADS_FAILED, message: e.message });
  }
}

function* createThread(action) {
  try {
    const threadId = yield fetch(`/api/${action.boardId}`, {
      method: 'POST',
      body: JSON.stringify(action.thread),
    })
      .then(res => res.json())
      .catch((err) => {
        throw { message: err.message };
      });

    yield put({ type: CREATE_THREAD_SUCCEEDED, threadId });
  } catch (e) {
    yield put({ type: CREATE_THREAD_FAILED, message: e.message });
  }
}

function* threadsSaga() {
  yield takeLatest(GET_THREADS, getThreads);
  yield takeLatest(CREATE_THREAD, createThread);
}

export default threadsSaga;
