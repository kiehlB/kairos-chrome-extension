import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
export interface NavbarItemProps extends Pick<NavLinkProps, 'to'> {
  icon: React.ReactNode;
  text: string;
}

export const NavbarItem = (props: NavbarItemProps) => {
  return (
    <NavLink
      className='flex px-4 pt-6 items-center text-greyTint-m font-medium'
      to={props.to}
    >
      {props.icon}
      <span className='ml-2'>{props.text}</span>
    </NavLink>
  );
};
