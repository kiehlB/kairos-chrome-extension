import { Avatar } from 'evergreen-ui';
import React, { useCallback, useEffect, useState } from 'react';
import { ExternalLink as ExternalLinkIcon } from 'react-feather';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';
import { BASE_SIZE, ICON_SIZE_SM } from '../../lib/styles/constants';
import { TRANSITION_DELAY } from '../DatePicker';
import { Datum } from './tableChart';

const ExternalLink = (props) => {
  return (
    <span style={props.style}>
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
    </span>
  );
};

interface LabelCellProps extends Datum {
  hide: boolean;
  maxValue: number;
  showIcons: boolean;
  labelComponent?: React.ReactNode;
}

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

  const defaultStyles = {
    transition: `width ${TRANSITION_DELAY}ms`,
    width: 0,
  };
  const transitionStyles = {
    entering: { width: 0 },
    entered: { width: `${(value / maxValue) * 100}%` },
    exiting: {},
    exited: {},
    unmounted: {},
  };

  return (
    <Transition in={inProp} timeout={0}>
      {(state: TransitionStatus) => (
        <div
          className='flex'
          style={{ visibility: hide ? 'hidden' : undefined }}
        >
          {showIcons && (
            <Avatar
              className='bar-chart-table__label-icon'
              src={iconSrc}
              hashValue={label}
              name={label}
              size={ICON_SIZE_SM}
            />
          )}
          <div
            className='bar-chart-table__label-container'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className='bar-chart-table__label-content'>
              {labelComponent ? (
                labelComponent
              ) : (
                <span title={label}>{label}</span>
              )}
              {labelSrc && labelSrc.startsWith('http') && (
                <ExternalLink
                  className='bar-chart-table__label-external-link'
                  style={{ visibility: isHovered ? 'unset' : 'hidden' }}
                  url={labelSrc}
                >
                  <ExternalLinkIcon size={BASE_SIZE * 1.5} />
                </ExternalLink>
              )}
            </span>
            <div
              className='bar-chart-table__label-bar'
              style={{
                ...defaultStyles,
                ...transitionStyles[state],
              }}
            ></div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default LabelCell;
