import {
  Avatar,
  Button,
  IconButton,
  Position,
  SelectMenu,
  CaretDownIcon,
} from 'evergreen-ui';
import React, { useState, Fragment } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Domain } from '../../lib/db/models/activity';
import { BUTTON_MARGIN, ICON_SIZE_MD } from '../../lib/styles/constants';
import { RootState, useAppDispatch } from '../../store';
import { getAllDomains, getIsLoadingRecords } from '../../store/activity/selectors';
import { setSelectedDomain } from '../../store/router/actions';
import { getSearchParamsSelectedDomain } from '../../store/router/selectors';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface DomainPickerProps {}

const MENU_HEIGHT = 400;
const MENU_WIDTH = 320;

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
];

const DomainPicker = ({}: DomainPickerProps) => {
  const dispatch = useAppDispatch();
  const allDomains = useSelector((state: RootState) => getAllDomains(state));
  const [selected, setSelected] = useState(
    Object.keys(allDomains)
      .sort()
      .map(domain => ({ domain }))[0],
  );

  const isLoadingRecords = useSelector((state: RootState) => getIsLoadingRecords(state));
  const selectedDomain = useSelector((state: RootState) =>
    getSearchParamsSelectedDomain(state),
  );

  const favIconUrl =
    selectedDomain && allDomains[selectedDomain]
      ? allDomains[selectedDomain].favIconUrl
      : undefined;

  const DomainArray = Object.keys(allDomains)
    .sort()
    .map(domain => ({ domain })) as any;

  return (
    <span className="z-[999]">
      <div className="top-16 ">
        <Listbox
          value={selected}
          onChange={item => {
            dispatch(setSelectedDomain(item.domain) as any);
            setSelected(item);
          }}>
          <div className="relative max-w-[320px] min-w-[120px] mmd:max-w-[150px]">
            <Listbox.Button className="w-full max-w-[320px] relative cursor-default rounded-md bg-white px-3 py-1 hover:bg-slate-100 text-left  border-[#C1C4D6] border text-[#474d66] focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm text-sm  font-normal">
              <span className="block truncate pr-4">{selected?.domain}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Listbox.Options className="z-[999] max-w-[400px] mmd:w-[320px] absolute right-0  mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {DomainArray.map(e => (
                  <Listbox.Option
                    key={e.domain}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={e}>
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}>
                          {e.domain}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      {/* <SelectMenu
        height={MENU_HEIGHT}
        width={MENU_WIDTH}
        closeOnSelect={true}
        hasTitle={false}
        isMultiSelect={false}
        onDeselect={() => dispatch(setSelectedDomain(null))}
        onSelect={item => dispatch(setSelectedDomain(item.value as string))}
        options={Object.keys(allDomains)
          .sort()
          .map(domain => ({ label: domain, value: domain }))}
        position={Position.BOTTOM_RIGHT}
        selected={selectedDomain === null ? undefined : [selectedDomain]}
        statelessProps={{
          className: '',
        }}
        emptyView={
          <div>
            <span>No domains found</span>
          </div>
        }>
        <Button
          className=""
          height={30}
          disabled={isLoadingRecords}
          iconAfter={CaretDownIcon}
          marginRight={BUTTON_MARGIN}>
          {selectedDomain ? selectedDomain : 'Select Domain'}
        </Button>
      </SelectMenu> */}
    </span>
  );
};

export default React.memo(DomainPicker);
