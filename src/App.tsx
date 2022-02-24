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
import { useEffect } from 'react';
import { loadRecords } from './store/activity/activity';
import { useDispatch, useSelector } from 'react-redux';

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

function App() {
  const search = '';
  const dispatch = useDispatch();
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

  function formatTableDurationLabel(duration: number): any {
    if (duration < 1000) {
      return `${duration} ms`;
    }

    if (duration < 60000) {
      return `${(duration / 1000).toFixed(1)} s`;
    }

    if (duration < 3600000) {
      const minutes = Math.floor(duration / 60000);
      const seconds = Math.round((duration / 1000) % 60);
      return `${minutes} min ${seconds.toString().padStart(2, '0')} s`;
    }

    const hours = Math.floor(duration / 3600000);
    const minutes = Math.round((duration / 60000) % 60);
    return `${hours} h ${minutes.toString().padStart(2, '0')} min`;
  }

  console.log(totalTime);
  console.log(formatTableDurationLabel(2));

  useEffect(() => {
    dispatch(loadRecords());
  }, [
    loadRecords,
    selectedDomain,
    selectedTimeRange,
    totalTime,
    allDomains,
    isLoadingRecords,
  ]);

  return (
    <>
      <div className='h-full flex'>
        <div className='flex  flex-1 '>
          <Navbar
            primaryItems={[
              {
                icon: <BarChart2 size='20' />,
                text: 'Analytics',
                to: { pathname: '/analytics', search },
              },
              {
                icon: <Clock size='20' />,
                text: 'History',
                to: { pathname: '/history', search },
              },
            ]}
            secondaryItems={[
              {
                icon: <Settings size='20' />,
                text: 'Settings',
                to: {
                  pathname: '/settings',
                },
              },
              {
                icon: <HelpCircle size='20' />,
                text: 'Help',
                to: {
                  pathname: '/help',
                },
              },
            ]}
          />
        </div>

        <Switch>
          <Route path='/' component={Home} />
        </Switch>
      </div>
    </>
  );
}

export default App;
