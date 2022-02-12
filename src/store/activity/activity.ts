import {
  createSlice,
  PayloadAction,
  createSelector,
  ThunkAction,
} from '@reduxjs/toolkit';
import { Activity, Domain } from '../../lib/db/models/activity';
import { TimeRange } from '../../lib/db/models/time';
import { AppThunk, AppDispatch } from '../store';

export interface Activitytate {
  records: Activity[];
  domains: Record<string, Domain>;
  recordsTimeRange: TimeRange | null;
}

export const initialState = {
  domains: {},
  records: [],
  recordsTimeRange: null,
};

const ActivitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    setDomains(state, action: PayloadAction<Record<string, Domain>>) {
      state.domains = action.payload;
    },
    setRecordsTimeRange(state, action: PayloadAction<TimeRange | null>) {
      state.recordsTimeRange = action.payload;
    },
  },
});

export const {} = ActivitySlice.actions;

export default ActivitySlice.reducer;
