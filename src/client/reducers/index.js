import { combineReducers } from 'redux-immutable';
import threads from '../modules/Threads/reducers';
import thread from '../modules/Thread/reducers';

const rootReducer = combineReducers({
  threads,
  thread,
});

export default rootReducer;
