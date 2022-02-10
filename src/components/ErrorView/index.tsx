import classNames from 'classnames';
import React from 'react';
import { AlertCircle } from 'react-feather';

interface ErrorViewProps {
  message: string;
  className?: string;
}

const ErrorView = (props: ErrorViewProps) => {
  return (
    <div>
      <div>
        <AlertCircle />
        <span>{props.message}</span>
      </div>
    </div>
  );
};

export default ErrorView;
