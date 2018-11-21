import { combineReducers } from 'redux';
import boards from './boards';
import settings from './settings';
import thread from './thread';
import threads from './threads';

const reducers = combineReducers({
  boards,
  settings,
  thread,
  threads,
});

export default reducers;
