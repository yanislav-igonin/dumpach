const defaultState = {
	drawerOpened: false,
    snackbar: {
        opened: false,
        message: ''
    }
};

const settingsReducer = (state = defaultState, action) => {
	let _newState = {};
    
	switch (action.type) {
		case 'DRAWER_UPDATE':
			_newState = Object.assign({}, state, {drawerOpened: !state.drawerOpenned});
			break;
		case 'SNACKBAR_UPDATE':
			_newState = Object.assign({}, state, {snackbar: {opened: !state.snackbar.opened, message: action.payload}});
			break;
		default:
			_newState = state;
			break;
	}

	return _newState;
};

export default settingsReducer;