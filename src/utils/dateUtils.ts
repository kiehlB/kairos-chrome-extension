import { DateTime, Duration, DurationObject } from 'luxon';
import { TimeRange } from '../lib/db/models/time';
import * as d3 from 'd3';

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

export function isValidDateString(s: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    return false;
  }

  const date = new Date(s);
  if (Number.isNaN(date.valueOf())) {
    return false;
  }

  const [, , day] = s.split('-');
  if (date.getUTCDate() !== Number.parseInt(day)) {
    return false;
  }

  return true;
}

export function getTimestampFromDateString(dateString: string) {
  const date = new Date(dateString);
  const offsetInMs = date.getTimezoneOffset() * 60 * 1000;

  return date.getTime() + offsetInMs;
}

export function formatDateString(timestamp: number) {
  return d3.timeFormat('%Y-%m-%d')(new Date(timestamp));
}


export function isWithinTimeRange(a: TimeRange, b: TimeRange) {
  if (a.start !== null && (b.start === null || a.start > b.start)) {
    return false;
  }
  if (a.end !== null && (b.end === null || a.end < b.end)) {
    return false;
  }

  return true;
}
