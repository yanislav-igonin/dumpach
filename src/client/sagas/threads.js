import { put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
  GET_THREADS,
  GET_THREADS_SUCCEEDED,
  GET_THREADS_FAILED,
  DELETE_THREAD,
  DELETE_THREAD_SUCCEEDED,
  DELETE_THREAD_FAILED,
  CREATE_THREAD,
  CREATE_THREAD_SUCCEEDED,
  CREATE_THREAD_FAILED,
} from 'ducks/threads';

  import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from 'ducks/snackbar';

function* getThreads({ boardId }) {
  try {
    const threads = yield fetch(`/api/boards/${boardId}`)
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err.message);
      });

    yield put({ type: GET_THREADS_SUCCEEDED, threads });
  } catch (e) {
    yield put({ type: GET_THREADS_FAILED, message: e.message });
    yield put({ type: OPEN_SNACKBAR, message: 'Can\'t get threads' });
    // yield Router.push(`/not_found`);
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
      body: formData,
    })
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err.message);
      });

    // yield Router.push(`${window.location.pathname}/${threadId}`);
    yield (window.location.pathname = `${window.location.pathname}/${threadId}`);

    yield put({ type: CREATE_THREAD_SUCCEEDED });
    yield put({ type: OPEN_SNACKBAR, message: 'Thread created' });
    yield delay(5000);
    yield put({ type: CLOSE_SNACKBAR });
  } catch (e) {
    yield put({ type: CREATE_THREAD_FAILED, message: e.message });
    yield put({ type: OPEN_SNACKBAR, message: 'Can\'t create thread' });
    yield delay(5000);
    yield put({ type: CLOSE_SNACKBAR });
  }
}

function* threadsSaga() {
  yield takeLatest(GET_THREADS, getThreads);
  yield takeLatest(DELETE_THREAD, deleteThread);
  yield takeLatest(CREATE_THREAD, createThread);
}

export default threadsSaga;
