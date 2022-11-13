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

import { TableChart } from '../../components/TableChart';
import {
  formatTableDurationLabel,
  formatTooltipDateLabel,
} from '../../utils/stringUtils';
import moment from 'moment';
import { useParams, useLocation } from 'react-router-dom';
import { RootState } from '../../store';

const MAX_TICK_COUNT = 5;
const MIN_STEP = MS_PER_HOUR;

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SecondCard() {
  const totalTime = useSelector((state: RootState) => getTotalDurationByDate(state));

  const totalTimeByDomain = useSelector((state: RootState) =>
    getSelectedDomainTotalDurationByDate(state),
  );

  const isDarkToggle = useSelector((state: RootState) => state.activity.isDark);

  let location = useLocation();

  const byDomain = location.search.slice(0, 7);

  const isDomain = byDomain == '?domain' ? true : false;

  const axisData = totalTime.map(d => ({
    x: d.timestamp,
    y: d.totalDuration,
  }));

  const newDate = axisData.map(ele =>
    new Date(ele.x).toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
    }),
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 8,
    },
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
            size: 14,
          },
        },
      },
      y: {
        grid: {
          color: isDarkToggle ? '#70768C' : 'rgba(0, 0, 0, 0.1)',
        },
        position: 'left',
        ticks: {
          color: '#70768C',
          callback: value => formatTableDurationLabel(value),
        },
        stepSize: 1,
      },
    },

    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = formatTableDurationLabel(context.parsed.y) || '';

            return label;
          },
        },
      },
      legend: {
        display: false,
        position: 'top' as const,
      },
      background: {
        color: 'cyan',
      },
      title: {
        display: true,
        text: 'Usage Trend',
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
  } as any;

  const data = totalTime.map(d => d.totalDuration);

  const dataByDomain = totalTimeByDomain.map(d => d.totalDuration);

  const d2 = {
    labels: newDate,

    datasets: [
      {
        label: 'Dataset 1',
        data: isDomain ? dataByDomain : data,
        backgroundColor: 'rgba(108, 210, 176, 1)',
        borderColor: 'rgba(108, 210, 176, 1)',

        borderWidth: 1,
        stack: 'Stack 1',
        borderRadius: Number.MAX_VALUE,
      },
    ],
  };

  return (
    <div className="bg-white-m dark:bg-slate-900">
      <div className="grid  grid-cols-2 gap-4 px-4 mt-4 dark:bg-slate-900  bg-white-m  m2xl:grid-cols-1">
        <div className="shadow-md  rounded-md  bg-white dark:bg-slate-900 dark:shadowmd  dark:border-2">
          <Bar options={options} data={d2} width={780} height={300} />
        </div>
        <div className="shadow-md rounded-md bg-white  dark:bg-slate-900 dark:shadowmd  dark:border-2">
          <TableChart />
        </div>
      </div>
    </div>
  );
}

export default SecondCard;
