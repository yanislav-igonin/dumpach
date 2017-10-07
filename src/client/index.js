import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Routes from './router/Routes';
import store from './store';

import './index.scss';

if (module.hot) {
  module.hot.accept();
}

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
