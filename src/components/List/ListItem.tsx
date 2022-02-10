import React from 'react';

export type ListItemProps = {
  items: string;
  color?: string;
};

function ListItem(props: ListItemProps) {
  return <div {...props}>{props.items}</div>;
}

export default ListItem;
