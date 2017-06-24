const defaultState = {
	title: '',
	posts: []
};

const threadReducer = (state = defaultState, action) => {
	let _newState = {};
    
	switch (action.type) {
		case 'THREAD_INIT':
			_newState = Object.assign({}, state, {
				title: action.payload.title,
				time: action.payload.time,
				posts: action.payload.posts,
				_id: action.payload._id,
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