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
import { getTotalDurationByDayOfWeek } from '../../store/activity/selectors';
import { formatTableDurationLabel } from '../../utils/stringUtils';

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

  const labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          autoSkip: true,

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
        display: false,
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

  const data = totalTime.map((d) => d.duration);

  const randomData = totalTime.map(
    (d) => d.duration * Math.random() * (2 - 1) + 1
  );

  const d2 = {
    labels: labels,

    datasets: [
      {
        label: 'Dataset 1',
        data: data,
        backgroundColor: 'rgba(108, 210, 176, 1)',
        borderColor: 'rgba(108, 210, 176, 1)',
        borderWidth: 1,
        stack: 'Stack 1',
        borderRadius: Number.MAX_VALUE,
      },
      {
        label: '',
        data: randomData,
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
