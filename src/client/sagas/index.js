import { fork } from 'redux-saga/effects';
import data from '../modules/MainPage/sagas';

export default function* rootSaga() {
  yield [fork(data)];
}
