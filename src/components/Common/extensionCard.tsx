import React from 'react';
import { NavbarItemProps } from '../Navbar/NavbarItem';

export type ExtensionCardProps = {
  icon;
  text: string;
  to;
};

function ExtensionCard({ icon, text, to }: ExtensionCardProps) {
  return (
    <>
      <div className='border-2 w-side-1 p-4 flex  flex-col rounded-md  bg-slate-50 dark:bg-slate-800  dark:border-slate-900'>
        <div className='py-2 dark:text-slate-100 '> {icon}</div>
        <span className='text-greyTint-m font-medium text-sm dark:text-slate-100'>
          {text}
        </span>
        <div className='py-4'>
          <div className='border  flex dark:border'></div>
        </div>
        <div className='flex justify-between items-center text-grrenTint-m  font-medium'>
          <span>{to.pathname}</span>
          <div>{to.icon}</div>
        </div>
      </div>
    </>
  );
}

export default ExtensionCard;
