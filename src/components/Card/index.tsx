import classNames from 'classnames';
import { ArrowUpRight, ArrowDownRight } from 'react-feather';
import React from 'react';
import { DurationCountUp, CountUp } from '../Count';
import { Icon, Tooltip } from 'evergreen-ui';
import { BASE_SIZE } from '../../lib/styles/constants';

interface CardProps {
  title: string;
  body?: React.ReactNode;
  className?: string;
  description?: string;
  footer?: React.ReactNode;
  info?: string;
  sort?: string;
  extra?: number;
}

const Card = (props: CardProps) => (
  <div className={`${props.sort == 'single' ? 'flex   h-full p-4 ' : ''}`}>
    <div
      className={`${props.sort == 'single' ? '  w-full flex flex-col' : ''}`}
    >
      <div
        className={`${
          props.sort == 'single'
            ? 'flex items-center text-greyTint-m   justify-between'
            : ' flex items-center text-greyTint-m   justify-between px-4 mt-4'
        }`}
      >
        <h2 className='text-greyTint-m font-medium'>{props.title}</h2>
        <div className='ml-4'>
          {props.info && (
            <Tooltip content={props.info}>
              <Icon
                icon='issue'
                size={BASE_SIZE * 1.5}
                style={{ transform: 'rotate(180deg)' }}
              />
            </Tooltip>
          )}
        </div>
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

            <div className='flex mt-3 ml-1'>
              <CountUp
                sort='single'
                start={0}
                end={props.extra}
                decimals={0}
                duration={1000 / 1500}
                preserveValue={true}
                redraw={true}
              />

              {props.sort == 'single' ? (
                <div
                  className={`flex  ${
                    props.extra > 0 ? 'text-grrenTint-m' : 'text-red-700'
                  }`}
                >
                  %
                  {props.extra > 0 ? (
                    <ArrowUpRight size={18} className='ml-0.5' />
                  ) : (
                    <ArrowDownRight size={18} className='ml-0.5   mt-2' />
                  )}
                </div>
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
