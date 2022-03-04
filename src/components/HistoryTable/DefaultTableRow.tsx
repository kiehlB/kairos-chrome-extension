import classNames from 'classnames';
import { Table } from 'evergreen-ui';
import React from 'react';
import { BASE_SIZE } from '../../lib/styles/constants';

export const DEFAULT_TABLE_ROW_HEIGHT = BASE_SIZE * 3;

function DefaultTableRow({
  datum,
  isSelectable,
  onRowClick,
  selectedIds,
}): JSX.Element {
  return (
    <Table.Row
      className=''
      height={DEFAULT_TABLE_ROW_HEIGHT}
      onClick={isSelectable && onRowClick ? () => onRowClick(datum) : undefined}
    >
      <span>{JSON.stringify(datum)}</span>
    </Table.Row>
  );
}

export default DefaultTableRow;
