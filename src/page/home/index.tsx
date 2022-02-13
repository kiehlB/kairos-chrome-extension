import AppLayout from '../../components/AppLayout';
import Header from '../../components/Base/Header';
import Card from '../../components/Card';
import Scales from '../../components/Chart';
import Transition from '../../components/Chart';
import Axis from '../../components/Chart';
import { CountUp } from '../../components/Count';
import DataJoin from '../../components/DataJoin';
import Enter from '../../components/Enter';
import Selection from '../../components/Selection/indext';
import Update from '../../components/Update';
import { generateRecords } from '../../lib/db/mock/utils';
import { formatDateString, getDayCount } from '../../utils/dateUtils';

function Home() {
  const Component = CountUp;
  const { activity, domain } = generateRecords();

  console.log(getDayCount(1644752738533, 1644860738200));
  return (
    <div className='w-full'>
      <AppLayout.MainNav>
        <Header />
      </AppLayout.MainNav>
      <AppLayout
        first={
          <AppLayout.First>
            <div className='w-full flex border-2 px-16 flex-col'>
              <Axis />
              {/* <DataJoin />
              <Enter />
              <Scales />
              <Selection />
              <Update />
              <Transition /> */}
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
