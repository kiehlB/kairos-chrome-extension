import { createSelector } from '@reduxjs/toolkit';
import { Domain } from '../../lib/db/models/activity';
import { DefiniteTimeRange, TimeRange } from '../../lib/db/models/time';
import { getEndOfDay, setMidnight } from '../../utils/dateUtils';
import { selectors as routerSelectors } from '../router';
import _ from 'lodash';
import { RootState } from '../store';

export const getAllDomains = (state: RootState): Record<string, Domain> => {
  return state.activity.domains;
};
export const getIsInitialized = (state: RootState) =>
  state.activity.isInitialized;

export const getRecordsTimeRange = (state: RootState) => {
  return state.activity.recordsTimeRange;
};
export const getActivityTimeRange = (state: RootState) =>
  state.activity.totalTimeRange;

export const getSelectedTimeRange = (state: RootState) =>
  state.activity.selectedTimeRange;

export const getIsLoadingRecords = (state: RootState) =>
  state.activity.isLoadingRecords;

export const getEffectiveSelectedTimeRange = createSelector(
  [getActivityTimeRange, getSelectedTimeRange],
  (activityTimeRange, selectedTimeRange): DefiniteTimeRange => {
    if (activityTimeRange === null) {
      return { start: setMidnight(), end: getEndOfDay() };
    }

    const selectedStartTime = _.get(selectedTimeRange, 'start');
    const selectedEndTime = _.get(selectedTimeRange, 'end');
    const { start, end } = activityTimeRange;
    return {
      start: setMidnight(
        selectedStartTime ? _.clamp(selectedStartTime, start, end) : start
      ),
      end: getEndOfDay(
        selectedEndTime ? _.clamp(selectedEndTime, start, end) : end
      ),
    };
  }
);

export const getEffectiveSearchParamsSelectedTimeRange = createSelector(
  [getActivityTimeRange, routerSelectors.getSearchParamsSelectedTimeRange],
  (activityTimeRange, searchParamsSelectedTimeRange): TimeRange => {
    const { start, end } = searchParamsSelectedTimeRange;
    const startOfToday = setMidnight();

    return {
      start:
        start !== null && activityTimeRange
          ? _.clamp(start, activityTimeRange.start, startOfToday)
          : start,
      end: end === startOfToday ? null : end,
    };
  }
);
