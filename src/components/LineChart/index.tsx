import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from '@faker-js/faker';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  getAverageDurationByHourOfWeek,
  getSelectedDomainTotalDurationByDayOfWeek,
  getTotalDurationByDayOfWeek,
} from '../../store/activity/selectors';
import { formatTableDurationLabel } from '../../utils/stringUtils';
import { useParams, useLocation } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart() {
  const totalTime = useSelector((state: RootState) =>
    getTotalDurationByDayOfWeek(state)
  ) as any;

  const totalTimeByDomain = useSelector((state: RootState) =>
    getSelectedDomainTotalDurationByDayOfWeek(state)
  ) as any;

  const isDarkToggle = useSelector((state: RootState) => state.activity.isDark);

  const allTimeByDomain = totalTimeByDomain.map((d) => d.duration);
  const allTime = totalTime.map((d) => d.duration);

  let location = useLocation();

  const byDomain = location.search.slice(0, 7);

  const isDomain = byDomain == '?domain' ? true : false;

  const axisData = totalTime.map((d) => ({
    x: d.day,
    y: d.duration,
  }));

  const axisDataByDomain = totalTime.map((d) => ({
    x: d.day,
    y: d.duration,
  }));

  const newDate = axisData.map((ele) =>
    new Date(ele.x).toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
    })
  );

  const newDateByDomain = axisDataByDomain.map((ele) =>
    new Date(ele.x).toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
    })
  );

  const options = {
    responsive: true,
    layout: {
      padding: 8,
    },
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
          callback: (value) =>
            isDomain
              ? `${Math.floor(value / (1000 * 60))}min`
              : `${Math.floor(value / (1000 * 60 * 60))}h`,
        },
        stepSize: 1,
      },
    } as any,

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
      title: {
        display: true,
        text: 'Usage by Day of Week',
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
  };

  const data = {
    labels: isDomain ? newDateByDomain : newDate,
    datasets: [
      {
        label: 'Dataset 1',
        data: isDomain ? allTimeByDomain : allTime,
        borderColor: 'rgba(108, 210, 176, 1)',

        backgroundColor: 'rgba(108, 210, 176, 1)',
      },
    ],
  };

  return <Line options={options} data={data} width={520} height={300} />;
}
