import { Activity, Domain } from '../models/activity';
import { DefiniteTimeRange, TimeRange } from '../models/time';
import { generateRecords } from './utils';

export class MockDatabase {
  private activityRecords: Activity[];
  private domainRecords: Record<string, Domain>;

  public constructor() {
    const { activity, domain } = generateRecords();

    this.activityRecords = activity;
    this.domainRecords = domain;
  }

  public createActivityRecord(): Promise<void> {
    throw new Error('Mock database does not support creating records');
  }

  public async fetchAllActivityDomains(): Promise<Record<string, Domain>> {
    return new Promise((resolve) => {
      resolve(this.domainRecords);
    });
  }
  public fetchActivityTimeRange(): Promise<DefiniteTimeRange | null> {
    return new Promise((resolve) => {
      const lastIndex = this.activityRecords.length - 1;
      const start = this.activityRecords?.[lastIndex].startTime;
      resolve(start ? { start, end: Date.now() } : null);
    });
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
}
