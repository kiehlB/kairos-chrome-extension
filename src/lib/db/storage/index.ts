import Dexie from 'dexie';
import { MockDatabase } from '../mock';
import { Activity, Domain, RawActivity } from '../models/activity';
import { DefiniteTimeRange, TimeRange } from '../models/time';

import {
  ActivityTableRecord,
  DatabaseRecords,
  DatabaseService,
  DomainTableRecord,
  TitleTableRecord,
} from '../types';

import D from './data.json';

import { createUrl, exportTableRecords, generateRecords } from './utils';

const DATABASE_NAME = 'db';
export const ACTIVITY_TABLE = 'activity';
export const DOMAIN_TABLE = 'domain';
export const TITLE_TABLE = 'title';

export class StorageDatabase extends Dexie implements DatabaseService {
  private [ACTIVITY_TABLE]: Dexie.Table<ActivityTableRecord, number>;
  private [DOMAIN_TABLE]: Dexie.Table<DomainTableRecord, number>;
  private [TITLE_TABLE]: Dexie.Table<TitleTableRecord, number>;

  public constructor() {
    super(DATABASE_NAME);
    this.version(1).stores({
      [ACTIVITY_TABLE]: '++id, domain, startTime, endTime',
      [DOMAIN_TABLE]: 'id',
      [TITLE_TABLE]: 'id',
    });

    this[ACTIVITY_TABLE] = this.table(ACTIVITY_TABLE);
    this[DOMAIN_TABLE] = this.table(DOMAIN_TABLE);
    this[TITLE_TABLE] = this.table(TITLE_TABLE);
  }

  public async createActivityRecord(rawActivity: RawActivity): Promise<void> {
    throw new Error('Mock database does not support creating records');
  }

  public deleteActivityRecords(recordIds: number[]): Promise<void> {
    return this[ACTIVITY_TABLE].bulkDelete(recordIds);
  }

  private async getFavIconUrlMap(): Promise<Record<string, string>> {
    const domain = await D.domain;

    return (domain as any).reduce(
      (acc: Record<string, string>, domain: DomainTableRecord) => {
        acc[domain.id] = domain.favIconUrl;
        return acc;
      },
      {}
    );
  }

  private async getTitleMap(): Promise<Record<string, string>> {
    const titles = await D.title;
    return titles.reduce(
      (acc: Record<string, string>, title: TitleTableRecord) => {
        acc[title.id] = title.title;
        return acc;
      },
      {}
    );
  }

  public async fetchActivityRecords(): Promise<Activity[]> {
    const a = new MockDatabase();

    const records = (a as any).activityRecords;

    const [favIconUrlMapByDomain, titleMapByUrl] = await Promise.all([
      this.getFavIconUrlMap(),
      this.getTitleMap(),
    ]);

    return records.map((activity: ActivityTableRecord): Activity => {
      const url = createUrl(activity);

      return {
        ...activity,
        favIconUrl: favIconUrlMapByDomain[activity.domain] || '',
        title: titleMapByUrl[url] || '',
        url,
      } as Activity;
    });
  }

  public async fetchAllActivityDomains(): Promise<Record<string, Domain>> {
    const a = new MockDatabase();

    const domains = await (a as any).domainRecords;

    const intoArray = Object.values(domains);

    return (intoArray as any).reduce(
      (acc: Record<string, Domain>, domain: DomainTableRecord) => {
        acc[domain.id] = domain;
        return acc;
      },
      {}
    );
  }

  public fetchActivityTimeRange(): Promise<DefiniteTimeRange | null> {
    return new Promise(async (resolve) => {
      const a = new MockDatabase();

      const records = (a as any).activityRecords;

      const lastIndex = (await records.length) - 1;

      const start = records[lastIndex].startTime;

      resolve(start ? { start, end: Date.now() } : null);
    });
  }

  public async exportDatabaseRecords(): Promise<DatabaseRecords> {
    const activityTableRecords = (
      await exportTableRecords<ActivityTableRecord>(this[ACTIVITY_TABLE])
    ).map((record) => {
      delete record.id;
      return record;
    });
    const domainTableRecords = await exportTableRecords<DomainTableRecord>(
      this[DOMAIN_TABLE]
    );
    const titleTableRecords = await exportTableRecords<TitleTableRecord>(
      this[TITLE_TABLE]
    );

    return {
      [ACTIVITY_TABLE]: activityTableRecords,
      [DOMAIN_TABLE]: domainTableRecords,
      [TITLE_TABLE]: titleTableRecords,
    };
  }

  public async importDatabaseRecords(data: DatabaseRecords): Promise<void> {
    // const totalCount = data[ACTIVITY_TABLE].length;

    const a = new MockDatabase();

    const records = (a as any).activityRecords;

    try {
      await this.transaction(
        'rw',
        [this[ACTIVITY_TABLE], this[DOMAIN_TABLE], this[TITLE_TABLE]],
        async () => {
          await this[ACTIVITY_TABLE].clear();
          await this[DOMAIN_TABLE].clear();
          await this[TITLE_TABLE].clear();

          await this[ACTIVITY_TABLE].bulkAdd(records);
          await this[DOMAIN_TABLE].bulkAdd(D[DOMAIN_TABLE]);
          await this[TITLE_TABLE].bulkAdd(D[TITLE_TABLE]);
        }
      );
      console.log('[db] All records were imported successfully');
    } catch (err) {
      console.error('[db]', err);
    }
  }
}
