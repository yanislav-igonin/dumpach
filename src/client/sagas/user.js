import { put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
  LOGIN,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  AUTHORIZE,
  AUTHORIZE_SUCCEEDED,
  AUTHORIZE_FAILED,
  LOGOUT,
  LOGOUT_SUCCEEDED,
  LOGOUT_FAILED,
} from 'ducks/user';

import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from 'ducks/snackbar';

function* login({ login, password }) {
  try {
    const user = yield fetch('/api/users/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ login, password }),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err.message);
      });

    if (user !== undefined) {
      yield put({ type: LOGIN_SUCCEEDED, user });
      window.location = '/admin/dashboard';
    } else {
      throw new Error('Wrong login or password');
    }
  } catch (e) {
    yield put({ type: LOGIN_FAILED, message: e.message });
    yield put({ type: OPEN_SNACKBAR, message: 'Wrong login or password' });
    yield delay(5000);
    yield put({ type: CLOSE_SNACKBAR });
  }
}

function* authorize({ token }) {
  try {
    const user = yield fetch('/api/users/authorize', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ token }),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err.message);
      });

    if (user !== undefined) {
      yield put({ type: AUTHORIZE_SUCCEEDED, user });
    } else {
      throw new Error('Wrong login or password');
    }
  } catch (e) {
    yield put({ type: AUTHORIZE_FAILED, message: e.message });
    yield put({ type: OPEN_SNACKBAR, message: 'Wrong login or password' });
    yield delay(5000);
    yield put({ type: CLOSE_SNACKBAR });
    window.location = '/admin/login';
  }
}

function* logout() {
  try {
    const status = yield fetch('/api/users/logout', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.status)
      .catch((err) => {
        throw new Error(err.message);
      });
      
    if (status === 200) {
      yield put({ type: LOGOUT_SUCCEEDED });
      window.location = '/admin/login';
    } else {
      throw new Error('Logout failed');
    }
  } catch (e) {
    yield put({ type: LOGOUT_FAILED, message: e.message });
    yield put({ type: OPEN_SNACKBAR, message: e.message });
    yield delay(5000);
    yield put({ type: CLOSE_SNACKBAR });
  }
}

function* userSaga() {
  yield takeLatest(LOGIN, login);
  yield takeLatest(AUTHORIZE, authorize);
  yield takeLatest(LOGOUT, logout);
}

export default userSaga;
