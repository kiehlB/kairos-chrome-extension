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
  <div className={`${props.sort == 'single' ? ' ' : ' '}`}>
    <div className={`${props.sort == 'single' ? '' : ''}`}>
      <div>
        <h2>{props.title}</h2>
        {props.info && <></>}
      </div>
      {props.description && (
        <div>
          <p>{props.description}</p>
        </div>
      )}

      <div className=''>
        {props.body && <div>{props.body}</div>}
        {props.footer && <div>{props.footer}</div>}
      </div>
    </div>
  </div>
);

export default Card;
