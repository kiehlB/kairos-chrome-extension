import { Avatar } from 'evergreen-ui';
import React, { useCallback, useEffect, useState } from 'react';
import { ExternalLink as ExternalLinkIcon } from 'react-feather';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';
import { BASE_SIZE, ICON_SIZE_SM } from '../../lib/styles/constants';
import { TRANSITION_DELAY } from '../DatePicker';

export type Datum = {
  label: string;
  value: number;
  labelSrc?: string;
  iconSrc?: string;
};

interface LabelCellProps extends Datum {
  hide: boolean;
  maxValue: number;
  showIcons: boolean;
  labelComponent?: React.ReactNode;
}

const ExternalLink = (props) => {
  return (
    <div style={props.style}>
      {props.iconSrc && (
        <img
          className='external-link__icon'
          alt={props.iconAlt}
          src={props.iconSrc}
        />
      )}
      <a href={props.url} title={props.title || props.url} target='none'>
        {props.children || props.url}
      </a>
    </div>
  );
};

const LabelCell = ({
  hide,
  iconSrc,
  label,
  labelComponent,
  labelSrc,
  maxValue,
  showIcons,
  value,
}: LabelCellProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [inProp, setInProp] = useState(false);
  useEffect(() => {
    setInProp(true);
  }, []);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const barWidth = (value / maxValue) * 500;

  return (
    <div>
      <Transition in={inProp} timeout={0}>
        <div
          className='flex items-center ml-4'
          style={{ visibility: hide ? 'hidden' : undefined }}
        >
          {showIcons && (
            <Avatar
              className='mr-2'
              src={iconSrc}
              hashValue={label}
              name={label}
              size={ICON_SIZE_SM}
            />
          )}
          <div
            className='flex items-center truncate whitespace-nowrap overflow-hidden'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className=' dark:text-neutral-400  text-sm text-neutral-800 '>
              {labelComponent ? (
                labelComponent
              ) : (
                <div title={label} className=''>
                  {label}
                </div>
              )}
            </div>
            {labelSrc && labelSrc.startsWith('http') && (
              <ExternalLink
                style={{ visibility: isHovered ? 'unset' : 'hidden' }}
                url={labelSrc}
              >
                <ExternalLinkIcon size={BASE_SIZE * 1.5} />
              </ExternalLink>
            )}
          </div>
        </div>
      </Transition>
      <div className='ml-10'>
        <div
          style={{ border: '1px solid #6CD2B0', width: `${barWidth}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LabelCell;
