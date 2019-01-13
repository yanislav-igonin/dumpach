import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import config from '../../config';
import types from '../types';

function* getThreads({ boardId, threadsPerPage, offset }) {
  try {
    const response = yield axios.get(
      `${
        config.app.api.endpoint
      }/boards/${boardId}/threads?limit=${threadsPerPage}&offset=${offset}`
    );

    if (response.status === 200) {
      yield put({
        type: types.threads.GET_THREADS_SUCCESS,
        data: response.data,
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
