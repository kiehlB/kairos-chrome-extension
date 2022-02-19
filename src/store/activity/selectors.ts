import { createSelector } from '@reduxjs/toolkit';
import { Activity, Domain } from '../../lib/db/models/activity';
import { DefiniteTimeRange, TimeRange } from '../../lib/db/models/time';
import { getDayCount, getEndOfDay, setMidnight } from '../../utils/dateUtils';
import { selectors as routerSelectors } from '../router';
import _ from 'lodash';
import { RootState } from '../store';
import {
  computeTotalDuration,
  computeTotalDurationByDate,
} from '../../utils/activityUtils';
import { MS_PER_DAY } from '../../lib/constants/time';

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

export const getAllRecords = (state: RootState): Activity[] => {
  return state.activity.records;
};

export const getIsLoadingRecords = (state: RootState) =>
  state.activity.isLoadingRecords;

export const getAllSelectedDomainRecords = createSelector(
  [getAllRecords, routerSelectors.getSearchParamsSelectedDomain],
  (records, selectedDomain) => {
    return records.filter((record) => selectedDomain === record.domain);
  }
);

export const getSelectedDomainRecords = createSelector(
  [getAllSelectedDomainRecords, getSelectedTimeRange],
  (allSelectedDomainRecords, selectedTimeRange) => {
    const { start: startTime, end: endTime } = selectedTimeRange;
    console.log(selectedTimeRange);
    return allSelectedDomainRecords.filter(
      (record) =>
        (startTime === null || record.endTime >= startTime) &&
        (endTime === null || record.startTime <= endTime)
    );
  }
);

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

export const getSelectedDomainTotalDuration = createSelector(
  [getSelectedDomainRecords, getEffectiveSelectedTimeRange],
  (selectedDomainRecords, effectiveTimeRange) => {
    return computeTotalDuration(selectedDomainRecords, effectiveTimeRange);
  }
);

export const getRecords = createSelector(
  [getAllRecords, getSelectedTimeRange],
  (records, selectedTimeRange) => {
    const { start: startTime, end: endTime } = selectedTimeRange;
    return records.filter(
      (record) =>
        (startTime === null || record.endTime >= startTime) &&
        (endTime === null || record.startTime <= endTime)
    );
  }
);

export const getSelectedDomainRatioToTotalDuration = createSelector(
  [getRecords, getSelectedDomainRecords, getEffectiveSelectedTimeRange],
  (records, selectedDomainRecords, effectiveTimeRange) => {
    console.log(selectedDomainRecords);

    return (
      computeTotalDuration(selectedDomainRecords, effectiveTimeRange) /
      Math.max(computeTotalDuration(records, effectiveTimeRange), 1)
    );
  }
);

export const getRatioToTotalDuration = createSelector(
  [getRecords, getEffectiveSelectedTimeRange],
  (records, effectiveTimeRange) => {
    const dayCount = getDayCount(
      effectiveTimeRange.start,
      effectiveTimeRange.end
    );

    return (
      computeTotalDuration(records, effectiveTimeRange) /
      Math.max(dayCount * MS_PER_DAY, 1)
    );
  }
);

export const getSelectedDomainTotalDurationByDate = createSelector(
  [getSelectedDomainRecords, getEffectiveSelectedTimeRange],
  (selectedDomainRecords, effectiveTimeRange) => {
    return computeTotalDurationByDate(
      selectedDomainRecords,
      effectiveTimeRange
    );
  }
);
export const getTotalDurationByDate = createSelector(
  [getRecords, getEffectiveSelectedTimeRange],
  (records, effectiveTimeRange) => {
    return computeTotalDurationByDate(records, effectiveTimeRange);
  }
);
