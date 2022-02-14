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

  const TotalUsage = () => {
    const title = 'Total Usage';
    const info = 'Total time spent on the website';
    const footer = 'blah blah';

    return (
      <Card title={title} info={info} footer={footer} body={<div>hello</div>} />
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
            <div className='w-full border-2 flex px-16 justify-between '>
              <TotalUsage />
              <TotalUsage />
              <TotalUsage />
              <TotalUsage />
            </div>
          </AppLayout.First>
        }
        second={<AppLayout.Second></AppLayout.Second>}
        third={<AppLayout.Third></AppLayout.Third>}
      />
    </div>
  );
}

export default Home;
