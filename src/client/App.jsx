import React from 'react';
import { render } from 'react-dom';

import { Router, Route, browserHistory } from 'react-router';

import MainPage from './MainPage';
import NotFoundPage from './NotFoundPage';
import Thread from './Thread/Thread';

import './App.scss';

const root = document.getElementById('root');

render(
    <Router history={browserHistory}>
        <Route path='/' component={MainPage} />
        <Route path='threads/:threadId' component={Thread} />
        <Route path='*' component={NotFoundPage} />
    </Router>,
    root,
);
