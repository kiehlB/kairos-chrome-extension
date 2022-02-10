import React from 'react';

export type ContainerProps = { children: React.ReactNode };

function Container(props: ContainerProps) {
  return <div>{props.children}</div>;
}

export default Container;
