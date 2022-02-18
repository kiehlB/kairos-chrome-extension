import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import Header from '../../components/Base/Header';
import Card from '../../components/Card';
import Scales from '../../components/Chart';
import Transition from '../../components/Chart';
import Axis from '../../components/Chart';
import { CountUp } from '../../components/Count';
import DataJoin from '../../components/DataJoin';
import DateRangePicker from '../../components/DatePicker';
import { ActivityDateRangePicker } from '../../components/DateRange';
import Enter from '../../components/Enter';
import Selection from '../../components/Selection/indext';
import Update from '../../components/Update';
import { generateRecords } from '../../lib/db/mock/utils';
import { TimeRange } from '../../lib/db/models/time';
import { loadRecords } from '../../store/activity/activity';

function Home() {
  const TotalUsage = ({ className, sort }) => {
    const title = 'Total Usage';
    const info = 'Total time spent on the website';
    const footer = 'blah blah';

    return (
      <div className={className}>
        <Card
          sort={sort}
          title={title}
          info={info}
          footer={footer}
          body={<div>hello</div>}
        />
      </div>
    );
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
              <TotalUsage className='border-2 mr-4 w-mcard ' sort='single' />
              <TotalUsage className='border-2 w-mcard mr-4' sort='single' />
              <TotalUsage className='border-2 w-mcard mr-4' sort='single' />
              <TotalUsage className='border-2 w-mcard' sort='single' />
            </div>
          </AppLayout.First>
        }
        second={
          <AppLayout.Second>
            <div className='flex h-card px-8 mt-4'>
              <TotalUsage className='border-2  mr-4 w-scard' sort='second' />
              <TotalUsage className='border-2 w-scard' sort='second' />
            </div>
          </AppLayout.Second>
        }
        third={
          <AppLayout.Third>
            <div className='flex h-card px-8 mt-4'>
              <TotalUsage className='border-2  mr-4 w-tcard' sort='thrid' />
              <TotalUsage className='border-2  mr-4 w-tcard' sort=' ' />
              <TotalUsage className='border-2  w-tcard' sort=' ' />
            </div>
          </AppLayout.Third>
        }
      />
    </div>
  );
}

export default Home;
