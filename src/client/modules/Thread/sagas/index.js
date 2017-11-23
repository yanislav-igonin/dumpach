import { put, call, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
// import { browserHistory } from 'react-router';

import {
  GET_THREAD,
  GET_THREAD_SUCCEEDED,
  GET_THREAD_FAILED,
  DELETE_THREAD,
  DELETE_THREAD_SUCCEEDED,
  DELETE_THREAD_FAILED,
  ANSWER_IN_THREAD,
  ANSWER_IN_THREAD_SUCCEEDED,
  ANSWER_IN_THREAD_FAILED,
} from '../duck';

import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from '../../Snackbar/duck';

function* getThread({ boardId, threadId }) {
  try {
    const thread = yield fetch(`/api/boards/${boardId}/${threadId}`).then((res) =>
      res.json()
    );

    if (thread.id === undefined) {
      // yield browserHistory.push(`/not_found`);
    } else {
      yield put({ type: GET_THREAD_SUCCEEDED, thread });
    }
  } catch (e) {
    yield put({ type: GET_THREAD_FAILED, message: e.message });
    yield put({ type: OPEN_SNACKBAR, message: 'Can\'t get thread' });
    yield delay(5000);
    yield put({ type: CLOSE_SNACKBAR });
  }
}

function* deleteThread({ boardId, threadId }) {
  try {
    const res = yield fetch(`/api/boards/${boardId}/${threadId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (res.status === 200) {
      yield put({ type: DELETE_THREAD_SUCCEEDED, threadId });
    } else {
      yield put({ type: DELETE_THREAD_FAILED, message: yield res.text() });
    }
  } catch (e) {
    yield put({ type: DELETE_THREAD_FAILED, message: e.message });
    yield put({ type: OPEN_SNACKBAR, message: 'Can\'t get thread' });
    yield delay(5000);
    yield put({ type: CLOSE_SNACKBAR });
  }
}

function* answerInThread({ boardId, threadId, post, callback }) {
  try {
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('text', post.text);
    formData.append('sage', post.sage);
    post.files.forEach((file) => {
      formData.append('files', file, file.name);
    });

    const thread = yield fetch(`/api/boards/${boardId}/${threadId}`, {
      method: 'POST',
      body: formData,
    }).then((res) => res.json());

    yield call(callback);
    yield put({ type: ANSWER_IN_THREAD_SUCCEEDED, thread });
    yield put({ type: OPEN_SNACKBAR, message: 'Answer posted' });
    yield delay(5000);
    yield put({ type: CLOSE_SNACKBAR });
  } catch (e) {
    yield put({ type: ANSWER_IN_THREAD_FAILED, message: e.message });
    yield put({ type: OPEN_SNACKBAR, message: 'Can\'t answer in thread' });
    yield delay(5000);
    yield put({ type: CLOSE_SNACKBAR });
  }
}

function* threadsSaga() {
  yield takeEvery(GET_THREAD, getThread);
  yield takeEvery(DELETE_THREAD, deleteThread);
  yield takeEvery(ANSWER_IN_THREAD, answerInThread);
}

export default threadsSaga;
