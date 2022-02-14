import Navbar from './components/Navbar';
import {
  BarChart2,
  Clock,
  Settings,
  HelpCircle,
  Search,
  Bell,
} from 'react-feather';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/home';
import { useEffect } from 'react';
import { loadRecords } from './store/activity/activity';

function App() {
  const search = '';

  useEffect(() => {
    loadRecords(undefined, (error) => {
      console.log('Fail to load records');
    });
  }, [loadRecords]);

  return (
    <>
      <BrowserRouter>
        <div className=' h-full flex'>
          <div className='w-side'>
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

          <Routes>
            <Route>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
