import { Activity, Domain } from '../models/activity';
import { generateRecords } from './utils';

export class MockDatabaseConnection {
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

  public fetchAllActivityRecords(): Promise<Activity[]> {
    return new Promise((resolve) => {
      resolve(this.activityRecords);
    });
  }
}
