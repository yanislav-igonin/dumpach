//TYPES
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCEEDED = 'LOGOUT_SUCCEEDED';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

//ACTION CREATORS
export const login = ({ login, password }) => ({
  type: LOGIN,
  login,
  password,
});

export const logout = () => ({
  type: LOGOUT,
});

//REDUCER
const user = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_SUCCEEDED:
      return action.user;

    case LOGOUT_SUCCEEDED:
      return {};

    default:
      return state;
  }
};

export default user;
