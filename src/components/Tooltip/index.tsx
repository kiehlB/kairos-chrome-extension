import classNames from 'classnames';
import React from 'react';

interface TooltipProps {
  body: React.ReactNode;
  className?: string;
  header?: string;
  headerImageAltText?: string;
  headerImageUrl?: string;
}

const Tooltip = (props: TooltipProps) => {
  return (
    <div>
      <div>
        {props.headerImageUrl && (
          <img alt={props.headerImageAltText} src={props.headerImageUrl} />
        )}
        <strong>{props.header}</strong>
      </div>
      <div>{props.body}</div>
    </div>
  );
};

export default Tooltip;
