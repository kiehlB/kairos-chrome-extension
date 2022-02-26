import classNames from 'classnames';
import { ArrowUpRight, ArrowDownRight } from 'react-feather';
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
  <div className={`${props.sort == 'single' ? 'flex   h-full p-4 ' : ' '}`}>
    <div
      className={`${props.sort == 'single' ? '  w-full flex flex-col' : ''}`}
    >
      <div>
        <h2 className='text-greyTint-m font-medium'>{props.title}</h2>
        {/* {props.info && <>{props.info}</>} */}
      </div>
      {props.description && (
        <div>
          <p>{props.description}</p>
        </div>
      )}

      {props.body && (
        <div className={`${props.sort == 'single' ? 'mt-6' : ''}`}>
          <div
            className={`${
              props.sort == 'single'
                ? 'flex items-center  m2xl:justify-center'
                : ' '
            }`}
          >
            <div className='truncate whitespace-nowrap overflow-hidden'>
              {props.body}
            </div>
            <div
              className={`${
                props.sort == 'single'
                  ? 'flex items-center ml-1.5 text-grrenTint-m font-bold mt-3'
                  : ' '
              }`}
            >
              {props.sort == 'single' ? (
                <>
                  145% <ArrowUpRight size={18} className='ml-0.5' />
                </>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      )}

      {props.footer && (
        <div className='text-white-s font-medium m2xl:flex justify-end'>
          {props.footer}
        </div>
      )}
    </div>
  </div>
);

export default Card;
