import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import Header from '../../components/Base/Header';
import Card from '../../components/Card';

import { CountUp, DurationCountUp } from '../../components/Count';

import DateRangePicker, { TRANSITION_DELAY } from '../../components/DatePicker';
import { MS_PER_HOUR } from '../../lib/constants/time';
import * as d3 from 'd3';

import {
  getRatioToTotalDuration,
  getSelectedDomainRatioToTotalDuration,
  getSelectedDomainTotalDuration,
  getSelectedDomainTotalDurationByDate,
  getSelectedDomainTotalDurationByDayOfWeek,
  getTotalDurationByDate,
  getTotalDurationByDayOfWeek,
} from '../../store/activity/selectors';
import { RootState } from '../../store/store';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import faker from '@faker-js/faker';
import { TableChart } from '../../components/TableChart';
import {
  formatTableDurationLabel,
  formatTooltipDateLabel,
} from '../../utils/stringUtils';
import moment from 'moment';

const MAX_TICK_COUNT = 5;
const MIN_STEP = MS_PER_HOUR;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SecondCard() {
  const totalTime = useSelector((state: RootState) =>
    getTotalDurationByDate(state)
  ) as any;

  const axisData = totalTime.map((d) => ({
    x: d.timestamp,
    y: d.totalDuration,
  }));

  const newDate = axisData.map((ele) =>
    new Date(ele.x).toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
    })
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          autoSkip: true,
          maxTicksLimit: 5,
          font: {
            size: 12,
          },
        },
      },
      y: {
        position: 'left',
        ticks: {
          callback: (value) => formatTableDurationLabel(value),
        },
        stepSize: 1,
      },
    },

    plugins: {
      legend: {
        position: 'top' as const,
      },
      background: {
        color: 'cyan',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  } as any;

  const data = totalTime.map((d) => d.totalDuration);

  const randomData = totalTime.map(
    (d) => d.totalDuration * Math.random() * (2 - 1) + 1
  );

  const d2 = {
    labels: newDate,

    datasets: [
      {
        label: 'Dataset 1',
        data: data,
        backgroundColor: 'rgba(108, 210, 176, 1)',

        borderWidth: 1,
        stack: 'Stack 1',
        borderRadius: Number.MAX_VALUE,
      },
      {
        label: '',
        data: randomData,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        stack: 'Stack 1',
        borderRadius: Number.MAX_VALUE,
      },
    ],
  };

  return (
    <div>
      <div className='flex h-card px-8 mt-4 m2xl:hidden'>
        <div className='border-2 w-scard mr-4'>
          <Bar options={options} data={d2} width={780} height={300} />
        </div>
        <div className='border-2 w-scard'>
          <TableChart />
        </div>
      </div>

      <div className='flex h-card px-8 mt-4  mmd:px-4 xxl:hidden'>
        <div className='border-2 w-fcard'>
          <Bar options={options} data={d2} width={780} height={300} />
        </div>
      </div>
      <div className='flex h-card px-8 mt-4 mmd:px-4  xxl:hidden'>
        <div className='border-2 w-fcard'>
          <TableChart />
        </div>
      </div>
    </div>
  );
}

export default SecondCard;
