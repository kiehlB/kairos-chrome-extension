import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import { RootState } from '../../store';
import {
  getSelectedDomainTotalDurationByPath,
  getTotalDuration,
  getTotalDurationByDomain,
} from '../../store/activity/selectors';
import { constants } from '../../store/router';
import {
  getSearchParams,
  getSearchParamsSelectedDomain,
} from '../../store/router/selectors';

import { formatTableDurationLabel } from '../../utils/stringUtils';
import { computeSearchParams } from '../../utils/urlUtils';
import BarChartTable from './Table';

const TABLE_ROW_COUNT = 10;

export function TableChart(props) {
  const rowCount = TABLE_ROW_COUNT;
  const searchParams = useSelector((state: RootState) => getSearchParams(state));

  const totalData = useSelector((state: RootState) => getTotalDurationByDomain(state));
  const selectedDomain = useSelector((state: RootState) =>
    getSearchParamsSelectedDomain(state),
  );
  const selectedDomainByTimeRange = useSelector((state: RootState) =>
    getSelectedDomainTotalDurationByPath(state),
  );

  const data = totalData.slice(0, 9).map(datum => ({
    label: datum.domain,
    labelComponent: (
      <Link
        to={{
          search: computeSearchParams(searchParams, {
            [constants.SEARCH_PARAM_DOMAIN]: datum.domain,
          }).toString(),
        }}>
        {datum.domain}
      </Link>
    ),
    labelSrc: datum.domain,
    value: datum.totalDuration,
    iconSrc: datum.favIconUrl,
  }));

  const domainData = selectedDomainByTimeRange.slice(0, 9).map(datum => ({
    label: datum.path,
    labelSrc: selectedDomain ? `${selectedDomain}${datum.path}` : undefined,
    value: datum.totalDuration,
  }));

  const maxValue = useSelector((state: RootState) => getTotalDuration(state));

  const totalTimeRangeCardInfo = {
    title: 'Usage Ranking',
    info: `Top ${rowCount} websites based on total time spent`,
    sort: 'z',
    data,
    maxValue,
    rowCount,
    showIcons: true,
  };

  return (
    <Card
      title={totalTimeRangeCardInfo.title}
      info={totalTimeRangeCardInfo.info}
      body={
        totalTimeRangeCardInfo.data.length === 0 ? (
          <div>No activity</div>
        ) : (
          <BarChartTable
            data={totalTimeRangeCardInfo.data}
            maxValue={totalTimeRangeCardInfo.maxValue}
            formatValue={formatTableDurationLabel}
            rowCount={totalTimeRangeCardInfo.rowCount}
            showIcons={totalTimeRangeCardInfo.showIcons}
          />
        )
      }
    />
  );
}
