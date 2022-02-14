import classNames from 'classnames';

import React from 'react';

interface CardProps {
  title: string;
  body?: React.ReactNode;
  className?: string;
  description?: string;
  footer?: React.ReactNode;
  info?: string;
}

const Card = (props: CardProps) => (
  <div className='border-2 w-card h-40 mt-12'>
    <div>
      <div>
        <h2>{props.title}</h2>
        {props.info && <></>}
      </div>
      {props.description && (
        <div>
          <p>{props.description}</p>
        </div>
      )}
    </div>
    {props.body && <div>{props.body}</div>}
    {props.footer && <div>{props.footer}</div>}
  </div>
);

export default Card;
