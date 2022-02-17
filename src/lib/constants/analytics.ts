import { milliseconds } from '../../utils/dateUtils';

export const DURATION_BUCKET_SIZE = milliseconds({ second: 60 });
export const DURATION_BUCKET_MAX = milliseconds({ minute: 60 });
export const MAX_BUCKET_COUNT = DURATION_BUCKET_MAX / DURATION_BUCKET_SIZE + 1;

export const HISTORICAL_USAGE_TIME_WINDOW = 6;

export const ANALYTICS_REQUIRED_TIME_WINDOW = Math.max(
  HISTORICAL_USAGE_TIME_WINDOW
);
