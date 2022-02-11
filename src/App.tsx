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
import DarkModeToggle from 'react-dark-mode-toggle';
import React, { useState } from 'react';
import { Avatar } from 'evergreen-ui';

function App() {
  const search = '';

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
function Home() {
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  return (
    <div className='flex flex-col w-full'>
      <div className='w-full flex h-20 items-center border-b-2 px-16 justify-between'>
        <div className='flex items-center'>
          <DarkModeToggle
            onChange={setIsDarkMode}
            checked={isDarkMode}
            size={80}
          />
          <div className='text-greyTint-m ml-4 text-sm font-extralight'>
            Light
          </div>
        </div>
        <section className='flex  items-center'>
          <div>
            <Search color='#70768C' size='18' />
          </div>
          <div>
            <Bell color='#70768C' size='18' />
          </div>
          <div className='border-r-2   h-10'></div>
          <div>
            <img
              className='inline object-cover w-12 h-12 rounded-full'
              src='./bart.png'
              alt='Profile image'
            />
          </div>
          <section className='flex flex-col'>
            <div className='text-greyTint-m font-medium text-sm'>Provider</div>
            <div className='font-bold text-dark-m'>Woong</div>
          </section>
        </section>
      </div>
      <section className='border-b-2 h-16 flex items-center px-16 justify-between'>
        <div className='text-xl font-bold text-dark-m'>
          Analytics Brower History
        </div>

        <div className='flex'>
          <div>domain picker</div>
          <div>date picker</div>
        </div>
      </section>
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
