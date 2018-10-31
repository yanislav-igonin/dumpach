import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import types from '../types';

function* getThreads({ boardId, limitPerPage }) {
  try {
    const response = yield axios.get(`/api/boards/${boardId}/threads?limit=${limitPerPage}`);

    if (response.status === 200) {
      yield put({
        type: types.threads.GET_THREADS_SUCCESS,
        data: response.data
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function* threadsSaga() {
  yield takeLatest(types.threads.GET_THREADS, getThreads);
}

export default threadsSaga;
