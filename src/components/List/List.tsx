import React from 'react';

export type ListProps = {
  children?: React.ReactNode;
};

function List({ children }: ListProps) {
  return <div>{children}</div>;
}

export default List;
