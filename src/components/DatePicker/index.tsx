import classNames from 'classnames';
import * as d3 from 'd3';
import { Icon, Popover, PositionTypes } from 'evergreen-ui';
import _ from 'lodash';
import React, { useState } from 'react';
import { DayPickerProps } from 'react-day-picker';
import { TimeRange } from '../../lib/db/models/time';

import {
  Button as EvergreenButton,
  ButtonProps,
  IconButton as EvergreenIconButton,
  IconButtonProps,
} from 'evergreen-ui';
import DayPicker from '../DayPicker';

export const BASE_SIZE = 8;

export const COLOR_PRIMARY = '#379af7';

export const COLOR_BLACK = '#244360';
export const COLOR_GREY_DARKER = '#62778c';
export const COLOR_GREY_DARK = '#8da2b5';
export const COLOR_GREY = '#c0c9d1';
export const COLOR_GREY_LIGHT = '#f6f6f6';
export const COLOR_GREY_LIGHTER = '#f6f6f6';
export const COLOR_WHITE = '#fff';

export const COLOR_DANGER = '#ec4c47';
export const COLOR_SUCCESS = '#47b881';
export const COLOR_WARNING = '#d9822b';

export const CHART_COLOR_RANGE: [string, string] = [
  COLOR_GREY_LIGHTER,
  COLOR_PRIMARY,
];
export const CHART_TRANSITION_DELAY = 500; // ms

export const TRANSITION_DELAY = 1000; // ms

export const BUTTON_SIZE = BASE_SIZE * 4;
export const BUTTON_MARGIN = BASE_SIZE * 1.5;

export const ICON_BUTTON_SIZE = BASE_SIZE * 3;

export const ICON_SIZE_SM = BASE_SIZE * 2;
export const ICON_SIZE_MD = BASE_SIZE * 2.5;
export const ICON_SIZE_LG = BASE_SIZE * 3;
export const ICON_SIZE_XL = BASE_SIZE * 4;

export const SPINNER_SIZE = BASE_SIZE * 4;

export const IconButton = (props: IconButtonProps) => {
  const appearance = props.appearance;
  const intent = props.intent;

  return (
    <EvergreenIconButton
      {...props}
      className={classNames('button', props.className, {
        [`button--appearance-${appearance}`]: appearance !== undefined,
        [`button--intent-${intent}`]: intent !== undefined,
      })}
      fontWeight='600'
    />
  );
};

export const Button = (props) => {
  const appearance = props.appearance;
  const intent = props.intent;

  return (
    <EvergreenButton
      {...props}
      className={classNames('button', props.className, {
        [`button--appearance-${appearance}`]: appearance !== undefined,
        [`button--intent-${intent}`]: intent !== undefined,
      })}
      fontWeight='600'
    />
  );
};

interface HandleClickOptions {
  closePopover: () => void;
}

interface DateRangePickerProps
  extends Pick<
    DayPickerProps,
    | 'disabledDays'
    | 'firstDayOfWeek'
    | 'fixedWeeks'
    | 'fromMonth'
    | 'month'
    | 'onBlur'
    | 'showWeekDays'
    | 'showWeekNumbers'
    | 'tabIndex'
    | 'toMonth'
  > {
  onChange: (range: TimeRange | null) => void;

  className?: string;
  defaultEndTime?: number;
  defaultStartTime?: number;
  disabled?: boolean;
  position?: PositionTypes;
  ranges?: { label: string; value: TimeRange }[];
  value?: TimeRange;
}

/**
 * Formats a timestamp to a date string that conforms to `MMM DD, YYYY` format
 *
 * @param timestamp - timestamp in milliseconds
 * @returns formatted date string
 */
function formatDateString(date: Date) {
  return d3.timeFormat('%b %d, %Y')(date);
}

const DateRangePicker = ({
  className,
  defaultEndTime,
  defaultStartTime,
  disabled,
  onChange,
  position,
  ranges,
  value,
  ...otherProps
}: DateRangePickerProps) => {
  let initialFrom: Date | null = null;
  let initialTo: Date | null = null;
  if (value) {
    const start: number | null = value.start || defaultStartTime || null;
    const end: number | null = value.end || defaultEndTime || null;
    initialFrom = start ? new Date(start) : null;
    initialTo = end ? new Date(end) : null;
  }

  console.log(value);

  const [from, setFrom] = useState<Date | null>(initialFrom);
  const [to, setTo] = useState<Date | null>(initialTo);
  const [isSelectingFirstDay, setIsSelectingFirstDay] = useState(true);

  const handleDayClick = (day: Date, options: HandleClickOptions) => {
    if (isSelectingFirstDay) {
      setIsSelectingFirstDay(false);
      setFrom(day);
      setTo(day);
    } else {
      setIsSelectingFirstDay(true);
      const nextFrom = from !== null && day > from ? from : day;
      const nextTo = from !== null && day > from ? day : from;
      if (nextFrom && nextTo) {
        options.closePopover();
        onChange({ start: nextFrom.valueOf(), end: nextTo.valueOf() });
      }
    }
  };
  const handleDayMouseEnter = (day: Date) => {
    if (!isSelectingFirstDay) {
      setTo(day);
    }
  };
  const handleRangeClick = (range: TimeRange, options: HandleClickOptions) => {
    if (range) {
      setIsSelectingFirstDay(true);
      options.closePopover();
      onChange(range);
    }
  };

  // Computed values
  const start = isSelectingFirstDay ? initialFrom : from;
  const end = isSelectingFirstDay ? initialTo : to;
  let modifiers: { start: Date; end: Date };
  let selectedDays: [Date, { from: Date; to: Date }];
  if (start !== null && end !== null) {
    modifiers = start < end ? { start, end } : { start: end, end: start };
    selectedDays = [start, { from: start, to: end }];
  }

  console.log(start);
  console.log(end);

  return (
    <Popover
      isShown={disabled ? false : undefined}
      position={position}
      content={({ close }) => {
        const handleClickOptions = {
          closePopover: close,
        };
        return (
          <div className='date-range-picker__content'>
            {ranges && (
              <div className='date-range-picker__ranges'>
                {ranges.map((range) => (
                  <Button
                    key={range.label}
                    appearance='minimal'
                    isActive={_.isEqual(range.value, value)}
                    onClick={() =>
                      handleRangeClick(range.value, handleClickOptions)
                    }
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            )}
            <DayPicker
              {...otherProps}
              modifiers={modifiers}
              numberOfMonths={2}
              onDayClick={(day: Date) =>
                handleDayClick(day, handleClickOptions)
              }
              onDayMouseEnter={handleDayMouseEnter}
              pagedNavigation
              selectedDays={selectedDays}
              navbarElement={({
                onPreviousClick,
                onNextClick,
                showPreviousButton,
                showNextButton,
              }) => {
                return (
                  <div className='date-range-picker__nav-bar'>
                    {/* <IconButton
                      appearance='minimal'
                      disabled={!showPreviousButton}
                      icon='chevron-left'
                      height={ICON_BUTTON_SIZE}
                      marginRight={BASE_SIZE}
                      onClick={() => onPreviousClick()}
                    />
                    <IconButton
                      appearance='minimal'
                      disabled={!showNextButton}
                      icon='chevron-right'
                      height={ICON_BUTTON_SIZE}
                      onClick={() => onNextClick()}
                    /> */}
                  </div>
                );
              }}
            />
          </div>
        );
      }}
    >
      <Button
        className={classNames('date-range-picker', className)}
        disabled={disabled}
        height={BUTTON_SIZE}
        iconBefore='timeline-events'
      >
        {value && initialFrom && initialTo ? (
          <>
            {formatDateString(initialFrom)}
            <div>hello</div>
            {formatDateString(initialTo)}
          </>
        ) : (
          'Select Date Range'
        )}
      </Button>
    </Popover>
  );
};

export default DateRangePicker;
