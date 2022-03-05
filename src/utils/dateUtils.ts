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

export function getHourOfWeek(timestamp: number): {
  hour: number;
  day: number;
} {
  const time = new Date(timestamp);
  return {
    hour: time.getHours(),
    day: time.getDay(),
  };
}

export function getDayCount(startTime: number, endTime: number): number {
  return d3.timeDay.count(new Date(startTime), new Date(endTime)) + 1;
}

export function getDayOfWeekCount(
  dayOfWeek: number,
  startTime: number,
  endTime: number
): number {
  const startTimeDayOfWeek = new Date(startTime).getDay();
  const dayOfWeekOffset = (dayOfWeek - startTimeDayOfWeek + 7) % 7;
  const dayRange = getDayCount(startTime, endTime) - 1;

  if (dayRange <= dayOfWeekOffset) {
    return 0;
  }
  return Math.max(1, Math.ceil((dayRange - dayOfWeekOffset) / 7));
}

export function getDayOfWeek(timestamp: number): number {
  return new Date(timestamp).getDay();
}

export function addDays(timestamp: number, days: number): number {
  return DateTime.fromMillis(timestamp).plus({ days }).valueOf();
}

export function formatDateDistance(startDate: number, endDate: number): string {
  let result = '';
  const distanceInNearestMins = Math.floor((endDate - startDate) / 1000 / 60);
  if (distanceInNearestMins > 0 && distanceInNearestMins < 60) {
    return 'Less than a minute';
  }

  const days = Math.floor(distanceInNearestMins / 60 / 24);
  const hours = Math.floor(distanceInNearestMins / 60) % 24;
  const minutes = distanceInNearestMins % 60;

  if (days > 0) {
    result += `${days} ${days > 1 ? 'days' : 'day'}`;
    if (hours > 0 || minutes > 0) {
      result += ', ';
    }
  }
  if (hours > 0) {
    result += `${hours} ${hours > 1 ? 'hours' : 'hour'}`;
    if (minutes > 0) {
      result += ' ';
    }
  }
  if (minutes > 0) {
    result += `${minutes} ${minutes > 1 ? 'minutes' : 'minute'}`;
  }

  return result;
}

export function formatBytes(bytes: number, fractionDigits = 2) {
  switch (true) {
    case bytes < 1024:
      return bytes + ' Bytes';
    case bytes < 1048576:
      return (bytes / 1024).toFixed(fractionDigits) + ' KB';
    case bytes < 1073741824:
      return (bytes / 1048576).toFixed(fractionDigits) + ' MB';
    default:
      return (bytes / 1073741824).toFixed(fractionDigits) + ' GB';
  }
}
