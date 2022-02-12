import { combineReducers } from '@reduxjs/toolkit';
import Activity_Reducer from './activity/activity';
import store from './store';

const rootReducer = combineReducers({
  activity: Activity_Reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
