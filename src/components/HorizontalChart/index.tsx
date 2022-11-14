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

import { useSelector } from 'react-redux';

import {
  getSelectedDomainTotalDurationByDayOfWeek,
  getTotalDurationByDayOfWeek,
} from '../../store/activity/selectors';
import { formatTableDurationLabel } from '../../utils/stringUtils';
import { useParams, useLocation } from 'react-router-dom';
import { RootState } from '../../store';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function HorizontalChart() {
  const totalTime = useSelector((state: RootState) => getTotalDurationByDayOfWeek(state));

  const totalTimeByDomain = useSelector((state: RootState) =>
    getSelectedDomainTotalDurationByDayOfWeek(state),
  );

  const isDarkToggle = useSelector((state: RootState) => state.activity.isDark);

  const allTimeByDomain = totalTimeByDomain.map(d => d.duration);

  let location = useLocation();

  const byDomain = location.search.slice(0, 7);

  const isDomain = byDomain == '?domain' ? true : false;
  const data = totalTime.map(d => d.duration / 3600000);

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
          callback: value =>
            isDomain
              ? `${Math.floor(value / (1000 * 60))} min`
              : `${Math.floor(value)} h`,
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

  const randomData = totalTime.map(d => d.duration);

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

  return <Bar options={options} data={d2} height={328} />;
}
