import { fork, all } from 'redux-saga/effects';
import boards from './boards';
import thread from './thread';
import threads from './threads';

export default function* rootSaga() {
  yield all([fork(boards), fork(thread), fork(threads)]);
}
