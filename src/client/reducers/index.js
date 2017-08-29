import { combineReducers } from 'redux-immutable';
import data from '../modules/MainPage/reducers';

const rootReducer = combineReducers({
  data,
});

export default rootReducer;
