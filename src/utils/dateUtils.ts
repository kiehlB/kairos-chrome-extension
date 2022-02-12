import { DateTime, Duration, DurationObject } from 'luxon';

export function getStartOfDay(timestamp: number = Date.now()): number {
  return new Date(timestamp).setHours(0, 0, 0, 0);
}

export function minusDays(timestamp: number, days: number): number {
  return DateTime.fromMillis(timestamp).minus({ days }).valueOf();
}
