import { fork } from 'redux-saga/effects';
import threads from '../modules/Threads/sagas';

export default function* rootSaga() {
  yield [fork(threads)];
}
