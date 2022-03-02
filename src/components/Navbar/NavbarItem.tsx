import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export interface NavbarItemProps extends Pick<NavLinkProps, 'to'> {
  icon: React.ReactNode;
  text: string;
  isSelect: boolean;
}

export const NavbarItem = (props: NavbarItemProps) => {
  console.log(props);
  return (
    <NavLink
      className={`w-full flex px-4 pt-6 items-center ${
        props.isSelect ? 'text-slate-900' : 'text-greyTint-m'
      }   font-medium m2xl:px-0 m2xl:pt-0 m2xl:flex m2xl:p-8`}
      to={props.to}
    >
      <div
        className={`w-10/12 rounded-lg   px-2 py-2 ${
          props.isSelect ? 'bg-slate-50 dark:bg-gray-700 dark:text-white' : ''
        }  hover:text-slate-900    dark:hover:text-white  flex items-center m2xl:w-full m2xl:flex-col m2xl:justify-center m2xl:items-center`}
      >
        <div>{props.icon}</div>
        <span className='ml-2 m2xl:ml-0 '>{props.text}</span>
      </div>
    </NavLink>
  );
};
