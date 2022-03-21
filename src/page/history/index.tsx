import { Button, IconButton, toaster } from 'evergreen-ui';
import React, { useCallback, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../components/Base/Header';
import { ActivityDateRangePicker } from '../../components/DateRange';

import ErrorView from '../../components/ErrorView';
import { HistoryTable } from '../../components/HistoryTable';
import View from '../../components/View';
import { Activity } from '../../lib/db/models/activity';
import { RootState } from '../../store';
import {
  getIsDeletingRecords,
  getIsInitialized,
  getIsLoadingRecords,
} from '../../store/activity/selectors';
import { getSearchParamsSelectedTimeRangeValidationStatus } from '../../store/router/selectors';

interface HistoryViewProps {}

const DELETE_TOASTER_ID = 'history-view-delete-toaster';

export const HistoryView = ({}) => {
  const isDeletingRecords = useSelector((state: RootState) =>
    getIsDeletingRecords(state)
  );

  const isInitialized = useSelector((state: RootState) =>
    getIsInitialized(state)
  );

  const isLoadingRecords = useSelector((state: RootState) =>
    getIsLoadingRecords(state)
  );

  const selectedTimeRangeValidationStatus = useSelector((state: RootState) =>
    getSearchParamsSelectedTimeRangeValidationStatus(state)
  );

  const [selectedRecordIds, setSelectedRecordIds] = useState<number[]>([]);
  const handleCancelClick = useCallback(() => {
    setSelectedRecordIds([]);
  }, [setSelectedRecordIds]);

  const handleRowClick = useCallback(
    (record: Activity) => {
      const recordId = record.id;
      if (recordId) {
        setSelectedRecordIds(
          selectedRecordIds.includes(recordId)
            ? selectedRecordIds.filter((id) => id !== recordId)
            : [...selectedRecordIds, recordId]
        );
      }
    },
    [selectedRecordIds, setSelectedRecordIds]
  );

  let viewContent;
  const disabled = isDeletingRecords || isLoadingRecords;
  switch (true) {
    case selectedRecordIds.length > 0: {
      const headerText = isDeletingRecords
        ? 'Deleting records...'
        : `${selectedRecordIds.length} ${
            selectedRecordIds.length > 1 ? 'records' : 'record'
          } selected`;

      break;
    }
  }
  switch (true) {
    case !isInitialized:
      viewContent = null;
      break;
    case selectedTimeRangeValidationStatus.isValid === false: {
      const errorDescription = selectedTimeRangeValidationStatus.description;
      viewContent = <ErrorView message={errorDescription} />;
      break;
    }
    default:
      viewContent = (
        <HistoryTable
          autoFocus={true}
          disabled={disabled}
          isLoading={isLoadingRecords}
          onRowClick={handleRowClick}
          selectedRecordIds={selectedRecordIds}
        />
      );
      break;
  }

  return (
    <View.Container className='w-full  h-full   bg-white-m dark:bg-gray-900 ml-side   m2xl:ml-0'>
      <View.Header>
        <Header title='Browser History' subTitle='History' />
      </View.Header>
      <View.Body className='h-5/6 p-4' isLoading={!isInitialized}>
        {viewContent}
      </View.Body>
    </View.Container>
  );
};
