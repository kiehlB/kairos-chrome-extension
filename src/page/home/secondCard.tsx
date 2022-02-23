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
import { useWindowSize } from '../../hooks/useWindowSize';

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

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function SecondCard() {
  const totalTime = useSelector((state: RootState) =>
    getTotalDurationByDayOfWeek(state)
  );
  const { width } = useWindowSize();
  const d = totalTime.map((d) => d.duration / 1000000);

  const d2 = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: d,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: d,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  console.log(labels.map(() => faker.datatype.number({ min: 0, max: 1000 })));
  console.log(d);

  return (
    <>
      {width > 1341 ? (
        <>
          <div className='flex h-card px-8 mt-4 '>
            <div className='border-2 w-scard mr-4'>
              <Bar options={options} data={d2} width={780} height={300} />
            </div>
            <div className='border-2 w-scard'>
              <TableChart />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='flex h-card px-8 mt-4  mmd:px-4'>
            <div className='border-2 w-fcard'>
              <Bar options={options} data={d2} width={780} height={300} />
            </div>
          </div>
          <div className='flex h-card px-8 mt-4 mmd:px-4 '>
            <div className='border-2 w-fcard '>
              <TableChart />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SecondCard;
