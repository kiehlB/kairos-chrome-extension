import classNames from 'classnames';
import { IssueIcon, Tooltip } from 'evergreen-ui';
import React from 'react';
import { BASE_SIZE } from '../../lib/styles/constants';

import './styles.scss';

interface CardProps {
  title: string;
  body?: React.ReactNode;
  className?: string;
  description?: string;
  footer?: React.ReactNode;
  info?: string;
}

const Card = (props: CardProps) => (
  <div>
    <div>
      <div>
        <h2>{props.title}</h2>
        {props.info && (
          <Tooltip
            content={props.info}
            statelessProps={{ className: 'card__header--tooltip' }}
          >
            <IssueIcon
              size={BASE_SIZE * 1.5}
              style={{ transform: 'rotate(180deg)' }}
            />
          </Tooltip>
        )}
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
