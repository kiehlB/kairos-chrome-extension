import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import faker from '@faker-js/faker';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getTotalDurationByDomain } from '../../store/activity/selectors';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export function DoughnutChart() {
  const { width } = useWindowSize();

  const totalData = useSelector((state: RootState) =>
    getTotalDurationByDomain(state)
  );

  const splitDomain = totalData.map((ele) => ele.domain.split('https://'));

  const domain = splitDomain.map((ele) => ele[1]).splice(0, 5);

  const totalDuration = totalData.map((ele) => ele.totalDuration).splice(0, 5);

  const data = {
    labels: domain,
    datasets: [
      {
        data: totalDuration,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Doughnut options={options} data={data} width={520} height={300} />;
}
