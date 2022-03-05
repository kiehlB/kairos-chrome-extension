import { Button, Dialog, toaster } from 'evergreen-ui';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import Card from '../../components/Card';
import { List, ListItem } from '../../components/List';
import useStorageEstimate from '../../hooks/useStorageEstimate';
import {
  getActivityTimeRange,
  getIsLoadingRecords,
} from '../../store/activity/selectors';
import {
  getExportingDatabaseRecordsError,
  getExportingDatabaseRecordsSuccess,
} from '../../store/dataMigration/selectors';
import { exportDatabaseRecords } from '../../store/dataMigration/slice';
import { RootState } from '../../store/store';
import { formatBytes, formatDateDistance } from '../../utils/dateUtils';

interface ExtensionDataCardProps {
  exportData: () => void;
  importData: (data: string) => void;
  activityTimeRange: any;
  exportDataError: Error | null;
  exportDataSuccess: boolean | null;
  importDataError: Error | null;
  importDataSuccess: boolean | null;
  isLoadingRecords: boolean;
}

const EXPORT_TOASTER_ID = 'extension-data-card-import-toaster';
const IMPORT_TOASTER_ID = 'extension-data-card-export-toaster';

export const SettingsView = ({}) => {
  const activityTimeRange = useSelector((state: RootState) =>
    getActivityTimeRange(state)
  );

  const exportDataError = useSelector((state: RootState) =>
    getExportingDatabaseRecordsError(state)
  );

  const exportDataSuccess = useSelector((state: RootState) =>
    getExportingDatabaseRecordsSuccess(state)
  );

  const isLoadingRecords = useSelector((state: RootState) =>
    getIsLoadingRecords(state)
  );

  const dispatch = useDispatch();

  const [storageUsage] = useStorageEstimate();
  const [importDataFile, setImportDataFile] = useState<File | null>(null);
  const [showConfirmImportDialog, setShowConfirmImportDialog] = useState(false);
  const [hasShownExportToaster, setHasShownExportToaster] = useState(true);
  const [hasShownImportToaster, setHasShownImportToaster] = useState(true);
  useEffect(() => {
    if (!hasShownExportToaster) {
      if (exportDataError) {
        toaster.danger('Fail to export data', {
          id: EXPORT_TOASTER_ID,
          description: exportDataError.message,
        });
        setHasShownExportToaster(true);
      }
      if (exportDataSuccess === true) {
        toaster.success('Successfully exported data', {
          id: EXPORT_TOASTER_ID,
        });
        setHasShownExportToaster(true);
      }
    }
  }, [hasShownExportToaster, exportDataError, exportDataSuccess]);

  return (
    <Card
      className='settings-view__card settings-view__card--md'
      title='Extension Data'
      description='Manage data collected & stored by the extension'
      body={
        <>
          <List>
            <ListItem
              label='Estimated storage data used'
              isLoading={isLoadingRecords}
              value={`${formatBytes(storageUsage)}`}
            />
            <ListItem
              label='Total data collected'
              isLoading={isLoadingRecords}
              value={
                activityTimeRange
                  ? formatDateDistance(
                      activityTimeRange.start,
                      activityTimeRange.end
                    )
                  : '-'
              }
            />
          </List>
        </>
      }
      footer={
        <div className='settings-view__button-panel'>
          <Button
            appearance='primary'
            iconBefore='export'
            onClick={() => {
              setHasShownExportToaster(false);
              dispatch(exportDatabaseRecords());
            }}
          >
            Export Data
          </Button>
        </div>
      }
    />
  );
};
