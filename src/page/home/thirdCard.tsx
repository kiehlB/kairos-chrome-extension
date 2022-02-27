import { useEffect } from 'react';
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
import { RootState } from '../../store/store';
import { HorizontalChart } from '../../components/HorizontalChart';
import { LineChart } from '../../components/LineChart';
import { BubbleChart } from '../../components/BubbleChart';

const TotalUsage = ({
  className,
  sort,
  title,
  info,
  footer,
  data,
  formattingFn,
  formattingUnitFn,
}) => {
  return (
    <div className={className}>
      <Card
        sort={sort}
        title={title}
        info={info}
        footer={footer}
        body={
          <div>
            <CountUp
              start={0}
              end={data}
              decimals={2}
              duration={TRANSITION_DELAY / 1000}
              formattingFn={formattingFn}
              formattingUnitFn={formattingUnitFn}
              preserveValue={true}
              redraw={true}
            />
          </div>
        }
      />
    </div>
  );
};

function ThridCard() {
  const test = useSelector((state: RootState) =>
    getSelectedDomainRatioToTotalDuration(state)
  );

  const totalTime = useSelector((state: RootState) =>
    getRatioToTotalDuration(state)
  );

  const totalTimeRangeCardInfo = {
    title: 'Total Usage',
    info: 'Total time spent on the website',
    footer: 'vs. previous month',
    sort: 'single',
    data: totalTime * 100,
    formattingFn: (d: number) => `${d.toFixed(2)}`,
    formattingUnitFn: () => '%',
  };

  return (
    <>
      <>
        <div className='flex h-card px-8 mt-4 m2xl:hidden '>
          <div className='border-2 w-tcard mr-3'>
            <BubbleChart />
          </div>
          <div className='border-2 w-tcard mr-3'>
            <LineChart />
          </div>
          <div className='border-2 w-tcard'>
            <HorizontalChart />
          </div>
        </div>
      </>

      <>
        <div className='flex h-card px-8 mt-4 mmd:px-4 xxl:hidden'>
          <div className='border-2 w-fcard  '>
            <BubbleChart />
          </div>
        </div>
        <div className='flex h-card px-8 mt-4 mmd:px-4 xxl:hidden'>
          <div className='border-2 w-fcard  '>
            <LineChart />
          </div>
        </div>
        <div className='flex h-card px-8 mt-4 mmd:px-4 xxl:hidden'>
          <div className='border-2 w-fcard'>
            <HorizontalChart />
          </div>
        </div>
      </>
    </>
  );
}

export default ThridCard;
