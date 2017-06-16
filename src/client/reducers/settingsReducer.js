const defaultState = {
	drawerOpened: false,
	filesView: {
		opened: false,
		file: ''
	},
    snackbar: {
        opened: false,
        message: ''
    }
};

const settingsReducer = (state = defaultState, action) => {
	let _newState = {};
    
	switch (action.type) {
		case 'DRAWER_UPDATE':
			_newState = Object.assign({}, state, {drawerOpened: !state.drawerOpened});
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