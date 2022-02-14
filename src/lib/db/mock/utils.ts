import { minusDays, setMidnight } from '../../../utils/dateUtils';
import { Activity } from '../models/activity';
import { DomainTableRecord } from '../types';
import DATA from './data.json';

type Range = [number, number];
type Page = { title: string; path: string };
type Website = {
  domain: string;
  favIconUrl: string;
  pages: Page[];
};

const RANGE_SHORT: Range = [100, 120000]; // 100ms ~ 2min
const RANGE_MEDIUM: Range = [120000, 300000]; // 2 ~ 5min
const RANGE_LONG: Range = [300000, 900000]; // 5 ~ 15min
const DURATION_RANGE: Range = [60000, 1800000]; // 1 ~ 30min
const PER_DAY_RANGE: Range = [1800000, 36000000]; // 0.5 ~ 10h
const TIME_RANGE: Range = [32400000, 75600000]; // 9am ~ 9pm

function randomRangeValue([min, max]: Range): number {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomArrayElement<T>(arr: T[]): T {
  const len = arr.length;
  if (len === 0) {
    throw new Error('Array is empty');
  }
  return arr[Math.floor(Math.random() * len) % len];
}

const generateId: () => number = (function () {
  const idGenerator = (function* getActivityIdGenerator() {
    let index = 1;
    while (true) yield index++;
  })();

  return function (): number {
    return idGenerator.next().value;
  };
})();

function generateActivityRecord(startTime: number, endTime: number): Activity {
  const website = randomArrayElement(DATA as Website[]);
  const page = randomArrayElement<Page>(website.pages);
  return {
    id: generateId(),
    url: `${website.domain}${page.path}`,
    domain: website.domain,
    path: page.path,
    endTime,
    startTime,
    title: page.title,
    favIconUrl: website.favIconUrl,
  };
}

export function generateRecords(): {
  activity: Activity[];
  domain: Record<string, DomainTableRecord>;
} {
  const domain = DATA.reduce<Record<string, DomainTableRecord>>(
    (acc, datum) => {
      acc[datum.domain] = {
        id: datum.domain,
        favIconUrl: datum.favIconUrl,
      };
      return acc;
    },
    {}
  );

  const activity: Activity[] = [];
  const startOfToday = setMidnight();

  for (let day = 0; day < 60; day++) {
    const startOfDay = minusDays(startOfToday, day);

    const browsingStartTime = startOfDay + TIME_RANGE[0]; // today + few hour
    const browsingEndTime = startOfDay + randomRangeValue(TIME_RANGE);

    let maxDuration = randomRangeValue(PER_DAY_RANGE);
    let endTime = browsingEndTime;
    while (maxDuration > 0 && endTime > browsingStartTime) {
      const durationRange = randomArrayElement([
        RANGE_LONG,
        RANGE_MEDIUM,
        RANGE_SHORT,
      ]);
      const duration = randomRangeValue(durationRange);
      const startTime = endTime - duration;
      const activityRecord = generateActivityRecord(startTime, endTime);

      activity.push(activityRecord);
      endTime = startTime - 1;
      maxDuration = maxDuration - duration;

      if (Math.random() > 0.5) {
        const idleDuration = randomRangeValue(DURATION_RANGE);
        endTime = endTime - idleDuration - 1;
        maxDuration = maxDuration - idleDuration;
      }
    }
  }

  return { activity, domain };
}
