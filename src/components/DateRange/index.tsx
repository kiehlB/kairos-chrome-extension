import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DefiniteTimeRange, TimeRange } from '../../lib/db/models/time';
import { ValidationStatus } from '../../lib/db/models/validate';
import { RootState } from '../../store';

import {
  getActivityTimeRange,
  getEffectiveSelectedTimeRange,
  getIsLoadingRecords,
  getSelectedTimeRange,
} from '../../store/activity/selectors';

import { getSearchParamsSelectedTimeRangeValidationStatus } from '../../store/router/selectors';

import { getEndOfDay, getStartOfDay, minusDays } from '../../utils/dateUtils';
import DateRangePicker from '../DatePicker';

interface ActivityDateRangePickerProps {}

export const ActivityDateRangePicker = ({}: ActivityDateRangePickerProps) => {
  const activityTimeRange = useSelector((state: RootState) =>
    getActivityTimeRange(state),
  );
  const effectiveTimeRange = useSelector((state: RootState) =>
    getEffectiveSelectedTimeRange(state),
  );
  const isLoadingRecords = useSelector((state: RootState) => getIsLoadingRecords(state));
  const selectedTimeRange = useSelector((state: RootState) =>
    getSelectedTimeRange(state),
  );
  const selectedTimeRangeValidationStatus = useSelector((state: RootState) =>
    getSearchParamsSelectedTimeRangeValidationStatus(state),
  );

  // Computed values
  const [startOfToday, endOfToday] = [getStartOfDay(), getEndOfDay()];
  const [defaultStart, defaultEnd] = activityTimeRange
    ? [getStartOfDay(activityTimeRange.start), getEndOfDay(activityTimeRange.end)]
    : [startOfToday, endOfToday];
  const disabledDays = {
    before: new Date(defaultStart),
    after: new Date(defaultEnd),
  };
  const month = new Date(effectiveTimeRange.start);
  const ranges = [
    {
      label: 'Today',
      value: { start: startOfToday, end: null },
    },
    {
      label: 'Last week',
      value: { start: minusDays(startOfToday, 6), end: null },
    },
    {
      label: 'Last 2 weeks',
      value: { start: minusDays(startOfToday, 13), end: null },
    },
    {
      label: 'Last 4 weeks',
      value: { start: minusDays(startOfToday, 27), end: null },
    },
    {
      label: 'All activity',
      value: startOfToday !== defaultStart ? { start: defaultStart, end: null } : null,
    },
  ].filter(range => range.value && range.value.start >= defaultStart) as {
    label: string;
    value: TimeRange;
  }[];

  const selectedValue = selectedTimeRangeValidationStatus.isValid
    ? {
        start: selectedTimeRange.start ? effectiveTimeRange.start : null,
        end: selectedTimeRange.end ? effectiveTimeRange.end : null,
      }
    : undefined;

  return (
    <DateRangePicker
      defaultStartTime={defaultStart}
      defaultEndTime={defaultEnd}
      disabled={isLoadingRecords}
      disabledDays={disabledDays}
      fromMonth={disabledDays.before}
      month={month}
      position="bottom-right"
      ranges={ranges}
      toMonth={disabledDays.after}
      value={selectedValue}
    />
  );
};
