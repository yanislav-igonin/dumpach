import { combineReducers } from 'redux';
import boards from './boards';
import thread from './thread';
import threads from './threads';

const reducers = combineReducers({
  boards,
  thread,
  threads,
});

export default reducers;
