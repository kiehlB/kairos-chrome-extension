import { RootState } from '..';

export const getIsExportingDatabaseRecords = (state: RootState) => {
  return state.dataMigration.isExportingDatabaseRecords;
};

export const getExportingDatabaseRecordsError = (state: RootState) => {
  return state.dataMigration.exportingDatabaseRecordsError;
};

export const getExportingDatabaseRecordsSuccess = (state: RootState) => {
  return state.dataMigration.exportingDatabaseRecordsSuccess;
};

export const getIsImportingDatabaseRecords = (state: RootState) => {
  return state.dataMigration.isImportingDatabaseRecords;
};

export const getImportingDatabaseRecordsError = (state: RootState) => {
  return state.dataMigration.importingDatabaseRecordsError;
};

export const getImportingDatabaseRecordsSuccess = (state: RootState) => {
  return state.dataMigration.importingDatabaseRecordsSuccess;
};
