import { Action, MiddlewareArray, configureStore } from '@reduxjs/toolkit';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { reducer } from './activity/activity';
import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
  AnyAction,
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
import { useDispatch } from 'react-redux';

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

export const composedEnhancer = composeWithDevTools(...storeEnhancers) as StoreEnhancer;

export const rootReducer = combineReducers({
  activity: reducer,
  dataMigration: dataMigrationReducer,
  router: connectRouter(history),
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleware,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>();

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
