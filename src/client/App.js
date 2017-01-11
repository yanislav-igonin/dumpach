import React from 'react';
import { render } from 'react-dom';
import MainPage from './MainPage.js';

import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import './App.scss';

// ReactDOM.render(<MainPage />, document.getElementById('root'));

render(
    <Router history={browserHistory}>
        <Route path='/' component={MainPage}>
        </Route>
    </Router>,
    document.getElementById('root')
);