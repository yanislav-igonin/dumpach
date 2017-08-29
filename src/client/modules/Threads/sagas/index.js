import { delay } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';

import { GET_THREADS, GET_THREADS_SUCCEEDED, GET_THREADS_FAILED } from '../actions';

function* getThreads(action) {
  try {
    yield delay(1000);
    yield put({ type: GET_THREADS_SUCCEEDED });
  } catch (e) {
    yield put({ type: GET_THREADS_FAILED, message: e.message });
  }
}

function* threadsSaga() {
  yield takeEvery(GET_THREADS, getThreads);
}

export default threadsSaga;
