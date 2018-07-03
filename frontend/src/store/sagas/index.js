import { fork, all } from 'redux-saga/effects';
import boards from './boards';
import threads from './threads';

export default function* rootSaga() {
  yield all([fork(boards), fork(threads)]);
}
