import { Button, Dialog, Icon, toaster, Tooltip } from 'evergreen-ui';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppLayout from '../../components/AppLayout';
import Header from '../../components/Base/Header';
import Card from '../../components/Card';
import { List, ListItem } from '../../components/List';
import useStorageEstimate from '../../hooks/useStorageEstimate';
import { BASE_SIZE } from '../../lib/styles/constants';
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
    <div className='w-full dark:bg-gray-900 bg-white-m ml-side   m2xl:ml-0 '>
      <AppLayout.MainNav>
        <Header title='Settings' subTitle='Settings' />
      </AppLayout.MainNav>
      <AppLayout
        first={
          <AppLayout.First>
            <div className='flex w-full border-2 m2xl:flex-wrap  '>
              <div className='p-4 w-full'>
                <div className=' border-2 w-full bg-white shadow-md  rounded-md dark:bg-gray-900 '>
                  <List>
                    <ListItem
                      className='flex justify-between p-4 border-b text-dark-m dark:text-slate-300 font-medium text-sm items-center flex-wrap '
                      label='Extension Data'
                      isLoading={isLoadingRecords}
                      value={
                        <Tooltip
                          content={
                            '데이터의 총 사용량과 사용한 데이터를 다운받을 수 있습니다'
                          }
                        >
                          <Icon
                            icon='issue'
                            size={BASE_SIZE * 1.5}
                            style={{ transform: 'rotate(180deg)' }}
                          />
                        </Tooltip>
                      }
                    />
                    <ListItem
                      className='flex justify-between p-4 border-b text-dark-m font-medium text-sm items-center   overflow-hidden flex-wrap '
                      label='Estimated storage data used'
                      isLoading={isLoadingRecords}
                      value={`${formatBytes(storageUsage)}`}
                    />
                    <ListItem
                      className='flex justify-between p-4 border-b text-dark-m font-medium text-sm items-center   overflow-hidden flex-wrap'
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
                    {
                      <div className='flex justify-end p-4 flex-wrap'>
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
                  </List>
                </div>
              </div>

              <div className='p-4 w-full'>
                <div className=' border-2 w-full bg-white shadow-md  rounded-md  dark:bg-gray-900'>
                  <List>
                    <ListItem
                      className='flex justify-between p-4 border-b text-dark-m font-medium text-sm items-center flex-wrap'
                      label='About'
                      isLoading={isLoadingRecords}
                      value={
                        <Tooltip content={'For info'}>
                          <Icon
                            icon='issue'
                            size={BASE_SIZE * 1.5}
                            style={{ transform: 'rotate(180deg)' }}
                          />
                        </Tooltip>
                      }
                    />
                    <ListItem
                      className='flex justify-between p-4 border-b text-dark-m font-medium text-sm items-center   overflow-hidden flex-wrap'
                      label='github Link'
                      isLoading={isLoadingRecords}
                      value={`https://github.com/kiehlB/Kairos_chrome-extension`}
                    />
                    <ListItem
                      className='flex justify-between p-4 border-b text-dark-m font-medium text-sm items-center   overflow-hidden flex-wrap'
                      label='MyBlog'
                      isLoading={isLoadingRecords}
                      value={'https://www.woongblog.xyz/'}
                    />
                    <ListItem
                      className='flex justify-between p-4 border-b text-dark-m font-medium text-sm items-center   overflow-hidden flex-wrap'
                      label='Download the extension from Chrome Web Store.'
                      isLoading={isLoadingRecords}
                      value={'not yet'}
                    />
                  </List>
                </div>
              </div>
            </div>
          </AppLayout.First>
        }
        second={<AppLayout.Second></AppLayout.Second>}
        third={<AppLayout.Third>{}</AppLayout.Third>}
      />
    </div>
  );
};
