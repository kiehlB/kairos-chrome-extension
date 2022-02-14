import {
  createSlice,
  PayloadAction,
  createSelector,
  ThunkAction,
} from '@reduxjs/toolkit';
import { MockDatabase } from '../../lib/db/mock';
import { Activity, Domain } from '../../lib/db/models/activity';
import { TimeRange } from '../../lib/db/models/time';

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

export const { setDomains, setRecordsTimeRange } = ActivitySlice.actions;

export const actions = {
  ...ActivitySlice.actions,
};

export const reducer = ActivitySlice.reducer;

export const loadRecords =
  (
    onSuccess?: () => void,
    onError?: (error: Error) => void,
    options: { forceReload: boolean } = { forceReload: false }
  ) =>
  async (dispatch, getState) => {
    const databaseService = new MockDatabase();

    console.log('hello from store');

    const state = getState();

    const [allDomains, totalTimeRange] = await Promise.all([
      databaseService.fetchAllActivityDomains(),
      databaseService.fetchActivityTimeRange(),
    ]);
  };
