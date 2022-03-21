import { Activity, Domain, RawActivity } from '../models/activity';
import { DefiniteTimeRange, TimeRange } from '../models/time';

export interface ActivityTableRecord {
  id?: number;
  domain: string;
  path: string;
  startTime: number;
  endTime: number;
}

export interface DomainTableRecord {
  id: string;
  favIconUrl: string;
}

export interface TitleTableRecord {
  id: string;
  title: string;
}

export interface DatabaseRecords {
  activity: ActivityTableRecord[];
  domain: DomainTableRecord[];
  title: TitleTableRecord[];
}
export interface ActivityService {
  createActivityRecord(activity: RawActivity): Promise<void>;
}

export interface DatabaseService extends ActivityService {}
