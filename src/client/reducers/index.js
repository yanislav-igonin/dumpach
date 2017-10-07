import { combineReducers } from 'redux-immutable';
import threads from '../modules/Threads/duck';
import thread from '../modules/Thread/duck';
import snackbar from '../modules/Snackbar/duck';

const rootReducer = combineReducers({
  threads,
  thread,
  snackbar,
});

export default rootReducer;
