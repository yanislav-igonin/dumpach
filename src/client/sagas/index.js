import { fork, all } from 'redux-saga/effects';
import threads from '../modules/Threads/sagas';
import thread from '../modules/Thread/sagas';

export default function* rootSaga() {
  yield all([fork(threads), fork(thread)]);
}
