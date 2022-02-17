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
import DayPicker from '../DayPicker';
import { ActivityDateRangePicker } from '../DateRange';
import { DomainPicker } from '../DomainPicker';

export type HeaderProps = {
  children?: React.ReactNode;
};

function Header({ children }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  return (
    <>
      <div className='border-b-2'>
        <div className='flex h-20 items-center  px-8 justify-between flex-wrap '>
          <div className='flex items-center'>
            <div className='text-xl font-bold text-dark-m mr-4'>
              Analytics Brower History
            </div>
            <DarkModeToggle
              onChange={setIsDarkMode}
              checked={isDarkMode}
              size={80}
            />
          </div>
          <section className='flex  items-center'>
            <div>
              <DomainPicker />
            </div>
            <div>
              <ActivityDateRangePicker />
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
              <div className='text-greyTint-m font-medium text-sm'>
                Provider
              </div>
              <div className='font-bold text-dark-m'>Woong</div>
            </section>
          </section>
        </div>
      </div>
    </>
  );
}

export default Header;
