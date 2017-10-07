import { Map } from 'immutable';

//TYPES
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

//REDUCER
const snackbar = (state = Map({ opened: false, message: '' }), action) => {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return Map({ opened: true, message: action.message });

    case CLOSE_SNACKBAR:
      return Map({ opened: false, message: '' });

    default:
      return state;
  }
};

export default snackbar;
