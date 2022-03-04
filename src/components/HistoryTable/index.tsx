import classNames from 'classnames';
import { Avatar, Table as EvergreenTable } from 'evergreen-ui';
import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Activity } from '../../lib/db/models/activity';
import { BASE_SIZE, ICON_SIZE_MD } from '../../lib/styles/constants';
import { getRecords } from '../../store/activity/selectors';
import { RootState } from '../../store/store';
import {
  formatTableDurationLabel,
  formatTableDateTimeLabel,
} from '../../utils/stringUtils';
import Table from './Table';

interface HistoryTableProps {
  data?: Activity[];
  autoFocus?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  selectedRecordIds?: number[];
  onRowClick?: (datum: Activity) => void;
}

enum HistoryTableSortOrder {
  DurationAscending = 'DURATION_ASCENDING',
  DurationDescending = 'DURATION_DESCENDING',
  TimeAscending = 'TIME_ASCENDING',
  TimeDescending = 'TIME_DESCENDING',
}

const ROW_HEIGHT = BASE_SIZE * 6;
const DEFAULT_SORT_ORDER = 'TIME_DESCENDING' as HistoryTableSortOrder;
const SORT_OPTIONS: any = [
  {
    buttonLabel: 'Sorted by Duration (Ascending)',
    optionLabel: 'Sorted by Duration',
    optionSublabel: 'Ascending',
    value: 'DURATION_ASCENDING' as HistoryTableSortOrder,
    sortFn: (data) =>
      data
        .slice()
        .sort((a, b) =>
          a.endTime - a.startTime > b.endTime - b.startTime ? 1 : -1
        ),
  },
  {
    buttonLabel: 'Sorted by Duration (Descending)',
    optionLabel: 'Sorted by Duration',
    optionSublabel: 'Descending',
    value: 'DURATION_DESCENDING' as HistoryTableSortOrder,
    sortFn: (data) =>
      data
        .slice()
        .sort((a, b) =>
          a.endTime - a.startTime > b.endTime - b.startTime ? -1 : 1
        ),
  },
  {
    buttonLabel: 'Sorted by Time (Ascending)',
    optionLabel: 'Sorted by Time',
    optionSublabel: 'Ascending',
    value: 'TIME_ASCENDING' as HistoryTableSortOrder,
    sortFn: (data) =>
      data.slice().sort((a, b) => (a.startTime > b.startTime ? 1 : -1)),
  },
  {
    buttonLabel: 'Sorted by Time (Descending)',
    optionLabel: 'Sorted by Time',
    optionSublabel: 'Descending',
    value: 'TIME_DESCENDING' as HistoryTableSortOrder,
    sortFn: (data) =>
      data.slice().sort((a, b) => (a.startTime > b.startTime ? -1 : 1)),
  },
];
const TITLE_PLACEHOLDER = '-';

function filterActivityRecords(data: Activity[], filter: string) {
  return data.filter(
    (record) =>
      record.url.toLowerCase().includes(filter) ||
      record.title.toLowerCase().includes(filter)
  );
}

function formatRecordString(count: number) {
  return `${count.toLocaleString('en-US')} ${count > 1 ? 'records' : 'record'}`;
}

export const HistoryTableRow = ({
  datum,
  isSelectable,
  onRowClick,
  selectedIds,
}) => {
  const activityDateTime = formatTableDateTimeLabel(new Date(datum.startTime));
  const activityDuration = formatTableDurationLabel(
    datum.endTime - datum.startTime
  );

  return (
    <EvergreenTable.Row
      className=''
      data-activity-id={datum.id}
      height={ROW_HEIGHT}
      key={datum.id}
      onClick={isSelectable && onRowClick ? () => onRowClick(datum) : undefined}
    >
      <EvergreenTable.Cell display='flex' alignItems='center' flexGrow={80}>
        <Avatar
          className=''
          hashValue={datum.domain}
          name={datum.domain}
          src={datum.favIconUrl}
          size={ICON_SIZE_MD}
        />
        <div className='ml-3 flex flex-col text-xs'>
          <strong className=' '>{datum.title || TITLE_PLACEHOLDER}</strong>
          <ExternalLink url={datum.url} />
        </div>
      </EvergreenTable.Cell>
      <EvergreenTable.Cell
        display='flex'
        alignItems='center'
        flexGrow={20}
        className='flex justify-end text-xs'
      >
        <div className='flex flex-col'>
          <strong>{activityDateTime}</strong>
          <span className='flex justify-end mt-1'>{activityDuration}</span>
        </div>
      </EvergreenTable.Cell>
    </EvergreenTable.Row>
  );
};

export const HistoryTable = ({
  autoFocus,
  disabled,
  isLoading,
  onRowClick,
  selectedRecordIds,
}: HistoryTableProps) => {
  const data = useSelector((state: RootState) => getRecords(state));

  return (
    <Table
      autoFocus={autoFocus}
      data={data}
      defaultSortOrder={DEFAULT_SORT_ORDER}
      disabled={disabled}
      filterFn={filterActivityRecords}
      filterPlaceholder='No activity'
      formatEntries={formatRecordString}
      isLoading={isLoading}
      rowHeight={ROW_HEIGHT}
      rowRenderer={HistoryTableRow}
      onRowClick={onRowClick}
      selectedIds={selectedRecordIds}
      sortOptions={SORT_OPTIONS}
    />
  );
};

const ExternalLink = (props) => {
  return (
    <span
      className={classNames('external-link', props.className)}
      style={props.style}
    >
      {props.iconSrc && (
        <img
          className='external-link__icon'
          alt={props.iconAlt}
          src={props.iconSrc}
        />
      )}
      <a href={props.url} title={props.title || props.url} target='none'>
        {props.children || props.url}
      </a>
    </span>
  );
};
