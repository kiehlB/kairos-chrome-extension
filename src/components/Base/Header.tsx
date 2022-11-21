import { DarkModeToggle } from 'react-dark-mode-toggle-2';

import React, { useEffect, useState } from 'react';
import { Avatar } from 'evergreen-ui';
import { Menu, Sun, Moon } from 'react-feather';
import DayPicker from '../DayPicker';

import useDarkMode from '../../hooks/useDarkMode';
import { useDispatch, useSelector } from 'react-redux';

import { isDarkTrigger } from '../../store/activity/activity';
import { Position, SideSheet, Paragraph, Button } from 'evergreen-ui';
import { Link } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../store';
import DomainPicker from '../DomainPicker';
import { getIsInitialized } from '../../store/activity/selectors';
import ActivityDateRangePicker from '../DateRange';

export type HeaderProps = {
  children?: React.ReactNode;
  title: string;
  subTitle?: string;
};

function Header({ children, title, subTitle }: HeaderProps) {
  const [colorTheme, setTheme] = useDarkMode();
  const dispatch = useAppDispatch();
  const [isShown, setIsShown] = useState(false);
  const isDarkToggle = useSelector((state: RootState) => state.activity.isDark);
  const isInitialized = useSelector(getIsInitialized);

  let widthSection = null;
  widthSection = (
    <section className="flex first-letter:items-center justify-end items-center">
      <div className="flex items-center">
        {subTitle == 'Analytics' ? (
          <>
            {isInitialized && (
              <>
                <div>
                  <DomainPicker />
                </div>
                <div>
                  <ActivityDateRangePicker />
                </div>
              </>
            )}
          </>
        ) : (
          ''
        )}
        {subTitle == 'History' ? (
          <>
            {isInitialized && (
              <>
                <div>
                  <ActivityDateRangePicker />
                </div>
              </>
            )}
          </>
        ) : (
          ''
        )}
        {subTitle == 'Settings' ? <></> : ''}
      </div>

      {subTitle == 'Analytics' ? (
        <>
          <div className="border h-10 maxw:hidden ml-8"></div>
        </>
      ) : (
        ''
      )}

      <div className="maxw:hidden ml-8">
        <img
          className="inline object-cover w-12 h-12 rounded-full "
          src="./bart.png"
          alt="Profile image"
        />
      </div>
      <section className="flex flex-col maxw:hidden ml-4">
        <div className="text-greyTint-m font-medium text-sm">Provider</div>
        <div className="font-bold text-dark-m m2xl:hidden dark:text-white">Woong</div>
      </section>
    </section>
  );

  let divSection = null;
  divSection = (
    <div className="flex items-center justify-end  ">
      <div className="flex mmd:flex-col  items-end">
        <div className="mmd:mb-1">
          <DomainPicker />
        </div>
        <div>
          <ActivityDateRangePicker />
        </div>
      </div>

      <div className="bordr h-10 maxw:hidden"></div>
      <div className="maxw:hidden">
        <img
          className="inline object-cover w-12 h-12 rounded-full"
          src="./bart.png"
          alt="Profile image"
        />
      </div>
      <section className="flex flex-col  maxw:hidden">
        <div className="text-greyTint-m font-medium text-sm">Provider</div>
        <div className="font-bold text-dark-m m2xl:hidden">Woong</div>
      </section>
    </div>
  );

  return (
    <>
      <div className="border-b bg-white dark:bg-[#121212]">
        <div className="flex h-20 items-center px-8 justify-between flex-wrap  mmd:px-4">
          <div className="flex items-center">
            <div className="text-xl font-bold text-dark-m mr-4 dark:text-white ">
              <div className="m2xl:hidden">{title}</div>
              {/* <div className="mmd:hidden xxl:hidden">{subTitle}</div> */}

              <div className="xxl:hidden">
                <SideSheet
                  // @ts-ignore
                  position={Position.LEFT}
                  isShown={isShown}
                  width="15rem"
                  onCloseComplete={() => setIsShown(false)}>
                  <Link to="/Analytics">
                    <Paragraph margin={20}>Analytics</Paragraph>
                  </Link>
                  <Link to="/History">
                    <Paragraph margin={20}>History</Paragraph>
                  </Link>
                  <Link to="/Settings">
                    <Paragraph margin={20}>Settings</Paragraph>
                  </Link>

                  <div
                    className="w-12 ml-5 h-6"
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
              className="flex items-center"
              onClick={() => {
                dispatch(isDarkTrigger());
                setTheme(colorTheme);
              }}>
              <DarkModeToggle
                onChange={() => {}}
                isDarkMode={isDarkToggle}
                size={80}
                className="mmd:hidden"
              />
            </div>
          </div>
          <div>{widthSection}</div>
          {/* <div className="xxl:hidden">{divSection}</div> */}
        </div>
      </div>
    </>
  );
}

export default Header;
