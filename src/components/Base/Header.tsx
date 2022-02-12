import DarkModeToggle from 'react-dark-mode-toggle';
import React, { useEffect, useState } from 'react';
import { Avatar } from 'evergreen-ui';
import {
  BarChart2,
  Clock,
  Settings,
  HelpCircle,
  Search,
  Bell,
} from 'react-feather';

export type HeaderProps = {
  children?: React.ReactNode;
};

function Header({ children }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  return (
    <div className='flex flex-col w-full h-36 '>
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

export default Header;
