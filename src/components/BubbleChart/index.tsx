import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import faker from '@faker-js/faker';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  getAverageDurationByHourOfWeek,
  getSelectedDomainAverageDurationByHourOfWeek,
  getTotalDurationByDomain,
} from '../../store/activity/selectors';
import {
  formatHourOfDay,
  formatTableDurationLabel,
} from '../../utils/stringUtils';

import { useParams, useLocation } from 'react-router-dom';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export function BubbleChart() {
  const totalData = useSelector((state: RootState) =>
    getAverageDurationByHourOfWeek(state)
  );
  const totalDataByDomain = useSelector((state: RootState) =>
    getSelectedDomainAverageDurationByHourOfWeek(state)
  );

  const isDarkToggle = useSelector((state: RootState) => state.activity.isDark);

  const totalDataByDomainData = totalDataByDomain.map((ele) => ({
    x: ele.day,
    y: ele.hour,
    r: Math.floor(ele.duration / 60000),
  }));

  let location = useLocation();

  const byDomain = location.search.slice(0, 7);

  const isDomain = byDomain == '?domain' ? true : false;

  const bubbleData = totalData.map((ele) => ({
    x: ele.day,
    y: ele.hour,
    r: Math.floor(ele.duration / 60000 / 3),
  }));

  const data = {
    datasets: [
      {
        label: 'Red dataset',
        data: isDomain ? totalDataByDomainData : bubbleData,
        borderWidth: 1,
        radius: 3,
        backgroundColor: 'rgba(108, 210, 176, 1)',
        borderColor: 'rgba(108, 210, 176, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      x: {
        grid: {
          color: isDarkToggle ? '#70768C' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          callback: function (value, index, values) {
            if (value == 0) {
              return 'S';
            } else if (value == 1) {
              return 'M';
            } else if (value == 2) {
              return 'T';
            } else if (value == 3) {
              return 'W';
            } else if (value == 4) {
              return 'T';
            } else if (value == 5) {
              return 'F';
            } else if (value == 6) {
              return 'S';
            }
          },
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        grid: {
          color: isDarkToggle ? '#70768C' : 'rgba(0, 0, 0, 0.1)',
        },
        position: 'left',
        ticks: {
          callback: (value) => formatHourOfDay(value),
        },
        stepSize: 1,
      },
    },

    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      background: {
        color: 'cyan',
      },
      title: {
        display: false,
      },
    },
  } as any;
  return <Bubble options={options} data={data} width={520} height={300} />;
}
