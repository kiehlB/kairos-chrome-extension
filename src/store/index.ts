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
import { persistReducer } from 'redux-persist';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import storage from 'redux-persist/lib/storage';
import {
  actions as dataMigrationActions,
  reducer as dataMigrationReducer,
  selectors as dataMigrationSelectors,
} from './dataMigration';

import composeWithDevTools from './reduxDevTools';
import { InitDatabaseService } from '../lib/db';

export const history = createHashHistory();
const databaseService = InitDatabaseService();

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const middleware = [
  thunk.withExtraArgument({ databaseService }),
  routerMiddleware(history),
];
const storeEnhancers = [applyMiddleware(...middleware)];

export const composedEnhancer = composeWithDevTools(
  ...storeEnhancers
) as StoreEnhancer;

export const rootReducer = combineReducers({
  activity: reducer,
  dataMigration: dataMigrationReducer,
  router: connectRouter(history),
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, {}, composedEnhancer);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
