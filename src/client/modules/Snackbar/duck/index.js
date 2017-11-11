//TYPES
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

//REDUCER
const snackbar = (state = { opened: false, message: '' }, action) => {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return { opened: true, message: action.message };

    case CLOSE_SNACKBAR:
      return { opened: false, message: state.message };

    default:
      return state;
  }
};

export default snackbar;
