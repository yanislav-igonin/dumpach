import { combineReducers } from 'redux-immutable';
import threads from '../modules/Threads/reducers';
import thread from '../modules/Thread/reducers';
import snackbar from '../modules/Snackbar/reducers';

const rootReducer = combineReducers({
  threads,
  thread,
  snackbar,
});

export default rootReducer;
