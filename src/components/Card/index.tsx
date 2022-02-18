import classNames from 'classnames';

import React from 'react';

interface CardProps {
  title: string;
  body?: React.ReactNode;
  className?: string;
  description?: string;
  footer?: React.ReactNode;
  info?: string;
  sort?: string;
}

const Card = (props: CardProps) => (
  <div className={`${props.sort == 'single' ? 'flex   h-full p-4' : ' '}`}>
    <div
      className={`${props.sort == 'single' ? '  w-full flex flex-col' : ''}`}
    >
      <div>
        <h2>{props.title}</h2>
        {/* {props.info && <>{props.info}</>} */}
      </div>
      {props.description && (
        <div>
          <p>{props.description}</p>
        </div>
      )}

      {props.body && (
        <div className={`${props.sort == 'single' ? 'mt-6' : ''}`}>
          {props.body}
        </div>
      )}
      {props.footer && <div>{props.footer}</div>}
    </div>
  </div>
);

export default Card;
