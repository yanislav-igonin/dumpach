import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import config from '../../config';
import types from '../types';

function* getBoards() {
  try {
    const response = yield axios.get(`${config.app.api.endpoint}/boards`);

    if (response.status === 200) {
      yield put({
        type: types.boards.GET_BOARDS_SUCCESS,
        data: response.data.data,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function* boardsSaga() {
  yield takeLatest(types.boards.GET_BOARDS, getBoards);
}

export default boardsSaga;
