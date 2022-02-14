import { DateTime, Duration, DurationObject } from 'luxon';
import { TimeRange } from '../lib/db/models/time';

export function setMidnight(timestamp: number = Date.now()): number {
  return new Date(timestamp).setHours(0, 0, 0, 0);
}

export function minusDays(timestamp: number, days: number): number {
  return DateTime.fromMillis(timestamp).minus({ days }).valueOf();
}

export function getEndOfDay(timestamp: number = Date.now()): number {
  return new Date(timestamp).setHours(23, 59, 59, 999);
}

export function milliseconds(duration: DurationObject) {
  return Duration.fromObject(duration).as('milliseconds');
}

export function extendTimeRange(
  timeRange: TimeRange,
  durationObject: DurationObject
) {
  const durationInMs = milliseconds(durationObject);
  const end = timeRange.end || getEndOfDay();

  if (
    timeRange.start !== null &&
    durationInMs !== 0 &&
    end - timeRange.start < durationInMs
  ) {
    return {
      start: timeRange.start === null ? null : setMidnight(end - durationInMs),
      end: timeRange.end === null ? null : end,
    };
  }

  return timeRange;
}
