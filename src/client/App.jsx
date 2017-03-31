import React from 'react';
import { render } from 'react-dom';

import { Router, Route, browserHistory } from 'react-router';

import MainPage from './components/MainPage/MainPage';

import './App.scss';

const root = document.getElementById('root');

render(
    <Router history={browserHistory}>
        <Route path="/" component={MainPage} />
    </Router>,
    root,
);
