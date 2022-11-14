import React from 'react';

export type ListItemProps = {
  label: string;
  value?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
};

const ListItem = (props: ListItemProps) => {
  let content;
  if (props.isLoading) {
    content = <LoadingPlaceholder text={props.label} />;
  } else if (props.value !== undefined && props.value !== null) {
    content = <span className="">{props.value}</span>;
  } else {
    content = <span> </span>;
  }

  return (
    <div className={props.className}>
      <div className="text-base text-dark-m dark:text-[#D9D9D9]">{props.label}</div>
      <div className="list-item__value dark:text-[#D9D9D9]">{content}</div>
    </div>
  );
};

export default ListItem;

const LoadingPlaceholder = props => {
  return <div style={{ width: `${props.text.length}ch` }}></div>;
};
