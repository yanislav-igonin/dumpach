import { put, takeLatest } from 'redux-saga/effects';

import {
  GET_THREADS,
  GET_THREADS_SUCCEEDED,
  GET_THREADS_FAILED,
} from '../actions';

function* getThreads(action) {
  try {
    const threads = yield fetch(`api/${action.boardId}`)
      .then(res => res.json())
      .catch((err) => {
        throw { message: err.message };
      });

    yield put({ type: GET_THREADS_SUCCEEDED, threads });
  } catch (e) {
    yield put({ type: GET_THREADS_FAILED, message: e.message });
  }
}

function* threadsSaga() {
  yield takeLatest(GET_THREADS, getThreads);
}

export default threadsSaga;
