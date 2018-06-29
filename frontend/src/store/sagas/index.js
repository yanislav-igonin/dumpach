import { fork, all } from 'redux-saga/effects';
import boards from './boards';

export default function* rootSaga() {
  yield all([fork(boards)]);
}
