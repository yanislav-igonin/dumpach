import { delay } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';

import { ADD_ASYNC, ADD_ASYNC_SUCCEEDED, ADD_ASYNC_FAILED } from '../actions/data';

function* addAsync(action) {
  try {
    yield delay(1000);
    yield put({ type: ADD_ASYNC_SUCCEEDED });
  } catch (e) {
    yield put({ type: ADD_ASYNC_FAILED, message: e.message });
  }
}

function* rootSaga() {
  yield takeEvery(ADD_ASYNC, addAsync);
}

export default rootSaga;
