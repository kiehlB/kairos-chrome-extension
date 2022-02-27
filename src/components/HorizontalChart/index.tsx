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
import { useWindowSize } from '../../hooks/useWindowSize';
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
  ) as any;

  const totalTimeByDomain = useSelector((state: RootState) =>
    getSelectedDomainTotalDurationByDayOfWeek(state)
  ) as any;

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
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    scales: {
      x: {
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
      legend: {
        position: 'top' as const,
        display: false,
      },
      background: {
        color: 'cyan',
      },
      title: {
        display: true,
      },
    },
  } as any;

  const data = totalTime.map((d) => d.duration / 3600000);

  const randomData = totalTime.map(
    (d) => d.duration * Math.random() * (2 - 1) + 1
  );

  const labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const d2 = {
    labels,

    datasets: [
      {
        label: 'Dataset 1',
        data: isDomain ? totalTimeByDomain : data,
        backgroundColor: 'rgba(108, 210, 176, 1)',
        borderColor: 'rgba(108, 210, 176, 1)',
        borderWidth: 1,
        stack: 'Stack 1',
        borderRadius: Number.MAX_VALUE,
      },
      {
        label: '',
        data: isDomain ? randomData : allTimeByDomain,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        stack: 'Stack 2',
        borderRadius: Number.MAX_VALUE,
      },
    ],
  };

  return <Bar options={options} data={d2} width={520} height={300} />;
}
