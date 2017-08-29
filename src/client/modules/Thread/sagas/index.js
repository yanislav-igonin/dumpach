import { put, takeEvery } from 'redux-saga/effects';

import {
  GET_THREAD,
  GET_THREAD_SUCCEEDED,
  GET_THREAD_FAILED,
} from '../actions';

function* getThread(action) {
  try {
    const thread = yield fetch(`${action.threadId}`)
      .then(res => res.json())
      .catch((err) => {
        throw { message: err.message };
      });

    yield put({ type: GET_THREAD_SUCCEEDED, thread });
  } catch (e) {
    yield put({ type: GET_THREAD_FAILED, message: e.message });
  }
}

function* threadsSaga() {
  yield takeEvery(GET_THREAD, getThread);
}

export default threadsSaga;
