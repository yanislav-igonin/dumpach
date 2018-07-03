import { combineReducers } from 'redux';
import boards from './boards';
import threads from './threads';

const reducers = combineReducers({
  boards,
  threads,
});

export default reducers;
