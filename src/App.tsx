import { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { loadRecords } from './store/activity/activity';
import { RootState } from './store';
import { selectors } from './store/router';
import Navbar from './components/Navbar';
import { BarChart2, Clock, Settings } from 'react-feather';
import Home from './page/home';
import { HistoryView } from './page/history';
import { SettingsView } from './page/settings';

function App() {
  const dispatch = useDispatch();
  const search = '';

  const selectedTimeRange = useSelector((state: RootState) =>
    selectors.getSearchParamsSelectedTimeRange(state),
  );

  useEffect(() => {
    dispatch(loadRecords());
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
          <Route exact path="/analytics" render={() => <Home />} />
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
