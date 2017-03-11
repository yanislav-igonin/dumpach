import React from 'react';
import { render } from 'react-dom';

import { Router, Route, browserHistory } from 'react-router';

import MainPage from './MainPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import Thread from './Thread/Thread.jsx';

import './App.scss';

// render(<MainPage />, document.getElementById('root'));

render(
    <Router history={browserHistory}>
        <Route path='/' component={MainPage} />
        <Route path='threads/:threadId' component={Thread} />
        <Route path='404' component={NotFoundPage} />
        <Route path='*' component={NotFoundPage} />
    </Router>,
    document.getElementById('root')
);
