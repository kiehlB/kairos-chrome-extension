import { useCallback, useEffect } from 'react';
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

import { useParams, useLocation } from 'react-router-dom';

import {
  getRatioToTotalDuration,
  getSelectedDomainAveragePageVisitDuration,
  getSelectedDomainRatioToTotalDuration,
  getSelectedDomainTotalDuration,
  getSelectedDomainTotalPageVisitCount,
  getTotalDomainVisitCount,
  getTotalDuration,
  getTotalPageVisitCount,
} from '../../store/activity/selectors';
import { RootState } from '../../store/store';
import { ArrowUpRight, ArrowDownRight } from 'react-feather';

export type TotalUsageProps = {
  className?;
  sort?;
  title?;
  info?;
  footer?;
  data?;
  formattingFn?;
  formattingUnitFn?;
  isDuration?;
  getRandomArbitrary?;
};

const TotalUsage = (props) => {
  const extraCard = {
    isDuration: false,
    decimals: 3,
    formattingFn: (d: number) => `${d.toFixed(0)}`,
  };

  const Component = props.isDuration ? DurationCountUp : CountUp;
  return (
    <div className={props.className}>
      <Card
        sort={props.sort}
        title={props.title}
        info={props.info}
        footer={props.footer}
        body={
          <div>
            <Component
              start={0}
              end={props.data}
              decimals={props.decimals}
              duration={TRANSITION_DELAY / 1500}
              formattingFn={props.formattingFn}
              formattingUnitFn={props.formattingUnitFn}
              preserveValue={true}
              redraw={true}
            />
          </div>
        }
        extra={props.getRandomArbitrary}
      />
    </div>
  );
};

function SingleCard() {
  const [containerRef, { height: containerHeight, width }] =
    useClientDimensions();

  const getRandomArbitrary = useCallback((min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  }, []);

  let location = useLocation();

  const byDomain = location.search.slice(0, 7);

  const totalTime = useSelector((state: RootState) => getTotalDuration(state));

  const totalTimeByDamin = useSelector((state: RootState) =>
    getSelectedDomainTotalDuration(state)
  );
  const toTotalDuration = useSelector(
    (state: RootState) => getRatioToTotalDuration(state) * 100
  );

  const toTotalDurationByDomain = useSelector(
    (state: RootState) => getSelectedDomainRatioToTotalDuration(state) * 100
  );

  const pageVisit = useSelector((state: RootState) =>
    getTotalPageVisitCount(state)
  );

  const pageVisitByDomain = useSelector((state: RootState) =>
    getSelectedDomainTotalPageVisitCount(state)
  );

  const domainVisit = useSelector((state: RootState) =>
    getTotalDomainVisitCount(state)
  );

  const domainVisitByDomain = useSelector((state: RootState) =>
    getSelectedDomainAveragePageVisitDuration(state)
  );

  const isDomain = byDomain == '?domain' ? true : false;

  const totalTimeRangeCardInfo = {
    title: 'Total Usage',
    info: '웹사이트 전체 사용 시간',
    footer: 'vs. previous month',
    sort: 'single',
    data: isDomain ? totalTimeByDamin : totalTime,
    isDuration: true,
  };

  const toTotalDurationCard = {
    title: 'Usage Percentage',
    info: '전체 브라우저 사용량',
    footer: 'vs. previous month',
    sort: 'single',

    data: isDomain ? toTotalDurationByDomain : toTotalDuration,
    isDuration: false,
    decimals: 3,
    formattingFn: (d: number) => `${d.toFixed(2)}`,
    formattingUnitFn: () => '%',
  };

  const pageVisitCard = {
    title: 'Page Visits',
    info: '전체 방문한 사이트 수',
    footer: 'vs. previous month',
    sort: 'single',

    data: isDomain ? pageVisitByDomain : pageVisit,
    isDuration: false,
    formattingFn: (d: number) => d.toLocaleString('en-US'),
    formattingUnitFn: (d: number) => (d > 1 ? 'pages' : 'page'),
  };

  const TotalDomainCard = {
    title: 'Visit Duration',
    info: '전체 방문한 도메인 수',
    footer: 'vs. previous month',
    sort: 'single',
    data: isDomain ? domainVisitByDomain : domainVisit,
    isDuration: isDomain ? true : false,
    formattingFn: isDomain ? '' : (d: number) => d.toLocaleString('en-US'),
    formattingUnitFn: isDomain
      ? ''
      : (d: number) => (d > 1 ? 'domains' : 'domain'),
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
          isDuration={totalTimeRangeCardInfo.isDuration}
          getRandomArbitrary={getRandomArbitrary(-100, 100)}
        />
        <TotalUsage
          className='border-2 mr-4
           w-mcard '
          sort='single'
          title={toTotalDurationCard.title}
          info={toTotalDurationCard.info}
          footer={toTotalDurationCard.footer}
          data={toTotalDurationCard.data}
          formattingFn={toTotalDurationCard.formattingFn}
          formattingUnitFn={toTotalDurationCard.formattingUnitFn}
          decimals={toTotalDurationCard.decimals}
          isDuration={toTotalDurationCard.isDuration}
          getRandomArbitrary={getRandomArbitrary(-100, 100)}
        />

        <TotalUsage
          className='border-2 mr-4 w-mcard '
          sort='single'
          title={pageVisitCard.title}
          info={pageVisitCard.info}
          footer={pageVisitCard.footer}
          data={pageVisitCard.data}
          formattingFn={pageVisitCard.formattingFn}
          formattingUnitFn={pageVisitCard.formattingUnitFn}
          isDuration={pageVisitCard.isDuration}
          getRandomArbitrary={getRandomArbitrary(-100, 100)}
        />
        <TotalUsage
          className='border-2  w-mcard '
          sort='single'
          title={TotalDomainCard.title}
          info={TotalDomainCard.info}
          footer={TotalDomainCard.footer}
          data={TotalDomainCard.data}
          formattingFn={TotalDomainCard.formattingFn}
          formattingUnitFn={TotalDomainCard.formattingUnitFn}
          isDuration={TotalDomainCard.isDuration}
          getRandomArbitrary={getRandomArbitrary(-100, 100)}
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
            isDuration={totalTimeRangeCardInfo.isDuration}
            getRandomArbitrary={getRandomArbitrary(-100, 100)}
          />
          <TotalUsage
            className='border-2 
           w-scard '
            sort='single'
            title={toTotalDurationCard.title}
            info={toTotalDurationCard.info}
            footer={toTotalDurationCard.footer}
            data={toTotalDurationCard.data}
            formattingFn={toTotalDurationCard.formattingFn}
            formattingUnitFn={toTotalDurationCard.formattingUnitFn}
            decimals={toTotalDurationCard.decimals}
            isDuration={toTotalDurationCard.isDuration}
            getRandomArbitrary={getRandomArbitrary(-100, 100)}
          />
        </div>
        <div className='flex mt-4'>
          <TotalUsage
            className='border-2 mr-4 w-scard '
            sort='single'
            title={pageVisitCard.title}
            info={pageVisitCard.info}
            footer={pageVisitCard.footer}
            data={pageVisitCard.data}
            formattingFn={pageVisitCard.formattingFn}
            formattingUnitFn={pageVisitCard.formattingUnitFn}
            isDuration={pageVisitCard.isDuration}
            getRandomArbitrary={getRandomArbitrary(-100, 100)}
          />
          <TotalUsage
            className='border-2  w-scard '
            sort='single'
            title={TotalDomainCard.title}
            info={TotalDomainCard.info}
            footer={TotalDomainCard.footer}
            data={TotalDomainCard.data}
            formattingFn={TotalDomainCard.formattingFn}
            formattingUnitFn={TotalDomainCard.formattingUnitFn}
            isDuration={TotalDomainCard.isDuration}
            getRandomArbitrary={getRandomArbitrary(-100, 100)}
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
            className='border-2   w-fcard '
            sort='single'
            title={totalTimeRangeCardInfo.title}
            info={totalTimeRangeCardInfo.info}
            footer={totalTimeRangeCardInfo.footer}
            data={totalTimeRangeCardInfo.data}
            isDuration={totalTimeRangeCardInfo.isDuration}
            getRandomArbitrary={getRandomArbitrary(-100, 100)}
          />
        </div>
        <div className='mt-2'>
          <TotalUsage
            className='border-2  
           w-fcard '
            sort='single'
            title={toTotalDurationCard.title}
            info={toTotalDurationCard.info}
            footer={toTotalDurationCard.footer}
            data={toTotalDurationCard.data}
            formattingFn={toTotalDurationCard.formattingFn}
            formattingUnitFn={toTotalDurationCard.formattingUnitFn}
            decimals={toTotalDurationCard.decimals}
            isDuration={toTotalDurationCard.isDuration}
            getRandomArbitrary={getRandomArbitrary(-100, 100)}
          />
        </div>
        <div className='flex mt-2'>
          <TotalUsage
            className='border-2   w-fcard '
            sort='single'
            title={pageVisitCard.title}
            info={pageVisitCard.info}
            footer={pageVisitCard.footer}
            data={pageVisitCard.data}
            formattingFn={pageVisitCard.formattingFn}
            formattingUnitFn={pageVisitCard.formattingUnitFn}
            isDuration={pageVisitCard.isDuration}
            getRandomArbitrary={getRandomArbitrary(-100, 100)}
          />
        </div>
        <div className='flex mt-2'>
          <TotalUsage
            className='border-2  w-fcard '
            sort='single'
            title={TotalDomainCard.title}
            info={TotalDomainCard.info}
            footer={TotalDomainCard.footer}
            data={TotalDomainCard.data}
            formattingFn={TotalDomainCard.formattingFn}
            formattingUnitFn={TotalDomainCard.formattingUnitFn}
            isDuration={TotalDomainCard.isDuration}
            getRandomArbitrary={getRandomArbitrary(-100, 100)}
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
