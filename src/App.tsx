import Navbar from './components/Navbar';
import { BarChart2, Clock, Settings, HelpCircle } from 'react-feather';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DarkModeToggle from 'react-dark-mode-toggle';
import React, { useState } from 'react';

function App() {
  const search = '';
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  return (
    <>
      <BrowserRouter>
        {/* <DarkModeToggle
          onChange={setIsDarkMode}
          checked={isDarkMode}
          size={80}
        /> */}
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
                pathname: '/settings',
              },
            },
          ]}
        />
        <Routes>
          <Route>{/* <Route index element={<Home />} /> */}</Route>
        </Routes>
      </BrowserRouter>
      ,
    </>
  );
}

export default App;
function Home() {
  return <h2>Home!</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
