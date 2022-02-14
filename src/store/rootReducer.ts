import { combineReducers } from '@reduxjs/toolkit';

import { reducer } from './activity/activity';
import { createHashHistory } from 'history';
import store from './store';

const rootReducer = combineReducers({
  activity: reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
