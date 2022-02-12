import { MockDatabaseConnection } from './mock';

export function InitDatabaseService() {
  return new MockDatabaseConnection();
}
