import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';

import store from './store';

import './index.css';
import MainPage from './containers/MainPage';

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
    primary: deepOrange,
  },
});

/* eslint-disable */
render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <MainPage />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
