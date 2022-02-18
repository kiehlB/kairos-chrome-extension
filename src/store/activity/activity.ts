import {
  createSlice,
  PayloadAction,
  createSelector,
  ThunkAction,
} from '@reduxjs/toolkit';
import { ANALYTICS_REQUIRED_TIME_WINDOW } from '../../lib/constants/analytics';
import { MockDatabase } from '../../lib/db/mock';
import { Activity, Domain } from '../../lib/db/models/activity';
import { DefiniteTimeRange, TimeRange } from '../../lib/db/models/time';
import {
  extendTimeRange,
  isWithinTimeRange,
  minusDays,
  setMidnight,
} from '../../utils/dateUtils';
import {
  getEffectiveSearchParamsSelectedTimeRange,
  getIsInitialized,
  getRecordsTimeRange,
} from './selectors';
import { batch } from 'react-redux';

export interface ActivityState {
  records: Activity[];
  domains: Record<string, Domain>;
  recordsTimeRange: TimeRange | null;
  totalTimeRange: DefiniteTimeRange | null;
  selectedTimeRange: TimeRange;
  isLoadingRecords: boolean;
  loadingRecordsSuccess: boolean | null;
  isInitialized: boolean;
  loadingRecordsError: Error | null;
  isDeletingRecords: boolean;
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
  loadingRecordsSuccess: null,
  isInitialized: false,
  loadingRecordsError: null,
  deletingRecordsError: null,
  deletingRecordsSuccess: null,
  isDeletingRecords: false,
};

const ActivitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    deleteRecordsSuccess(state, action: PayloadAction<number[]>) {
      state.records = state.records.filter(
        (record) => !action.payload.includes(record.id as number)
      );
      state.isDeletingRecords = false;
      state.deletingRecordsError = null;
      state.deletingRecordsSuccess = true;
    },

    getRecordsStart(state: ActivityState) {
      state.isLoadingRecords = true;
      state.loadingRecordsSuccess = null;
    },
    getRecordsSuccess(state, action: PayloadAction<Activity[]>) {
      state.records = action.payload;
      state.isInitialized = true;
      state.isLoadingRecords = false;
      state.loadingRecordsError = null;
      state.loadingRecordsSuccess = true;
    },
    getRecordsFailure(state: ActivityState, action: PayloadAction<Error>) {
      state.isInitialized = true;
      state.isLoadingRecords = false;
      state.loadingRecordsError = action.payload;
      state.loadingRecordsSuccess = false;
    },
    setDomains(state, action: PayloadAction<Record<string, Domain>>) {
      state.domains = action.payload;
    },
    setRecordsTimeRange(state, action: PayloadAction<TimeRange | null>) {
      state.recordsTimeRange = action.payload;
    },
    setSelectedTimeRange(state, action: PayloadAction<TimeRange>) {
      state.selectedTimeRange = action.payload;
    },
    setTotalTimeRange(state, action: PayloadAction<DefiniteTimeRange | null>) {
      state.totalTimeRange = action.payload;
    },
  },
});

export const {
  setDomains,
  setRecordsTimeRange,
  setTotalTimeRange,
  setSelectedTimeRange,
  getRecordsStart,
  getRecordsSuccess,
  getRecordsFailure,
} = ActivitySlice.actions;

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
  async (dispatch, getState, { databaseService }) => {
    const state = getState();
    const recordsTimeRange = getRecordsTimeRange(state);
    const selectedTimeRange = getEffectiveSearchParamsSelectedTimeRange(state);

    // Ensure we fetched enough data that's required to compute analytics
    const requiredTimeRange = extendTimeRange(selectedTimeRange, {
      months: ANALYTICS_REQUIRED_TIME_WINDOW,
    });

    // Don't fetch data from DB if we already have them in the store
    if (
      !options.forceReload &&
      recordsTimeRange &&
      isWithinTimeRange(recordsTimeRange, requiredTimeRange)
    ) {
      dispatch(setSelectedTimeRange(selectedTimeRange));
      return;
    }

    dispatch(getRecordsStart());
    try {
      if (databaseService === undefined) {
        throw Error('Unable to connect to database');
      }

      // Only fetch all domains & activity time range on initialization
      if (options.forceReload || !getIsInitialized(state)) {
        const [allDomains, totalTimeRange, records] = await Promise.all([
          databaseService.fetchAllActivityDomains(),
          databaseService.fetchActivityTimeRange(),
          databaseService.fetchActivityRecords(requiredTimeRange),
        ]);

        if (onSuccess) {
          onSuccess();
        }

        // Batch actions to ensure smooth UI transition on store updates
        batch(() => [
          dispatch(getRecordsSuccess(records || [])),
          dispatch(setRecordsTimeRange(requiredTimeRange)),
          dispatch(setSelectedTimeRange(selectedTimeRange)),
          dispatch(setDomains(allDomains || {})),
          dispatch(setTotalTimeRange(totalTimeRange)),
        ]);
      } else {
        const records = await databaseService.fetchActivityRecords(
          requiredTimeRange
        );

        if (onSuccess) {
          onSuccess();
        }

        // Batch actions to ensure smooth UI transition on store updates
        batch(() => [
          dispatch(getRecordsSuccess(records || [])),
          dispatch(setRecordsTimeRange(requiredTimeRange)),
          dispatch(setSelectedTimeRange(selectedTimeRange)),
        ]);
      }
    } catch (error) {
      if (onError) {
        onError(error);
      }
      dispatch(getRecordsFailure(error));
    }
  };