import { combineReducers } from 'redux';
import threads from './threads';
import thread from './thread';
import snackbar from './snackbar';
import answerForm from '../shared/components/AnswerForm/duck';
import user from './user';
import users from './users';

const rootReducer = combineReducers({
  threads,
  thread,
  snackbar,
  answerForm,
  user,
  users,
});

export default rootReducer;
