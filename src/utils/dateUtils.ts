import { DateTime, Duration, DurationObject } from 'luxon';
import * as d3 from 'd3';

export function getStartOfDay(timestamp: number = Date.now()): number {
  return new Date(timestamp).setHours(0, 0, 0, 0);
}

export function minusDays(timestamp: number, days: number): number {
  return DateTime.fromMillis(timestamp).minus({ days }).valueOf();
}

export function formatDateString(timestamp: number) {
  return d3.timeFormat('%Y-%m-%d')(new Date(timestamp));
}

export function getDayCount(startTime: number, endTime: number): number {
  return d3.timeDay.count(new Date(startTime), new Date(endTime)) + 1;
}

export function getDayOfWeek(timestamp: number): number {
  return new Date(timestamp).getDay();
}

export function getEndOfDay(timestamp: number = Date.now()): number {
  return new Date(timestamp).setHours(23, 59, 59, 999);
}
