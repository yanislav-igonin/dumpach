import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import settings from './settingsReducer';
import thread from './threadReducer';
import threads from './threadsReducer';

const combinedReducer = combineReducers({
    settings,
    thread,
    threads,
    routing: routerReducer
});

export default combinedReducer;