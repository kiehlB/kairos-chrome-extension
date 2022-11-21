import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import Header from '../../components/Base/Header';

import Card from '../../components/Card';
import { CountUp, DurationCountUp } from '../../components/Count';

import DateRangePicker, { TRANSITION_DELAY } from '../../components/DatePicker';

import {
  getRatioToTotalDuration,
  getSelectedDomainRatioToTotalDuration,
  getSelectedDomainTotalDuration,
} from '../../store/activity/selectors';

import { LineChart } from '../../components/LineChart';
import BubbleChart from '../../components/BubbleChart';
import { HorizontalChart } from '../../components/HorizontalChart';
import { useWindowSize } from '../../hooks/useWindowSize';

function ThridCard() {
  return (
    <>
      <div className="grid  grid-cols-3 gap-4 px-4 pt-4  m2xl:grid-cols-1 bg-white-m dark:bg-[#121212] pb-4">
        <div className="shadow-md  rounded-md bg-white dark:bg-[#1E1E1E] dark:shadowmd">
          <BubbleChart />
        </div>
        <div className="shadow-md  rounded-md bg-white  dark:bg-[#1E1E1E] dark:shadowmd">
          <LineChart />
        </div>
        <div className="shadow-md  rounded-md  bg-white  dark:bg-[#1E1E1E] dark:shadowmd">
          <HorizontalChart />
        </div>
      </div>
    </>
  );
}

export default React.memo(ThridCard);
