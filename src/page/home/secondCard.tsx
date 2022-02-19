import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import Header from '../../components/Base/Header';
import Card from '../../components/Card';
import Scales from '../../components/Chart';
import Axis from '../../components/Chart';
import { CountUp, DurationCountUp } from '../../components/Count';
import DataJoin from '../../components/DataJoin';
import DateRangePicker, { TRANSITION_DELAY } from '../../components/DatePicker';
import { MS_PER_HOUR } from '../../lib/constants/time';
import * as d3 from 'd3';

import {
  getRatioToTotalDuration,
  getSelectedDomainRatioToTotalDuration,
  getSelectedDomainTotalDuration,
  getSelectedDomainTotalDurationByDate,
  getTotalDurationByDate,
} from '../../store/activity/selectors';
import { RootState } from '../../store/store';
import SingleCard from './singleCard';

import {
  formatTooltipDateLabel,
  formatTooltipDurationLabel,
} from '../../utils/stringUtils';
import Tooltip from '../../components/Tooltip';
import Chart from '../../components/Chart';

const MAX_TICK_COUNT = 5;
const MIN_STEP = MS_PER_HOUR;

const formatTickX = (x: number) => {
  const date = new Date(x);
  switch (true) {
    case date.getDate() === 1:
      return d3.timeFormat('%B')(date);
    default:
      return d3.timeFormat('%a %d')(date);
  }
};
const formatTickY = (y: number) => {
  const hours = Number(y) / MS_PER_HOUR;
  return `${hours}h`;
};
const computeTickValuesX = (data) => {
  const startOfTheDayInMs = new Date().setHours(0, 0, 0, 0);
  const startDate = new Date(d3.min(data.map((d) => d.x)) || startOfTheDayInMs);
  const endDate = new Date(d3.max(data.map((d) => d.x)) || startOfTheDayInMs);
  const dayRange = d3.timeDay.count(startDate, endDate);
  const step = Math.ceil(dayRange / 5);
  return [...d3.timeDay.range(startDate, endDate, step)].map((d) =>
    d.valueOf()
  );
};
const computeTickValuesY = (data) => {
  const [, max = 0] = d3.extent(data.map((d) => d.y));
  if (max <= MIN_STEP) {
    return [MIN_STEP];
  }

  const multiplier = Math.max(1, Math.ceil(max / MAX_TICK_COUNT / MIN_STEP));
  const step = multiplier * MIN_STEP;
  const maxTickValue = Math.ceil(max / step) * step + 1;
  return d3.range(step, maxTickValue, step);
};

const TotalUsage = ({
  className,
  sort,
  title,
  info,

  data,
}) => {
  const xy = data.map((d) => ({ x: d.timestamp, y: d.totalDuration }));

  console.log(xy);
  const tickValuesX = computeTickValuesX(xy);
  const tickValuesY = computeTickValuesY(xy);

  return (
    <div className={className}>
      <Card sort={sort} title={title} info={info} body={<></>} />
    </div>
  );
};

function SecondCard() {
  const totalTime = useSelector((state: RootState) =>
    getTotalDurationByDate(state)
  );

  const totalTimeRangeCardInfo = {
    title: 'Total Usage',
    info: 'Total time spent on the website',

    sort: 'single',
    data: totalTime,
  };

  return (
    <>
      <div className='flex h-card px-8 mt-4 border-2'>
        {/* <TotalUsage
          className='border-2 w-scard mr-4'
          sort='second'
          title={totalTimeRangeCardInfo.title}
          info={totalTimeRangeCardInfo.info}
          data={totalTimeRangeCardInfo.data}
        />
        <TotalUsage
          className='border-2 w-scard '
          sort='single'
          title={totalTimeRangeCardInfo.title}
          info={totalTimeRangeCardInfo.info}
          data={totalTimeRangeCardInfo.data}
        /> */}
        <div className='border-2 w-scard mr-4'>
          <Chart xy={totalTime} />
        </div>
      </div>
    </>
  );
}

export default SecondCard;
