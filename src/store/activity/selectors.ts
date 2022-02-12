import { RootState } from '../rootReducer';

export const getRecordsTimeRange = (state: RootState) => {
  return state.activity.recordsTimeRange;
};
