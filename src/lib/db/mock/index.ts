import Dexie from 'dexie';
import { Activity, Domain, RawActivity } from '../models/activity';
import { DefiniteTimeRange, TimeRange } from '../models/time';

import {
  ActivityTableRecord,
  DatabaseRecords,
  DatabaseService,
  DomainTableRecord,
  TitleTableRecord,
} from '../types';

import { Mock } from './Mock';
import D from './data.json';

import { createUrl, exportTableRecords, generateRecords } from './utils';

const DATABASE_NAME = 'db';
export const ACTIVITY_TABLE = 'activity';
export const DOMAIN_TABLE = 'domain';
export const TITLE_TABLE = 'title';

export class MockDatabase extends Dexie implements DatabaseService {
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

  private async getFavIconUrlMap(): Promise<Record<string, string>> {
    const domains = await this[DOMAIN_TABLE].toCollection().toArray();
    return domains.reduce(
      (acc: Record<string, string>, domain: DomainTableRecord) => {
        acc[domain.id] = domain.favIconUrl;
        return acc;
      },
      {}
    );
  }

  private async getTitleMap(): Promise<Record<string, string>> {
    const titles = await this[TITLE_TABLE].toCollection().toArray();
    return titles.reduce(
      (acc: Record<string, string>, title: TitleTableRecord) => {
        acc[title.id] = title.title;
        return acc;
      },
      {}
    );
  }

  public async createActivityRecord(rawActivity: RawActivity): Promise<void> {
    if (rawActivity.startTime >= rawActivity.endTime) {
      new Error(`[db]: Invalid time range, ${JSON.stringify(rawActivity)}`);
    }

    const { activity, domain, title } = generateRecords(rawActivity);
    try {
      await this.transaction(
        'rw',
        [this[ACTIVITY_TABLE], this[DOMAIN_TABLE], this[TITLE_TABLE]],
        async () => {
          await this[ACTIVITY_TABLE].add(activity);

          // Ensure that we don't overwrite existing domain favIconUrls with ""
          if (
            domain.favIconUrl !== '' ||
            (await this[DOMAIN_TABLE].get({ id: domain.id })) === undefined
          ) {
            await this[DOMAIN_TABLE].put(domain);
          }

          // Ensure that we don't overwrite existing URL titles with ""
          if (
            title.title !== '' ||
            (await this[TITLE_TABLE].get({ id: title.id })) === undefined
          ) {
            await this[TITLE_TABLE].put(title);
          }
        }
      );
    } catch (err) {
      new Error(err);
    }
  }

  public deleteActivityRecords(recordIds: number[]): Promise<void> {
    return this[ACTIVITY_TABLE].bulkDelete(recordIds);
  }

  // public fetchAllActivityRecords(): Promise<Activity[]> {
  //   return this.fetchActivityRecords({ start: null, end: null });
  // }

  public fetchActivityTimeRange(): Promise<DefiniteTimeRange | null> {
    return this[ACTIVITY_TABLE].orderBy('startTime')
      .first()
      .then((oldestRecord) => {
        return !oldestRecord
          ? null
          : {
              start: oldestRecord.startTime,
              end: Date.now(),
            };
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

  public async fetchActivityRecords(): Promise<Activity[]> {
    const a = new Mock();

    const records = (a as any).activityRecords;

    const [favIconUrlMapByDomain, titleMapByUrl] = await Promise.all([
      this.getFavIconUrlMap(),
      this.getTitleMap(),
    ]);

    return records.map((activity: ActivityTableRecord): Activity => {
      const url = createUrl(activity);

      return {
        ...activity,
        // favIconUrl: favIconUrlMapByDomain[activity.domain] || '',
        // title: titleMapByUrl[url] || '',
        // url,
      } as Activity;
    });
  }

  public async fetchAllActivityDomains(): Promise<Record<string, Domain>> {
    const a = new Mock();

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

  public async importDatabaseRecords(data: DatabaseRecords): Promise<void> {
    const a = (await this.fetchActivityRecords()) as any;
    const b = (await this.fetchAllActivityDomains()) as any;

    try {
      await this.transaction(
        'rw',
        [this[ACTIVITY_TABLE], this[DOMAIN_TABLE], this[TITLE_TABLE]],
        async () => {
          await this[ACTIVITY_TABLE].clear();
          await this[DOMAIN_TABLE].clear();
          await this[TITLE_TABLE].clear();

          await this[ACTIVITY_TABLE].bulkAdd(a);
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
