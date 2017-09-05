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
    const thread = yield fetch(`/api/boards/${boardId}/${threadId}`)
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
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json, text/plain, */*');
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('text', post.text);
    formData.append('sage', post.sage);
    formData.append('files', post.files);

    const thread = yield fetch(`/api/boards/${boardId}/${threadId}`, {
      method: 'POST',
      // headers,
      body: formData,
    })
      .then(res => res.json())
      .catch((err) => {
        throw { message: err.message };
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
