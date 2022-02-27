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
import { useWindowSize } from '../../hooks/useWindowSize';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  getAverageDurationByHourOfWeek,
  getTotalDurationByDayOfWeek,
} from '../../store/activity/selectors';

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

  const allTime = totalTime.map((d) => d.duration);

  console.log(allTime);

  const labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: allTime,
        borderColor: 'rgba(108, 210, 176, 1)',

        backgroundColor: 'rgba(108, 210, 176, 1)',
      },
      {
        label: 'Dataset 2',
        data: allTime,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  return <Line options={options} data={data} width={520} height={300} />;
}
