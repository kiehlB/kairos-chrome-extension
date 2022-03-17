import { MockDatabase } from './mock';

import { StorageDatabase } from './storage';

export function InitDatabaseService() {
  return new MockDatabase();

  // return new StorageDatabase();
}
