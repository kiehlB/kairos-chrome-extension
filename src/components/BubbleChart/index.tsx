import React from 'react';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Bubble } from 'react-chartjs-2';

import { useSelector } from 'react-redux';

import {
  getAverageDurationByHourOfWeek,
  getSelectedDomainAverageDurationByHourOfWeek,
  getTotalDurationByDomain,
} from '../../store/activity/selectors';
import { formatHourOfDay, formatTableDurationLabel } from '../../utils/stringUtils';

import { useParams, useLocation } from 'react-router-dom';
import { RootState } from '../../store';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export function formatTableDurationLabelToMin(duration: number): string {
  if (duration < 1000) {
    return `${duration} ms`;
  }

  if (duration < 60000) {
    return `${(duration / 1000).toFixed(1)} s`;
  }

  if (duration < 3600000) {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.round((duration / 1000) % 60);
    return `${minutes} min ${seconds.toString().padStart(2, '0')} s`;
  }

  const hours = Math.floor(duration / 3600000);
  const minutes = Math.round((duration / 60000) % 60);
  return ` ${minutes.toString().padStart(2, '0')} min`;
}
export function BubbleChart() {
  const totalData = useSelector((state: RootState) =>
    getAverageDurationByHourOfWeek(state),
  );

  const totalDataByDomain = useSelector((state: RootState) =>
    getSelectedDomainAverageDurationByHourOfWeek(state),
  );

  const isDarkToggle = useSelector((state: RootState) => state.activity.isDark);

  const totalDataByDomainData = totalDataByDomain.map(ele => ({
    x: ele.day,
    y: ele.hour,
    r: Math.floor(ele.duration / 60000),
  }));

  const bubbleData = totalData.map(ele => ({
    x: ele.day,
    y: ele.hour,
    r: Math.floor(ele.duration / 60000 / 3),
  }));

  let location = useLocation();

  const byDomain = location.search.slice(0, 7);

  const isDomain = byDomain == '?domain' ? true : false;

  const data = {
    datasets: [
      {
        label: 'Red dataset',
        data: isDomain ? totalDataByDomainData : bubbleData,
        borderWidth: 1,
        radius: 3,
        backgroundColor: 'rgba(108, 210, 176, 1)',
        borderColor: 'rgba(217, 217, 217, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 8,
    },
    scales: {
      x: {
        grid: {
          color: isDarkToggle ? '#D9D9D9' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDarkToggle ? '#D9D9D9' : '#70768C',
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
          color: isDarkToggle ? '#D9D9D9' : 'rgba(0, 0, 0, 0.1)',
        },
        position: 'left',
        ticks: {
          color: isDarkToggle ? '#D9D9D9' : '#70768C',
          callback: value => formatHourOfDay(value),
        },
        stepSize: 1,
      },
    },

    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let value = context.raw.x;
            let data = context.raw.r || '';
            if (value == 0) {
              return `Sun, ${data}min`;
            } else if (value == 1) {
              return `Mon, ${data}min`;
            } else if (value == 2) {
              return `Tue, ${data}min`;
            } else if (value == 3) {
              return `Wed, ${data}min`;
            } else if (value == 4) {
              return `Thu, ${data}min`;
            } else if (value == 5) {
              return `Fir, ${data}min`;
            } else if (value == 6) {
              return `Sat, ${data}min`;
            }
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
        text: 'Usage by Time of Day',
        color: isDarkToggle ? '#D9D9D9' : '#70768C',
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
  } as any;
  return <Bubble options={options} data={data} height={328} />;
}
