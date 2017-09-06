import { Map } from 'immutable';
import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from '../actions';

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
