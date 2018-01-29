import { fork, all } from 'redux-saga/effects';
import threads from './threads';
import thread from './thread';
import user from './user';
import users from './users';

export default function* rootSaga() {
  yield all([fork(threads), fork(thread), fork(user), fork(users)]);
}
