import { MockDatabaseConnection } from './db/mock/Mock';
import { DatabaseService } from './db/types';

export function InitDatabaseService(): DatabaseService | undefined {
  return new MockDatabaseConnection();
}
