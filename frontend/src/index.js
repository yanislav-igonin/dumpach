import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import './index.css';
import MainPage from './containers/MainPage';
// import registerServiceWorker from './registerServiceWorker';

render(
  <Provider store={store}>
    <MainPage />
  </Provider>,
  document.getElementById('root'),
);
// registerServiceWorker();
