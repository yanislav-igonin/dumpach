import { combineReducers } from 'redux-immutable';
import threads from '../modules/Threads/reducers';

const rootReducer = combineReducers({
  threads,
});

export default rootReducer;
