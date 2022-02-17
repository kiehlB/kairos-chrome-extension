import { Action } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import _ from 'lodash';
import { ThunkAction } from 'redux-thunk';
import { TimeRange } from '../../lib/db/models/time';
import { formatDateString } from '../../utils/dateUtils';
import { computeSearchParams } from '../../utils/urlUtils';
import { RootState } from '../store';

import {
  DEFAULT_TIME_RANGE,
  SEARCH_PARAM_DOMAIN,
  SEARCH_PARAM_END_DATE,
  SEARCH_PARAM_START_DATE,
} from './constants';
import {
  getSearchParams,
  getSearchParamsSelectedDomain,
  getSearchParamsSelectedTimeRange,
} from './selectors';

export const setSelectedDomain =
  (domain: string | null): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const state = getState();
    const selectedDomain = getSearchParamsSelectedDomain(state);
    if (selectedDomain === domain) {
      return;
    }

    const searchParams = getSearchParams(state);
    const newSearchParams = computeSearchParams(searchParams, {
      [SEARCH_PARAM_DOMAIN]: domain,
    });
    dispatch(push(`?${newSearchParams.toString()}`));
  };

export const setSelectedTimeRange =
  (
    timeRange: TimeRange | null
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const state = getState();
    const selectedTimeRange = getSearchParamsSelectedTimeRange(state);
    if (
      _.isEqual(timeRange, selectedTimeRange) ||
      (timeRange === null && _.isEqual(selectedTimeRange, DEFAULT_TIME_RANGE))
    ) {
      return;
    }

    const searchParams = getSearchParams(state);
    const newSearchParams = computeSearchParams(searchParams, {
      [SEARCH_PARAM_START_DATE]:
        timeRange && timeRange.start ? formatDateString(timeRange.start) : null,
      [SEARCH_PARAM_END_DATE]:
        timeRange && timeRange.end ? formatDateString(timeRange.end) : null,
    });
    dispatch(push(`?${newSearchParams.toString()}`));
  };

export const actions = {
  setSelectedDomain,
  setSelectedTimeRange,
};
