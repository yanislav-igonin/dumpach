import React from 'react'
import { render } from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {createLogger} from 'redux-logger';

import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import combinedReducer from './reducers';

import MainPage from './components/MainPage/MainPage';

import './App.scss';

const root = document.getElementById('root');
let store = createStore(combinedReducer, applyMiddleware(createLogger()));
const history = syncHistoryWithStore(browserHistory, store);

render(
  <MuiThemeProvider>
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={MainPage}>
            </Route>
        </Router>
    </Provider>
    
  </MuiThemeProvider>,
    root,
);
