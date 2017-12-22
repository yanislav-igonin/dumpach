import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import Routes from './router/Routes';
import store from './store';

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
