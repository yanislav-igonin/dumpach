import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import types from '../types';

function* getBoards() {
  try {
    const response = yield axios.get('/api/boards');

    if (response.status === 200) {
      yield put({ typs: types.boards.GET_BOARDS_SUCCESS, data: response.data.data });
    }
  } catch (err) {
    console.log(err);
  }
}

function* boardsSaga() {
  yield takeLatest(types.boards.GET_BOARDS, getBoards);
}

export default boardsSaga;
