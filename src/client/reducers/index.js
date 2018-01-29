import { combineReducers } from 'redux';
import threads from '../modules/Threads/duck';
import thread from '../modules/Thread/duck';
import snackbar from '../modules/Snackbar/duck';
import answerForm from '../components/duck';
import user from '../modules/Admin/duck';
import users from '../modules/Admin/duck/users';

const rootReducer = combineReducers({
  threads,
  thread,
  snackbar,
  answerForm,
  user,
  users,
});

export default rootReducer;
