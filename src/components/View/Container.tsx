import React from 'react';

export type ContainerProps = { children: React.ReactNode; className?: string };

function Container(props: ContainerProps) {
  return <div className={props.className}>{props.children}</div>;
}

export default Container;
