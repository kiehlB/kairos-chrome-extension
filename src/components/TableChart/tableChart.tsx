import classNames from 'classnames';
import * as d3 from 'd3';
import React from 'react';

import LabelCell from './LabelCell';

export type Datum = {
  label: string;
  value: number;
  labelSrc?: string;
  iconSrc?: string;
};
interface BarChartTableProps {
  data: Datum[];
  className?: string;
  formatValue?: (value: number) => string;
  maxValue?: number;
  rowCount?: number;
  showIcons?: boolean;
}

export const NO_DATA_LABEL = '_NIL_';

export const defaultProps = {
  maxValue: undefined,
  rowCount: 10,
  showIcons: true,
};

const BarChartTable = ({
  className,
  data,
  formatValue,
  maxValue,
  rowCount = defaultProps.rowCount,
  showIcons = defaultProps.showIcons,
}: BarChartTableProps) => {
  const rowData = [...new Array(rowCount)].map((_, index) => {
    return data?.[index] ?? { label: NO_DATA_LABEL, value: 0 };
  });
  const max = maxValue ?? d3.max(rowData.map((d) => d.value)) ?? 1;

  return (
    <div className='flex'>
      <div className=''>
        {rowData.map((datum, index) => (
          <div
            key={index}
            className='bar-chart-table__cell'
            style={{
              visibility: datum.label === NO_DATA_LABEL ? 'hidden' : undefined,
            }}
          >
            {`${index + 1}.`}
          </div>
        ))}
      </div>
      <div className='border-2'>
        {rowData.map((datum, index) => (
          <LabelCell
            key={index}
            {...datum}
            hide={datum.label === NO_DATA_LABEL}
            maxValue={max}
            showIcons={showIcons}
          />
        ))}
      </div>
      <div className='bar-chart-table__col bar-chart-table__col-value'>
        {rowData.map((datum, index) => (
          <div
            key={index}
            className='bar-chart-table__cell'
            style={{
              visibility: datum.label === NO_DATA_LABEL ? 'hidden' : undefined,
            }}
          >
            {formatValue ? formatValue(datum.value) : datum.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChartTable;
