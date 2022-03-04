import React from 'react';
import { Spinner } from 'evergreen-ui';
import { SPINNER_SIZE } from '../../lib/styles/constants';

export type BodyProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
};

function Body(props: BodyProps) {
  return (
    <div className={props.className}>
      {props.children}
      {props.isLoading && (
        <div className='view__body'>
          <Spinner size={SPINNER_SIZE} />
        </div>
      )}
    </div>
  );
}

export default Body;
