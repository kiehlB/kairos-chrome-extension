import { MockDatabaseConnection } from './db/mock';
import { DatabaseService } from './db/types';

export function InitDatabaseService(): DatabaseService | undefined {
  return new MockDatabaseConnection();
}
