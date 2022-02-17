import {
  createSlice,
  PayloadAction,
  createSelector,
  ThunkAction,
} from '@reduxjs/toolkit';
import { MockDatabase } from '../../lib/db/mock';
import { Activity, Domain } from '../../lib/db/models/activity';
import { DefiniteTimeRange, TimeRange } from '../../lib/db/models/time';
import { extendTimeRange, minusDays, setMidnight } from '../../utils/dateUtils';
import { getRecordsTimeRange } from './selectors';

export interface Activitytate {
  records: Activity[];
  domains: Record<string, Domain>;
  recordsTimeRange: TimeRange | null;
  totalTimeRange: DefiniteTimeRange | null;
  selectedTimeRange: TimeRange;
  isLoadingRecords: Boolean;
}
export const SET_FOURWEEK: TimeRange = {
  start: minusDays(setMidnight(), 27), // 4 weeks
  end: null,
};
export const initialState = {
  domains: {},
  records: [],
  recordsTimeRange: null,
  totalTimeRange: null,
  selectedTimeRange: SET_FOURWEEK,
  isLoadingRecords: false,
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
    setTotalTimeRange(state, action: PayloadAction<DefiniteTimeRange | null>) {
      state.totalTimeRange = action.payload;
    },
  },
});

export const { setDomains, setRecordsTimeRange, setTotalTimeRange } =
  ActivitySlice.actions;

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
    const state = getState();
    const databaseService = new MockDatabase();
    const recordsTimeRange = getRecordsTimeRange(state);

    const [allDomains, totalTimeRange] = await Promise.all([
      databaseService.fetchAllActivityDomains(),
      databaseService.fetchActivityTimeRange(),
    ]);

    dispatch(setDomains(allDomains || {}));
    dispatch(setTotalTimeRange(totalTimeRange));
  };
