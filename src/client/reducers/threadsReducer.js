const defaultState = {
    threads: []
};

const threadsReducer = (state = defaultState, action) => {
	let _newState = {};
    
	switch (action.type) {
		case 'THREADS_INIT':
            _newState = Object.assign({}, state, {threads: action.payload});
			break;
		default:
			_newState = state;
			break;
	}

	return _newState;
};

export default threadsReducer;