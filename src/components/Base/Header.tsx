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
import useClientDimensions from '../../hooks/useClientDimensions';
import useDarkMode from '../../hooks/useDarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { isDarkTrigger } from '../../store/activity/activity';

export type HeaderProps = {
  children?: React.ReactNode;
};

function Header({ children }: HeaderProps) {
  const [colorTheme, setTheme, isDarkMode, setIsDarkMode] = useDarkMode();
  const dispatch = useDispatch();
  const isDarkToggle = useSelector((state: RootState) => state.activity.isDark);

  const [containerRef, { height: containerHeight, width }] =
    useClientDimensions();

  const widthSection = () => {
    return (
      <section className='flex  items-center justify-end  '>
        <div className='flex  '>
          <div>
            <DomainPicker />
          </div>
          <div>
            <ActivityDateRangePicker />
          </div>
        </div>

        <div className='border-r-2   h-10 maxw:hidden'></div>
        <div className='maxw:hidden'>
          <img
            className='inline object-cover w-12 h-12 rounded-full'
            src='./bart.png'
            alt='Profile image'
          />
        </div>
        <section className='flex flex-col maxw:hidden'>
          <div className='text-greyTint-m font-medium text-sm'>Provider</div>
          <div className='font-bold text-dark-m m2xl:hidden'>Woong</div>
        </section>
      </section>
    );
  };
  const divSection = () => {
    return (
      <div className='flex items-center justify-end  '>
        <div className='flex mmd:flex-col  items-end'>
          <div className='mmd:mb-1'>
            <DomainPicker />
          </div>
          <div>
            <ActivityDateRangePicker />
          </div>
        </div>

        <div className='border-r-2   h-10 maxw:hidden'></div>
        <div className='maxw:hidden'>
          <img
            className='inline object-cover w-12 h-12 rounded-full'
            src='./bart.png'
            alt='Profile image'
          />
        </div>
        <section className='flex flex-col  maxw:hidden'>
          <div className='text-greyTint-m font-medium text-sm'>Provider</div>
          <div className='font-bold text-dark-m m2xl:hidden'>Woong</div>
        </section>
      </div>
    );
  };

  return (
    <>
      <div className='border-b-2 ' ref={containerRef}>
        <div className='flex h-20 items-center  px-8 justify-between flex-wrap  mmd:px-4'>
          <div className='flex items-center'>
            <div className='text-xl font-bold text-dark-m mr-4 dark:text-white'>
              {width > 1340 ? (
                `Analytics Browser History`
              ) : width > 768 ? (
                'History'
              ) : (
                <Menu />
              )}
            </div>
            <div
              className='flex items-center'
              onClick={() => {
                setTheme(colorTheme);
                dispatch(isDarkTrigger(true));
              }}
            >
              <DarkModeToggle
                onChange={setIsDarkMode}
                checked={isDarkMode}
                size={80}
                className='mmd:hidden'
              />
            </div>
          </div>
          {width > 1340 ? widthSection() : divSection()}
        </div>
      </div>
    </>
  );
}

export default Header;
