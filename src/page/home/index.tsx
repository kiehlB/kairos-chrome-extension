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

import {
  getRatioToTotalDuration,
  getSelectedDomainRatioToTotalDuration,
  getSelectedDomainTotalDuration,
} from '../../store/activity/selectors';
import { RootState } from '../../store/store';
import SecondCard from './secondCard';

import SingleCard from './singleCard';
import ThridCard from './thirdCard';

function Home() {
  return (
    <div className='w-full'>
      <AppLayout.MainNav>
        <Header />
      </AppLayout.MainNav>
      <AppLayout
        first={<AppLayout.First>{<SingleCard />}</AppLayout.First>}
        second={<AppLayout.Second>{<SecondCard />}</AppLayout.Second>}
        // third={<AppLayout.Third>{<ThridCard />}</AppLayout.Third>}
      />
    </div>
  );
}

export default Home;
