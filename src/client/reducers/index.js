import { combineReducers } from 'redux-immutable';
import data from './data';

const combinedReducer = combineReducers({
  data,
});

export default combinedReducer;
