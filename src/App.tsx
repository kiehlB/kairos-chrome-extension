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
import { useSelector } from 'react-redux';

import { getAllDomains } from './store/activity/selectors';
import { RootState } from './store/store';

function App() {
  const search = '';

  // useEffect(() => {
  //   loadRecords(undefined, (error) => {
  //     console.log('Fail to load records');
  //   });
  // }, []);
  console.log('hfdas');

  // console.log(getSavePost);

  return (
    <>
      <div className='h-full flex'>
        <div className='w-side m2xl:w-20'>
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
