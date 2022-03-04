import Navbar from './components/Navbar';
import {
  BarChart2,
  Clock,
  Settings,
  HelpCircle,
  Search,
  Bell,
} from 'react-feather';
import { Switch, Route, Redirect, Router } from 'react-router';
import Home from './page/home';
import { useEffect, useRef, useState } from 'react';
import { loadRecords } from './store/activity/activity';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import {
  getAllDomains,
  getIsLoadingRecords,
  getTotalDurationByDate,
} from './store/activity/selectors';
import { RootState } from './store/store';
import {
  getSearchParamsSelectedDomain,
  getSearchParamsSelectedTimeRange,
} from './store/router/selectors';
import { selectors } from './store/router';
import { HistoryView } from './page/history';

function App() {
  const search = '';
  const dispatch = useDispatch();

  let location = useLocation();
  const [isSelect, setIsSelect] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });

  // const selectedDomain = useSelector((state: RootState) =>
  //   getSearchParamsSelectedDomain(state)
  // );

  const selectedTimeRange = useSelector((state: RootState) =>
    selectors.getSearchParamsSelectedTimeRange(state)
  );

  // const totalTime = useSelector((state: RootState) =>
  //   getTotalDurationByDate(state)
  // );

  // const allDomains = useSelector((state: RootState) => getAllDomains(state));

  // const isLoadingRecords = useSelector((state: RootState) =>
  //   getIsLoadingRecords(state)
  // );

  useEffect(() => {
    dispatch(loadRecords());
  }, [
    loadRecords,
    // selectedDomain,
    selectedTimeRange,
    // totalTime,
    // allDomains,
    // isLoadingRecords,
  ]);

  console.log('das');

  return (
    <div className='flex   transition-all bg-white w-full '>
      <div className='flex  flex-1'>
        <Navbar
          primaryItems={[
            {
              icon: <BarChart2 size='20' />,
              text: 'Analytics',
              to: { pathname: '/analytics', search },
              isSelect: isSelect.one,
            },
            {
              icon: <Clock size='20' />,
              text: 'History',
              to: { pathname: '/history', search },
              isSelect: isSelect.two,
            },
          ]}
          secondaryItems={[
            {
              icon: <Settings size='20' />,
              text: 'Settings',
              to: {
                pathname: '/settings',
              },
              isSelect: isSelect.three,
            },
            {
              icon: <HelpCircle size='20' />,
              text: 'Help',
              to: {
                pathname: '/help',
              },
              isSelect: isSelect.four,
            },
          ]}
        />
      </div>

      <Switch>
        <Route exact path='/analytics' render={() => <Home />} />
        <Route path='/history'>
          <HistoryView />
        </Route>
        <Redirect to='/analytics' />
      </Switch>
    </div>
  );
}

export default App;
