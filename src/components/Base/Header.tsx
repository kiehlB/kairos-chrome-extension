import { DarkModeToggle } from 'react-dark-mode-toggle-2';

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
  Sun,
  Moon,
} from 'react-feather';
import DayPicker from '../DayPicker';
import { ActivityDateRangePicker } from '../DateRange';
import { DomainPicker } from '../DomainPicker';

import useDarkMode from '../../hooks/useDarkMode';
import { useDispatch, useSelector } from 'react-redux';

import { isDarkTrigger } from '../../store/activity/activity';
import { Position, SideSheet, Paragraph, Button } from 'evergreen-ui';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';

export type HeaderProps = {
  children?: React.ReactNode;
  title: string;
  subTitle?: string;
};

function Header({ children, title, subTitle }: HeaderProps) {
  const [colorTheme, setTheme] = useDarkMode();
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useState(false);
  const isDarkToggle = useSelector((state: RootState) => state.activity.isDark);

  const widthSection = () => {
    return (
      <section className='flex  items-center justify-end  '>
        <div className='flex  '>
          {subTitle == 'Analytics' ? (
            <>
              <div>
                <DomainPicker />
              </div>
              <div>
                <ActivityDateRangePicker />
              </div>
            </>
          ) : (
            ''
          )}
          {subTitle == 'History' ? (
            <>
              <div>
                <ActivityDateRangePicker />
              </div>
            </>
          ) : (
            ''
          )}
          {subTitle == 'Settings' ? <></> : ''}
        </div>

        {subTitle == 'Analytics' ? (
          <>
            <div className='border h-10 maxw:hidden'></div>
          </>
        ) : (
          ''
        )}

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

        <div className='bordr h-10 maxw:hidden'></div>
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
      <div className='border-b bg-white dark:bg-gray-900'>
        <div className='flex h-20 items-center  px-8 justify-between flex-wrap  mmd:px-4'>
          <div className='flex items-center'>
            <div className='text-xl font-bold text-dark-m mr-4 dark:text-white '>
              <div className='m2xl:hidden'>{title}</div>
              <div className='mmd:hidden xxl:hidden'>{subTitle}</div>

              <div className='si:hidden'>
                <SideSheet
                  // @ts-ignore
                  position={Position.LEFT}
                  isShown={isShown}
                  width='15rem'
                  onCloseComplete={() => setIsShown(false)}>
                  <Link to='/Analytics'>
                    <Paragraph margin={20}>Analytics</Paragraph>
                  </Link>
                  <Link to='/History'>
                    <Paragraph margin={20}>History</Paragraph>
                  </Link>
                  <Link to='/Settings'>
                    <Paragraph margin={20}>Settings</Paragraph>
                  </Link>

                  <div
                    className='w-12 ml-5 h-6'
                    onClick={() => {
                      setTheme(colorTheme);
                      dispatch(isDarkTrigger());
                    }}>
                    <DarkModeToggle
                      onChange={() => {}}
                      isDarkMode={isDarkToggle}
                      size={40}
                    />
                  </div>
                </SideSheet>
                <div onClick={() => setIsShown(true)}>
                  <Menu />
                </div>
              </div>
            </div>
            <div
              className='flex items-center'
              onClick={() => {
                dispatch(isDarkTrigger());
                setTheme(colorTheme);
              }}>
              <DarkModeToggle
                onChange={() => {}}
                isDarkMode={isDarkToggle}
                size={80}
                className='mmd:hidden'
              />
            </div>
          </div>
          <div className='m2xl:hidden '>{widthSection()}</div>
          <div className='xxl:hidden'>{divSection()}</div>
        </div>
      </div>
    </>
  );
}

export default Header;
