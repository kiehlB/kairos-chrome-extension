import React from 'react';

export type FooterProps = {
  children?: React.ReactNode;
};

function Footer({ children }: FooterProps) {
  return (
    <div className='text-sm'>
      <div className='text-dark-m font-bold'>Kairos Admin Dashboard</div>
      <div>© 2022 All rights reserved</div>
    </div>
  );
}

export default Footer;
