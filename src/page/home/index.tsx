import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import Header from '../../components/Base/Header';
import Card from '../../components/Card';
import Scales from '../../components/Chart';
import Transition from '../../components/Chart';
import Axis from '../../components/Chart';
import { CountUp, DurationCountUp } from '../../components/Count';
import DataJoin from '../../components/DataJoin';
import DateRangePicker, { TRANSITION_DELAY } from '../../components/DatePicker';

import {
  getRatioToTotalDuration,
  getSelectedDomainRatioToTotalDuration,
  getSelectedDomainTotalDuration,
} from '../../store/activity/selectors';
import { RootState } from '../../store/store';
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

function Home() {
  const test = useSelector((state: RootState) =>
    getSelectedDomainRatioToTotalDuration(state)
  );

  console.log(test);
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
    <div className='w-full'>
      <AppLayout.MainNav>
        <Header />
      </AppLayout.MainNav>
      <AppLayout
        first={
          <AppLayout.First>
            <div className='flex mt-4 px-8 h-single'>
              <TotalUsage
                className='border-2 mr-4 w-mcard '
                sort='single'
                title={totalTimeRangeCardInfo.title}
                info={totalTimeRangeCardInfo.info}
                footer={totalTimeRangeCardInfo.footer}
                data={totalTimeRangeCardInfo.data}
                formattingFn={totalTimeRangeCardInfo.formattingFn}
                formattingUnitFn={totalTimeRangeCardInfo.formattingUnitFn}
              />
              <TotalUsage
                className='border-2 mr-4 w-mcard '
                sort='single'
                title={totalTimeRangeCardInfo.title}
                info={totalTimeRangeCardInfo.info}
                footer={totalTimeRangeCardInfo.footer}
                data={totalTimeRangeCardInfo.data}
                formattingFn={totalTimeRangeCardInfo.formattingFn}
                formattingUnitFn={totalTimeRangeCardInfo.formattingUnitFn}
              />
              <TotalUsage
                className='border-2 mr-4 w-mcard '
                sort='single'
                title={totalTimeRangeCardInfo.title}
                info={totalTimeRangeCardInfo.info}
                footer={totalTimeRangeCardInfo.footer}
                data={totalTimeRangeCardInfo.data}
                formattingFn={totalTimeRangeCardInfo.formattingFn}
                formattingUnitFn={totalTimeRangeCardInfo.formattingUnitFn}
              />
              <TotalUsage
                className='border-2 w-mcard '
                sort='single'
                title={totalTimeRangeCardInfo.title}
                info={totalTimeRangeCardInfo.info}
                footer={totalTimeRangeCardInfo.footer}
                data={totalTimeRangeCardInfo.data}
                formattingFn={totalTimeRangeCardInfo.formattingFn}
                formattingUnitFn={totalTimeRangeCardInfo.formattingUnitFn}
              />
            </div>
          </AppLayout.First>
        }
        second={
          <AppLayout.Second>
            <div className='flex h-card px-8 mt-4'>
              {/* <TotalUsage className='border-2  mr-4 w-scard' sort='second' />
              <TotalUsage className='border-2 w-scard' sort='second' /> */}
              <TotalUsage
                className='border-2 w-scard mr-4'
                sort='single'
                title={totalTimeRangeCardInfo.title}
                info={totalTimeRangeCardInfo.info}
                footer={totalTimeRangeCardInfo.footer}
                data={totalTimeRangeCardInfo.data}
                formattingFn={totalTimeRangeCardInfo.formattingFn}
                formattingUnitFn={totalTimeRangeCardInfo.formattingUnitFn}
              />
              <TotalUsage
                className='border-2 w-scard '
                sort='single'
                title={totalTimeRangeCardInfo.title}
                info={totalTimeRangeCardInfo.info}
                footer={totalTimeRangeCardInfo.footer}
                data={totalTimeRangeCardInfo.data}
                formattingFn={totalTimeRangeCardInfo.formattingFn}
                formattingUnitFn={totalTimeRangeCardInfo.formattingUnitFn}
              />
            </div>
          </AppLayout.Second>
        }
        third={
          <AppLayout.Third>
            <div className='flex h-card px-8 mt-4'>
              {/* <TotalUsage className='border-2  mr-4 w-tcard' sort='thrid' />
              <TotalUsage className='border-2  mr-4 w-tcard' sort=' ' />
              <TotalUsage className='border-2  w-tcard' sort=' ' /> */}
              <TotalUsage
                className='border-2 w-tcard mr-4'
                sort='single'
                title={totalTimeRangeCardInfo.title}
                info={totalTimeRangeCardInfo.info}
                footer={totalTimeRangeCardInfo.footer}
                data={totalTimeRangeCardInfo.data}
                formattingFn={totalTimeRangeCardInfo.formattingFn}
                formattingUnitFn={totalTimeRangeCardInfo.formattingUnitFn}
              />
              <TotalUsage
                className='border-2 w-tcard mr-4'
                sort='single'
                title={totalTimeRangeCardInfo.title}
                info={totalTimeRangeCardInfo.info}
                footer={totalTimeRangeCardInfo.footer}
                data={totalTimeRangeCardInfo.data}
                formattingFn={totalTimeRangeCardInfo.formattingFn}
                formattingUnitFn={totalTimeRangeCardInfo.formattingUnitFn}
              />
              <TotalUsage
                className='border-2 w-tcard '
                sort='single'
                title={totalTimeRangeCardInfo.title}
                info={totalTimeRangeCardInfo.info}
                footer={totalTimeRangeCardInfo.footer}
                data={totalTimeRangeCardInfo.data}
                formattingFn={totalTimeRangeCardInfo.formattingFn}
                formattingUnitFn={totalTimeRangeCardInfo.formattingUnitFn}
              />
            </div>
          </AppLayout.Third>
        }
      />
    </div>
  );
}

export default Home;
