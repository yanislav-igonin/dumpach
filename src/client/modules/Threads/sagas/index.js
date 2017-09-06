import { put, takeLatest } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

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
    const threads = yield fetch(`/api/boards/${action.boardId}`)
      .then(res => res.json())
      .catch((err) => {
        throw { message: err.message };
      });

    yield put({ type: GET_THREADS_SUCCEEDED, threads });
  } catch (e) {
    yield put({ type: GET_THREADS_FAILED, message: e.message });
  }
}

function* createThread({ boardId, thread }) {
  try {
    const formData = new FormData();
    formData.append('title', thread.title);
    formData.append('text', thread.text);
    thread.files.forEach((file) => {
      formData.append('files', file, file.name);
    });

    const threadId = yield fetch(`/api/boards/${boardId}`, {
      method: 'POST',
      // headers,
      body: formData,
    })
      .then(res => res.json())
      .catch((err) => {
        throw { message: err.message };
      });

    yield browserHistory.replace(`${window.location.href}/${threadId}`);

    yield put({ type: CREATE_THREAD_SUCCEEDED });
  } catch (e) {
    yield put({ type: CREATE_THREAD_FAILED, message: e.message });
  }
}

function* threadsSaga() {
  yield takeLatest(GET_THREADS, getThreads);
  yield takeLatest(CREATE_THREAD, createThread);
}

export default threadsSaga;
