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
import { useWindowSize } from '../../hooks/useWindowSize';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  getAverageDurationByHourOfWeek,
  getTotalDurationByDomain,
} from '../../store/activity/selectors';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export function BubbleChart() {
  const totalData = useSelector((state: RootState) =>
    getAverageDurationByHourOfWeek(state)
  );

  const bubbleData = totalData.map((ele) => ({
    x: ele.day,
    y: ele.duration,
  }));

  console.log(bubbleData);

  const data = {
    datasets: [
      {
        label: 'Red dataset',
        data: bubbleData,
        backgroundColor: 'rgba(108, 210, 176, 1)',
        borderColor: 'rgba(108, 210, 176, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Bubble options={options} data={data} width={520} height={300} />;
}
