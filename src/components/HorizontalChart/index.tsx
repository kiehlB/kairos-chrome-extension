import React from 'react';
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

import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  getSelectedDomainTotalDurationByDayOfWeek,
  getTotalDurationByDayOfWeek,
} from '../../store/activity/selectors';
import { formatTableDurationLabel } from '../../utils/stringUtils';
import { useParams, useLocation } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function HorizontalChart() {
  const totalTime = useSelector((state: RootState) =>
    getTotalDurationByDayOfWeek(state)
  );

  const totalTimeByDomain = useSelector((state: RootState) =>
    getSelectedDomainTotalDurationByDayOfWeek(state)
  );

  const isDarkToggle = useSelector((state: RootState) => state.activity.isDark);

  const allTimeByDomain = totalTimeByDomain.map((d) => d.duration);

  let location = useLocation();

  const byDomain = location.search.slice(0, 7);

  const isDomain = byDomain == '?domain' ? true : false;

  const options = {
    responsive: true,

    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    layout: {
      padding: 8,
    },
    scales: {
      x: {
        grid: {
          color: isDarkToggle ? '#70768C' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          callback: function (val, index) {
            return `${val}h`;
          },
          maxRotation: 0,
          minRotation: 0,

          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        stepSize: 1,
      },
    },

    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = Math.floor(context.parsed.x) || '';

            return ` ${label}h`;
          },
        },
      },
      legend: {
        position: 'top' as const,
        display: false,
      },
      background: {
        color: 'cyan',
      },
      title: {
        display: true,
        text: 'Usage by Day of Week',
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
  } as any;

  const data = totalTime.map((d) => d.duration / 3600000);

  const randomData = totalTime.map((d) => d.duration);

  const labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const d2 = {
    labels,

    datasets: [
      {
        label: 'Dataset 1',
        data: isDomain ? allTimeByDomain : data,
        backgroundColor: 'rgba(108, 210, 176, 1)',
        borderColor: 'rgba(108, 210, 176, 1)',
        borderWidth: 1,
        stack: 'Stack 1',
      },
    ],
  };

  return <Bar options={options} data={d2} width={520} height={300} />;
}
