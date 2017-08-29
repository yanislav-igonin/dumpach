import { delay } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';

import { GET_THREAD, GET_THREAD_SUCCEEDED, GET_THREAD_FAILED } from '../actions';

function* getThread(action) {
  try {
    yield delay(1000);
    yield put({ type: GET_THREAD_SUCCEEDED });
  } catch (e) {
    yield put({ type: GET_THREAD_FAILED, message: e.message });
  }
}

function* threadsSaga() {
  yield takeEvery(GET_THREAD, getThread);
}

export default threadsSaga;
