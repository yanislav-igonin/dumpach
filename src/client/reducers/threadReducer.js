const defaultState = {
	threadTitle: '',
	posts: []
};

const threadReducer = (state = defaultState, action) => {
	let _newState = {};
    
	switch (action.type) {
		case 'THREAD_INIT':
			_newState = Object.assign({}, state, {
				threadTitle: action.payload.threadTitle,
				posts: action.payload.posts
			});
			break;
		case 'THREAD_UPDATE':
			_newState = Object.assign({}, state, {posts: action.payload});
			break;
		default:
			_newState = state;
			break;
	}

	return _newState;
};

export default threadReducer;