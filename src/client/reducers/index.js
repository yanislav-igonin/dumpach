import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import thread from './threadReducer';
import threads from './threadsReducer';

const combinedReducer = combineReducers({
    thread,
    threads,
    routing: routerReducer
});

export default combinedReducer;