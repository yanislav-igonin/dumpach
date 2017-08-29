import 'babel-polyfill';
import { createStore, applyMiddleware } from 'redux';
import { Map, Iterable } from 'immutable';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const initialState = Map();

if (process.env.NODE_ENV === `development`) {
  const logger = createLogger({
    stateTransformer: (state) => {
      if (Iterable.isIterable(state)) return state.toJS();
      return state;
    },
  });
  middlewares.push(logger);
}

const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;
