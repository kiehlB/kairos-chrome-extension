import * as d3 from 'd3';
import { Icon, PositionTypes, ArrowRightIcon, Pane } from 'evergreen-ui';
import _ from 'lodash';
import React, { useRef, useState } from 'react';
import { DayPickerProps } from 'react-day-picker';
import { TimeRange } from '../../lib/db/models/time';

import {
  Button as EvergreenButton,
  ButtonProps,
  IconButton as EvergreenIconButton,
  IconButtonProps,
} from 'evergreen-ui';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { useDispatch } from 'react-redux';

import Helmet from 'react-helmet';
import { useAppDispatch } from '../../store';

import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

const solutions = [
  {
    name: 'Insights',
    description: 'Measure actions your users take',
    href: '##',
    icon: IconOne,
  },
  {
    name: 'Automations',
    description: 'Create your own targeted content',
    href: '##',
    icon: IconTwo,
  },
  {
    name: 'Reports',
    description: 'Keep track of your growth',
    href: '##',
    icon: IconThree,
  },
];

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

export const CHART_COLOR_RANGE: [string, string] = [COLOR_GREY_LIGHTER, COLOR_PRIMARY];
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

  return <EvergreenIconButton {...props} fontWeight="600" />;
};

export const Button = props => {
  const appearance = props.appearance;
  const intent = props.intent;

  return <EvergreenButton {...props} fontWeight="600" />;
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
  className?: string;
  defaultEndTime?: number;
  defaultStartTime?: number;
  disabled?: boolean;
  position?: PositionTypes;
  ranges?: { label: string; value: TimeRange }[];
  value?: TimeRange;
  onChange: (range: TimeRange | null) => void;
}

function formatDateString(date: Date) {
  return d3.timeFormat('%b %d, %Y')(date);
}

const DateRangePicker = ({
  className,
  defaultEndTime,
  defaultStartTime,
  disabled,
  position,
  onChange,
  ranges,
  value,
  ...otherProps
}: DateRangePickerProps) => {
  const dispatch = useAppDispatch();

  const buttonRef = useRef() as any;

  let initialFrom: Date | null = null;
  let initialTo: Date | null = null;
  if (value) {
    const start: number | null = value.start || defaultStartTime || null;
    const end: number | null = value.end || defaultEndTime || null;
    initialFrom = start ? new Date(start) : null;
    initialTo = end ? new Date(end) : null;
  }

  const [from, setFrom] = useState<Date | null>(initialFrom);
  const [to, setTo] = useState<Date | null>(initialTo);
  const [isSelectingFirstDay, setIsSelectingFirstDay] = useState(true);

  const handleDayClick = (day: Date) => {
    if (isSelectingFirstDay) {
      setIsSelectingFirstDay(false);
      setFrom(day);
      setTo(day);
    } else {
      setIsSelectingFirstDay(true);
      const nextFrom = from !== null && day > from ? from : day;
      const nextTo = from !== null && day > from ? day : from;
      if (nextFrom && nextTo) {
        (buttonRef as any)?.current?.click();
        onChange({ start: nextFrom.valueOf(), end: nextTo.valueOf() });
        // dispatch(
        //   setSelectedTimeRange({
        //     start: nextFrom.valueOf(),
        //     end: nextTo.valueOf(),
        //   }),
        // );
      }
    }
  };
  const handleDayMouseEnter = (day: Date) => {
    if (!isSelectingFirstDay) {
      setTo(day);
    }
  };
  const handleRangeClick = (range: TimeRange) => {
    if (range) {
      setIsSelectingFirstDay(true);
      onChange(range);
      // dispatch(setSelectedTimeRange(range));
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
  const modifiersStyles = {
    birthday: {
      color: 'white',
      backgroundColor: '#ffc107',
    },
    thursdays: {
      color: '#fff',
      backgroundColor: '#fff',
    },
  };

  return (
    <>
      <div className="top-16 w-full max-w-sm z-[999] mmd:max-w-[280px]">
        <Popover className="relative bg-white dark:rounded hover:bg-slate-100">
          {({ open }) => (
            <>
              <Popover.Button
                ref={buttonRef}
                className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md bg-[#fffff] dark:border-none border px-3 py-1 text-xs  font-normal border-[#C1C4D6] text-[#474d66] hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}>
                {value && initialFrom && initialTo ? (
                  <>
                    {formatDateString(initialFrom)}
                    <ArrowRightIcon
                      size={BASE_SIZE}
                      style={{ marginLeft: BASE_SIZE, marginRight: BASE_SIZE }}
                    />
                    {formatDateString(initialTo)}
                  </>
                ) : (
                  'Select Date Range'
                )}
                <ChevronDownIcon
                  className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-[#474d66] transition duration-150 ease-in-out group-hover:text-opacity-80`}
                  aria-hidden="true"
                />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1">
                <Popover.Panel className="absolute z-10 mt-3 w-[384px] max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid bg-white lg:grid-cols-1">
                      <div className="">
                        {ranges && (
                          <div className=" flex flex-col border-2">
                            {ranges.map(range => (
                              <Button
                                key={range.label}
                                color="rgb(71 85 105)"
                                appearance="minimal"
                                isActive={_.isEqual(range.value, value)}
                                onClick={() => handleRangeClick(range.value)}>
                                {range.label}
                              </Button>
                            ))}
                          </div>
                        )}

                        <Helmet>
                          <style>{`
.Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
background-color: #f0f8ff !important;
color: #4a90e2;
}
.Selectable .DayPicker-Day {
border-radius: 0 !important;
}
.Selectable .DayPicker-Day--start {
border-top-left-radius: 50% !important;
border-bottom-left-radius: 50% !important;
}
.Selectable .DayPicker-Day--end {
border-top-right-radius: 50% !important;
border-bottom-right-radius: 50% !important;
}
`}</style>
                        </Helmet>
                        <DayPicker
                          className="Selectable"
                          {...otherProps}
                          onDayClick={(day: Date) => handleDayClick(day)}
                          modifiers={modifiers}
                          numberOfMonths={1}
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
                              <div className="flex justify-center">
                                <IconButton
                                  appearance="minimal"
                                  disabled={!showPreviousButton}
                                  height={ICON_BUTTON_SIZE}
                                  marginRight={BASE_SIZE}
                                  onClick={() => onPreviousClick()}
                                />
                                <IconButton
                                  appearance="minimal"
                                  disabled={!showNextButton}
                                  height={ICON_BUTTON_SIZE}
                                  onClick={() => onNextClick()}
                                />
                              </div>
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </>
  );
};

function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  );
}

export default React.memo(DateRangePicker);
