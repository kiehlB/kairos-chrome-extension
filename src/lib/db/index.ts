import { MockDatabase } from './mock';

export function InitDatabaseService() {
  return new MockDatabase();
}
