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
  Menu,
} from 'react-feather';
import DayPicker from '../DayPicker';
import { ActivityDateRangePicker } from '../DateRange';
import { DomainPicker } from '../DomainPicker';
import { useWindowSize } from '../../hooks/useWindowSize';

export type HeaderProps = {
  children?: React.ReactNode;
};

function Header({ children }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(() => false);

  const { width } = useWindowSize();

  const widthSection = () => {
    return (
      <section className='flex  items-center justify-end '>
        <div className='flex'>
          <div>
            <DomainPicker />
          </div>
          <div>
            <ActivityDateRangePicker />
          </div>
        </div>

        <div className='border-r-2   h-10 m2xl:hidden'></div>
        <div className='m2xl:hidden'>
          <img
            className='inline object-cover w-12 h-12 rounded-full'
            src='./bart.png'
            alt='Profile image'
          />
        </div>
        <section className='flex flex-col m2xl:hidden'>
          <div className='text-greyTint-m font-medium text-sm'>Provider</div>
          <div className='font-bold text-dark-m m2xl:hidden'>Woong</div>
        </section>
      </section>
    );
  };
  const divSection = () => {
    return (
      <div className='flex items-center justify-end  '>
        <div className='flex mmd:flex-col'>
          <div className='mmd:mb-1'>
            <DomainPicker />
          </div>
          <div>
            <ActivityDateRangePicker />
          </div>
        </div>

        <div className='border-r-2   h-10 m2xl:hidden'></div>
        <div className='m2xl:hidden'>
          <img
            className='inline object-cover w-12 h-12 rounded-full'
            src='./bart.png'
            alt='Profile image'
          />
        </div>
        <section className='flex flex-col m2xl:hidden'>
          <div className='text-greyTint-m font-medium text-sm'>Provider</div>
          <div className='font-bold text-dark-m m2xl:hidden'>Woong</div>
        </section>
      </div>
    );
  };

  return (
    <>
      <div className='border-b-2'>
        <div className='flex h-20 items-center  px-8 justify-between flex-wrap  mmd:px-4'>
          <div className='flex items-center'>
            <div className='text-xl font-bold text-dark-m mr-4'>
              {width > 1340 ? (
                `Analytics Browser History`
              ) : width > 768 ? (
                'History'
              ) : (
                <Menu />
              )}
            </div>
            <DarkModeToggle
              onChange={setIsDarkMode}
              checked={isDarkMode}
              size={80}
              className='mmd:hidden'
            />
          </div>
          {width > 1340 ? widthSection() : divSection()}
        </div>
      </div>
    </>
  );
}

export default Header;
