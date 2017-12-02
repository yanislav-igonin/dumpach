import { put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
  GET_USERS,
  GET_USERS_SUCCEEDED,
  GET_USERS_FAILED,
} from '../duck/users';
import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from '../../Snackbar/duck';

function* getUsers() {
  try {
    const users = yield fetch('/api/users', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json());

    if (users.length >= 0) {
      yield put({ type: GET_USERS_SUCCEEDED, users });
    } else {
      throw new Error('Cant get users');
    }
  } catch (e) {
    yield put({ type: GET_USERS_FAILED, message: e.message });
    yield put({ type: OPEN_SNACKBAR, message: 'Wrong login or password' });
    yield delay(5000);
    yield put({ type: CLOSE_SNACKBAR });
  }
}

function* usersSaga() {
  yield takeLatest(GET_USERS, getUsers);
}

export default usersSaga;
