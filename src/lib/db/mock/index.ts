import Dexie from 'dexie';
import { minusDays, setMidnight } from '../../../utils/dateUtils';
import { Activity, Domain, RawActivity } from '../models/activity';
import { DefiniteTimeRange, TimeRange } from '../models/time';

import {
  ActivityTableRecord,
  DatabaseRecords,
  DatabaseService,
  DomainTableRecord,
  TitleTableRecord,
} from '../types';

import DATA from './data.json';
import { createUrl, exportTableRecords, generateRecords } from './utils';

type Range = [number, number];
const ACTIVITY_DURATION_RANGE_SHORT: Range = [100, 120000]; // 100ms ~ 2min
const ACTIVITY_DURATION_RANGE_MEDIUM: Range = [120000, 300000]; // 2 ~ 5min
const ACTIVITY_DURATION_RANGE_LONG: Range = [300000, 900000]; // 5 ~ 15min
const IDLE_DURATION_RANGE: Range = [60000, 1800000]; // 1 ~ 30min
const ACTIVITY_DURATION_PER_DAY_RANGE: Range = [1800000, 36000000]; // 0.5 ~ 10h
const ACTIVITY_TIME_RANGE: Range = [32400000, 75600000]; // 9am ~ 9pm
const DAYS_TO_GENERATE = 60; // 2 months

const generateId: () => number = (function () {
  const idGenerator = (function* getActivityIdGenerator() {
    let index = 1;
    while (true) yield index++;
  })();

  return function (): number {
    return idGenerator.next().value;
  };
})();

function randomRangeValue([min, max]) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomArrayElement<T>(arr: T[]): T {
  const len = arr.length;
  if (len === 0) {
    throw new Error('Array is empty');
  }
  return arr[Math.floor(Math.random() * len) % len];
}

function generateActivityRecord(startTime: number, endTime: number) {
  const website: any = randomArrayElement((DATA as any).activity as any);

  return {
    domain: website.domain,
    path: website.path,
    endTime,
    startTime,
  };
}

export const ACTIVITY_TABLE = 'activity';
export const DOMAIN_TABLE = 'domain';
export const TITLE_TABLE = 'title';

export class MockDatabase {
  private activityRecords: Activity[];
  private domainRecords: Record<string, Domain>;

  public constructor() {
    const { activity, domain } = this.generateRecord();

    this.activityRecords = activity;
    this.domainRecords = domain;
  }

  public async createActivityRecord(data): Promise<void> {
    throw new Error('Mock database does not support creating records');
  }

  public deleteActivityRecords(recordIds: number[]): Promise<void> {
    return this[ACTIVITY_TABLE].bulkDelete(recordIds);
  }

  public async fetchAllActivityDomains() {
    return new Promise((resolve) => {
      resolve(this.domainRecords);
    });
  }

  public fetchAllActivityRecords(): Promise<Activity[]> {
    return this.fetchActivityRecords({ start: null, end: null });
  }

  public fetchActivityRecords({
    start: startTime,
    end: endTime,
  }: TimeRange): Promise<Activity[]> {
    return new Promise((resolve) => {
      let result;
      if (startTime !== null && endTime !== null) {
        result = this.activityRecords.filter(
          (datum) => datum.startTime >= startTime && datum.endTime <= endTime
        );
      } else if (startTime !== null) {
        result = this.activityRecords.filter(
          (datum) => datum.startTime >= startTime
        );
      } else if (endTime !== null) {
        result = this.activityRecords.filter(
          (datum) => datum.endTime <= endTime
        );
      } else {
        result = this.activityRecords;
      }
      resolve(result);
    });
  }

  public fetchActivityTimeRange(): Promise<DefiniteTimeRange | null> {
    return new Promise((resolve) => {
      const lastIndex = this.activityRecords.length - 1;
      const start = this.activityRecords?.[lastIndex].startTime;

      resolve(start ? { start, end: Date.now() } : null);
    });
  }

  public generateRecord() {
    const domain = (DATA as any).domain.reduce((acc, datum) => {
      acc[datum.id] = {
        id: datum.id,
        favIconUrl: datum.favIconUrl,
      };
      return acc;
    }, {});

    const activity: Activity[] = [];
    const startOfToday = setMidnight();
    for (let day = 0; day < DAYS_TO_GENERATE; day++) {
      const startOfDay = minusDays(startOfToday, day);
      const browsingStartTime = startOfDay + ACTIVITY_TIME_RANGE[0];
      const browsingEndTime =
        startOfDay + randomRangeValue([32400000, 75600000]);

      let maxDuration = randomRangeValue([1800000, 36000000]);
      let endTime = browsingEndTime;
      while (maxDuration > 0 && endTime > browsingStartTime) {
        const durationRange = randomArrayElement([
          ACTIVITY_DURATION_RANGE_LONG,
          ACTIVITY_DURATION_RANGE_MEDIUM,
          ACTIVITY_DURATION_RANGE_SHORT,
        ]);
        const duration = randomRangeValue(durationRange as any);
        const startTime = endTime - duration;
        const activityRecord = generateActivityRecord(startTime, endTime);

        activity.push(activityRecord as any);
        endTime = startTime - 1;
        maxDuration = maxDuration - duration;

        // Add some idle time between each activity
        if (Math.random() > 0.5) {
          const idleDuration = randomRangeValue([60000, 1800000]);
          endTime = endTime - idleDuration - 1;
          maxDuration = maxDuration - idleDuration;
        }
      }
    }

    return { activity, domain };
  }
}
