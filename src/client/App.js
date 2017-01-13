import React from 'react';
import { render } from 'react-dom';

import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import MainPage from './MainPage.js';
import Thread from './Thread/Thread';

import './App.scss';

// render(<MainPage />, document.getElementById('root'));

render(
    <Router history={browserHistory}>
        <Route path='/' component={MainPage} />
        <Route path='threads/:threadId' component={Thread} />
    </Router>,
    document.getElementById('root')
);