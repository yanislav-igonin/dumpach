import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import combinedReducer from './reducers';

import MainPage from './components/MainPage/MainPage';
import Thread from './components/MainPage/Thread/Thread';

import './App.scss';

let store;
if(process.env.NODE_ENV !== 'production'){
    store = createStore(combinedReducer, applyMiddleware(createLogger()));
} else {
    store = createStore(combinedReducer);
}
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={MainPage} />
            <Route path="/threads/:threadId" component={Thread} />
        </Router>
    </Provider>,
    document.getElementById('root')
);
            // <Route path="/threads/:threadId" component={Thread} />
            // <Route path="*" component={NotFound} />