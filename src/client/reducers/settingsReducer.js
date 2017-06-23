const defaultState = {
	errorMessage: {
        opened: false,
        message: ''
    }
};

const settingsReducer = (state = defaultState, action) => {
	let _newState = {};
    
	switch (action.type) {
		case 'ERROR_MESSAGE_OPEN':
			_newState = Object.assign({}, state, {
                errorMessage : {
                    opened: true,
                    message: action.payload
                }
            });
			break;
		case 'ERROR_MESSAGE_CLOSE':
			_newState = Object.assign({}, state, {
                errorMessage : {
                    opened: false,
                    message: ''
                }
            });
			break;

		default:
			_newState = state;
			break;
	}

	return _newState;
};

export default settingsReducer;
