import { put, takeEvery } from 'redux-saga/effects';

import {
  GET_THREAD,
  GET_THREAD_SUCCEEDED,
  GET_THREAD_FAILED,
  ANSWER_IN_THREAD,
  ANSWER_IN_THREAD_SUCCEEDED,
  ANSWER_IN_THREAD_FAILED,
} from '../actions';

function* getThread({ boardId, threadId }) {
  try {
    const thread = yield fetch(`/api/${boardId}/${threadId}`)
      .then(res => res.json())
      .catch((err) => {
        throw { message: err.message };
      });

    yield put({ type: GET_THREAD_SUCCEEDED, thread });
  } catch (e) {
    yield put({ type: GET_THREAD_FAILED, message: e.message });
  }
}

function* answerInThread({ boardId, threadId, post }) {
  try {
    const thread = yield fetch(`/api/${boardId}/${threadId}`, {
      method: 'POST',
      body: JSON.stringify(post),
    });

    yield put({ type: ANSWER_IN_THREAD_SUCCEEDED, thread });
  } catch (e) {
    yield put({ type: ANSWER_IN_THREAD_FAILED, message: e.message });
  }
}

function* threadsSaga() {
  yield takeEvery(GET_THREAD, getThread);
  yield takeEvery(ANSWER_IN_THREAD, answerInThread);
}

export default threadsSaga;
