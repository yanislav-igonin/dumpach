//TYPES
export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCEEDED = 'GET_USERS_SUCCEEDED';
export const GET_USERS_FAILED = 'GET_USERS_FAILED';

//ACTION CREATORS
export const getUsers = () => ({
  type: GET_USERS,
});

//REDUCER
const users = (state = [], action) => {
  switch (action.type) {
    case GET_USERS_SUCCEEDED:
      return action.users;

    default:
      return state;
  }
};

export default users;
