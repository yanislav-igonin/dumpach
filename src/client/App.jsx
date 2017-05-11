import React from 'react'
import { render } from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {createLogger} from 'redux-logger';

import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import combinedReducer from './reducers';

import MainPage from './components/MainPage/MainPage';
import Thread from './components/Thread/Thread';

import './App.scss';

const root = document.getElementById('root');
let store = createStore(combinedReducer, applyMiddleware(createLogger()));
const history = syncHistoryWithStore(browserHistory, store);

const muiTheme = getMuiTheme({
    flatButton: {
        buttonFilterColor: 'rgba(0, 0, 0, .2)',
        textColor: '#FFF',
    }
});

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={MainPage} />
            <Route path="/threads/:threadId" component={Thread} />
        </Router>
    </Provider>
    
  </MuiThemeProvider>,
    root,
);//Master build
