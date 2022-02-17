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
import Enter from '../../components/Enter';
import Selection from '../../components/Selection/indext';
import Update from '../../components/Update';
import { generateRecords } from '../../lib/db/mock/utils';
import { TimeRange } from '../../lib/db/models/time';
import { loadRecords } from '../../store/activity/activity';

function Home() {
  const dispatch = useDispatch();
  dispatch(loadRecords());

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
            {/* <div className='flex mt-4 px-8 h-single'>
              <TotalUsage
                className='border-2 w-card mr-4 shrink grow'
                sort='single'
              />
              <TotalUsage
                className='border-2 w-card mr-4 shrink grow'
                sort='single'
              />
              <TotalUsage
                className='border-2 w-card mr-4 shrink grow'
                sort='single'
              />
              <TotalUsage
                className='border-2 w-card mr-4 shrink grow'
                sort='single'
              />
            </div>

            <div className='flex border-2 h-card px-8 mt-4'>
              <TotalUsage className='' sort=' ' />
              <TotalUsage className='' sort=' ' />
            </div>

            <div className='flex border-2 h-card px-8 mt-4'>
              <TotalUsage className='' sort=' ' />
              <TotalUsage className='' sort=' ' />
              <TotalUsage className='' sort=' ' />
            </div> */}
          </AppLayout.First>
        }
        second={<AppLayout.Second></AppLayout.Second>}
        third={<AppLayout.Third></AppLayout.Third>}
      />
    </div>
  );
}

export default Home;
