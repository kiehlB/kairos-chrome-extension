import { Action, MiddlewareArray } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

import { reducer } from './activity/activity';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  StoreEnhancer,
} from 'redux';
import { createHashHistory } from 'history';
import thunk from 'redux-thunk';

import { connectRouter, routerMiddleware } from 'connected-react-router';
import { InitDatabaseService } from '../lib/db';

export const history = createHashHistory();
const databaseService = InitDatabaseService();

const middleware = [
  thunk.withExtraArgument({ databaseService }),
  routerMiddleware(history),
];
const storeEnhancers = [applyMiddleware(...middleware)];

export const composedEnhancer = compose(...storeEnhancers) as StoreEnhancer;

export const store = createStore(
  combineReducers({
    activity: reducer,
    router: connectRouter(history),
  }),
  {},
  composedEnhancer
);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
