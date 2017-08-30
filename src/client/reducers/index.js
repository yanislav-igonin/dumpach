import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
import threads from '../modules/Threads/reducers';
import thread from '../modules/Thread/reducers';

const rootReducer = combineReducers({
  threads,
  thread,
  form,
});

export default rootReducer;
