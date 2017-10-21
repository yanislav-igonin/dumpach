import { Map } from 'immutable';

//TYPES
export const LOGIN = 'LOGIN_THREADS';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'LOGIN_FAILED';

//ACTION CREATORS
export const login = ({ login, password }) => ({
  type: LOGIN,
  login,
  password,
});

//REDUCER
const user = (state = Map(), action) => {
  switch (action.type) {
    case LOGIN_SUCCEEDED:
      return Map(action.user);

    default:
      return state;
  }
};

export default user;
