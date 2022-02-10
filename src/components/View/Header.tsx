import React from 'react';

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header = (props: HeaderProps) => <div>{props.children}</div>;

export default Header;
