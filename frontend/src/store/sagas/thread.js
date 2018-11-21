import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import types from '../types';

function* getThread({ boardId, threadId }) {
  try {
    const response = yield axios.get(`/api/boards/${boardId}/threads/${threadId}`);

    if (response.status === 200) {
      yield put({
        type: types.thread.GET_THREAD_SUCCESS,
        data: response.data.data
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function* createThread({ boardId, data, clearForm, redirectOnThread }) {
  try {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('text', data.text);
    formData.append('is_sage', data.isSage);
    data.attachments.forEach((attachment, index) =>
      formData.append(`file_${index}`, attachment)
    );

    const response = yield axios.post(`/api/boards/${boardId}/threads`, formData);

    if (response.status === 201) {
      clearForm();

      redirectOnThread(response.data.data.id);

      yield put({
        type: types.thread.CREATE_THREAD_SUCCESS
        // data: response.data.data
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function* updateThread({ boardId, threadId, data, clearForm }) {
  try {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('text', data.text);
    formData.append('is_sage', data.isSage);
    data.attachments.forEach((attachment, index) =>
      formData.append(`file_${index}`, attachment)
    );

    const response = yield axios.post(
      `/api/boards/${boardId}/threads/${threadId}`,
      formData
    );

    if (response.status === 200) {
      clearForm();

      yield put({
        type: types.thread.UPDATE_THREAD_SUCCESS,
        data: response.data.data
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function* threadSaga() {
  yield takeLatest(types.thread.GET_THREAD, getThread);
  yield takeLatest(types.thread.CREATE_THREAD, createThread);
  yield takeLatest(types.thread.UPDATE_THREAD, updateThread);
}

export default threadSaga;
