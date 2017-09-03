import { fork } from 'redux-saga/effects';
import threads from '../modules/Threads/sagas';
import thread from '../modules/Thread/sagas';

export default function* rootSaga() {
  yield [fork(threads), fork(thread)];
}
