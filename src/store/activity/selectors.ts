import { createSelector } from '@reduxjs/toolkit';
import { Domain } from '../../lib/db/models/activity';
import { RootState } from '../rootReducer';

export const getAllDomains = (state: RootState): Record<string, Domain> => {
  return state.activity.domains;
};
export const getRecordsTimeRange = (state: RootState) => {
  return state.activity.recordsTimeRange;
};
