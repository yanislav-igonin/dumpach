import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import types from '../types';

function* getThread({ boardId, threadId }) {
  try {
    const response = yield axios.get(`/api/boards/${boardId}/threads/${threadId}`);

    if (response.status === 200) {
      yield put({
        type: types.thread.GET_THREAD_SUCCESS,
        data: response.data.data,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function* threadSaga() {
  yield takeLatest(types.thread.GET_THREAD, getThread);
}

export default threadSaga;
