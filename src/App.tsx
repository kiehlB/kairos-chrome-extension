import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { loadRecords } from './store/activity/activity';
import { RootState, useAppDispatch } from './store';
import { selectors } from './store/router';
import Navbar from './components/Navbar';
import { BarChart2, Clock, Settings } from 'react-feather';
import Home from './page/home';
import HistoryView from './page/history';
import { SettingsView } from './page/settings';
import DomainPicker from './components/DomainPicker';
import { getSearchParamsSelectedTimeRange } from './store/router/selectors';
import SingleCard from './page/home/singleCard';
import Header from './components/Base/Header';
import ActivityDateRangePicker from './components/DateRange';

function App() {
  const dispatch = useAppDispatch();
  const search = '';

  const selectedTimeRange = useSelector(getSearchParamsSelectedTimeRange);

  useEffect(() => {
    dispatch(loadRecords() as any);
  }, [loadRecords, selectedTimeRange]);

  return (
    <div className="flex h-full">
      <Navbar
        primaryItems={[
          {
            icon: <BarChart2 size="20" />,
            text: 'Analytics',
            to: { pathname: '/analytics', search },
          },
          {
            icon: <Clock size="20" />,
            text: 'History',
            to: { pathname: '/history', search },
          },
        ]}
        secondaryItems={[
          {
            icon: <Settings size="20" />,
            text: 'Settings',
            to: {
              pathname: '/settings',
            },
          },
        ]}
      />
      <div className="flex h-full w-full flex-1 overflow-auto min-w-[320px]">
        <Switch>
          <Route exact path="/analytics">
            <Home />
          </Route>
          <Route path="/history">
            <HistoryView />
          </Route>
          <Route path="/settings">
            <SettingsView />
          </Route>

          <Redirect to="/analytics" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
