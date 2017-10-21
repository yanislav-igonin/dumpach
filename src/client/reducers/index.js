import { combineReducers } from 'redux-immutable';
import threads from '../modules/Threads/duck';
import thread from '../modules/Thread/duck';
import snackbar from '../modules/Snackbar/duck';
import user from '../modules/Admin/duck';

const rootReducer = combineReducers({
  threads,
  thread,
  snackbar,
  user,
});

export default rootReducer;
