import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import Header from '../../components/Base/Header';
import Card from '../../components/Card';
import Scales from '../../components/Chart';
import Transition from '../../components/Chart';
import Axis from '../../components/Chart';
import { CountUp, DurationCountUp } from '../../components/Count';

import DateRangePicker, { TRANSITION_DELAY } from '../../components/DatePicker';
import useClientDimensions from '../../hooks/useClientDimensions';
import { useWindowSize } from '../../hooks/useWindowSize';

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

function SingleCard() {
  const [containerRef, { height: containerHeight, width }] =
    useClientDimensions();
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

  const eachWithTotal = () => {
    return (
      <div className='flex'>
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
          className='border-2 mr-4
           w-mcard '
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
          className='border-2  w-mcard '
          sort='single'
          title={totalTimeRangeCardInfo.title}
          info={totalTimeRangeCardInfo.info}
          footer={totalTimeRangeCardInfo.footer}
          data={totalTimeRangeCardInfo.data}
          formattingFn={totalTimeRangeCardInfo.formattingFn}
          formattingUnitFn={totalTimeRangeCardInfo.formattingUnitFn}
        />
      </div>
    );
  };

  const halfWithTotal = () => {
    return (
      <div className='w-full'>
        <div className='flex'>
          <TotalUsage
            className='border-2 mr-4 w-scard '
            sort='single'
            title={totalTimeRangeCardInfo.title}
            info={totalTimeRangeCardInfo.info}
            footer={totalTimeRangeCardInfo.footer}
            data={totalTimeRangeCardInfo.data}
            formattingFn={totalTimeRangeCardInfo.formattingFn}
            formattingUnitFn={totalTimeRangeCardInfo.formattingUnitFn}
          />
          <TotalUsage
            className='border-2  w-scard '
            sort='single'
            title={totalTimeRangeCardInfo.title}
            info={totalTimeRangeCardInfo.info}
            footer={totalTimeRangeCardInfo.footer}
            data={totalTimeRangeCardInfo.data}
            formattingFn={totalTimeRangeCardInfo.formattingFn}
            formattingUnitFn={totalTimeRangeCardInfo.formattingUnitFn}
          />
        </div>
        <div className='flex mt-4'>
          <TotalUsage
            className='border-2 mr-4 w-scard '
            sort='single'
            title={totalTimeRangeCardInfo.title}
            info={totalTimeRangeCardInfo.info}
            footer={totalTimeRangeCardInfo.footer}
            data={totalTimeRangeCardInfo.data}
            formattingFn={totalTimeRangeCardInfo.formattingFn}
            formattingUnitFn={totalTimeRangeCardInfo.formattingUnitFn}
          />
          <TotalUsage
            className='border-2  w-scard '
            sort='single'
            title={totalTimeRangeCardInfo.title}
            info={totalTimeRangeCardInfo.info}
            footer={totalTimeRangeCardInfo.footer}
            data={totalTimeRangeCardInfo.data}
            formattingFn={totalTimeRangeCardInfo.formattingFn}
            formattingUnitFn={totalTimeRangeCardInfo.formattingUnitFn}
          />
        </div>
      </div>
    );
  };

  const fullWithTotal = () => {
    return (
      <div className='w-full'>
        <div className='flex'>
          <TotalUsage
            className='border-2 w-fcard '
            sort='single'
            title={totalTimeRangeCardInfo.title}
            info={totalTimeRangeCardInfo.info}
            footer={totalTimeRangeCardInfo.footer}
            data={totalTimeRangeCardInfo.data}
            formattingFn={totalTimeRangeCardInfo.formattingFn}
            formattingUnitFn={totalTimeRangeCardInfo.formattingUnitFn}
          />
        </div>
        <div className='mt-2'>
          <TotalUsage
            className='border-2  w-fcard '
            sort='single'
            title={totalTimeRangeCardInfo.title}
            info={totalTimeRangeCardInfo.info}
            footer={totalTimeRangeCardInfo.footer}
            data={totalTimeRangeCardInfo.data}
            formattingFn={totalTimeRangeCardInfo.formattingFn}
            formattingUnitFn={totalTimeRangeCardInfo.formattingUnitFn}
          />
        </div>
        <div className='flex mt-2'>
          <TotalUsage
            className='border-2   w-fcard '
            sort='single'
            title={totalTimeRangeCardInfo.title}
            info={totalTimeRangeCardInfo.info}
            footer={totalTimeRangeCardInfo.footer}
            data={totalTimeRangeCardInfo.data}
            formattingFn={totalTimeRangeCardInfo.formattingFn}
            formattingUnitFn={totalTimeRangeCardInfo.formattingUnitFn}
          />
        </div>
        <div className='flex mt-2'>
          <TotalUsage
            className='border-2  w-fcard '
            sort='single'
            title={totalTimeRangeCardInfo.title}
            info={totalTimeRangeCardInfo.info}
            footer={totalTimeRangeCardInfo.footer}
            data={totalTimeRangeCardInfo.data}
            formattingFn={totalTimeRangeCardInfo.formattingFn}
            formattingUnitFn={totalTimeRangeCardInfo.formattingUnitFn}
          />
        </div>
      </div>
    );
  };

  const resultTotal = () => {
    if (width > 1341) {
      return eachWithTotal();
    } else if (width < 1341 && width > 768) {
      return halfWithTotal();
    } else if (width < 769) {
      return fullWithTotal();
    }
  };

  return (
    <>
      <div className='mt-4 px-8 mmd:px-4' ref={containerRef}>
        {resultTotal()}
      </div>
    </>
  );
}

export default SingleCard;
