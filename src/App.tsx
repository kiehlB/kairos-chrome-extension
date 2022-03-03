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
import History from './page/history';

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

  const selectedDomain = useSelector((state: RootState) =>
    getSearchParamsSelectedDomain(state)
  );

  const selectedTimeRange = useSelector((state: RootState) =>
    getSearchParamsSelectedTimeRange(state)
  );

  const totalTime = useSelector((state: RootState) =>
    getTotalDurationByDate(state)
  );

  const allDomains = useSelector((state: RootState) => getAllDomains(state));

  const isLoadingRecords = useSelector((state: RootState) =>
    getIsLoadingRecords(state)
  );

  useEffect(() => {
    dispatch(loadRecords());

    if (location.pathname == '/analytics' || location.pathname == '/') {
      setIsSelect({
        one: true,
        two: false,
        three: false,
        four: false,
      });
    } else if (location.pathname == '/history') {
      setIsSelect({
        one: false,
        two: true,
        three: false,
        four: false,
      });
    } else if (location.pathname == '/settings') {
      setIsSelect({
        one: false,
        two: false,
        three: true,
        four: false,
      });
    } else if (location.pathname == '/help') {
      setIsSelect({
        one: false,
        two: false,
        three: false,
        four: true,
      });
    }
  }, [
    loadRecords,
    selectedDomain,
    selectedTimeRange,
    totalTime,
    allDomains,
    isLoadingRecords,
    location.pathname,
  ]);

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
        <Route path='/analytics'>
          <Home />
        </Route>
        <Route path='/history'>
          <History />
        </Route>
        <Redirect exact to='/analytics' />
      </Switch>
    </div>
  );
}

export default App;
