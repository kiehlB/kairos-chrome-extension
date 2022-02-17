import { Avatar, Button, IconButton, Position, SelectMenu } from 'evergreen-ui';
import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Domain } from '../../lib/db/models/activity';
import { BUTTON_MARGIN, ICON_SIZE_MD } from '../../lib/styles/constants';
import {
  getAllDomains,
  getIsLoadingRecords,
} from '../../store/activity/selectors';
import { setSelectedDomain } from '../../store/router/actions';
import { getSearchParamsSelectedDomain } from '../../store/router/selectors';
import { RootState } from '../../store/store';

interface DomainPickerProps {}

const MENU_HEIGHT = 400;
const MENU_WIDTH = 320;

export const DomainPicker = ({}: DomainPickerProps) => {
  const dispatch = useDispatch();

  const allDomains = useSelector((state: RootState) => getAllDomains(state));

  const isLoadingRecords = useSelector((state: RootState) =>
    getIsLoadingRecords(state)
  );
  const selectedDomain = useSelector((state: RootState) =>
    getSearchParamsSelectedDomain(state)
  );

  const favIconUrl =
    selectedDomain && allDomains[selectedDomain]
      ? allDomains[selectedDomain].favIconUrl
      : undefined;

  return (
    <span className='domain-picker'>
      {selectedDomain && (
        <span className='domain-picker__label'>
          {favIconUrl && (
            <Avatar
              className='domain-picker__icon'
              key={selectedDomain}
              hashValue={selectedDomain}
              name={selectedDomain}
              src={favIconUrl}
              size={ICON_SIZE_MD}
            />
          )}
          <span className='domain-picker__text'>{selectedDomain}</span>
        </span>
      )}
      <SelectMenu
        height={MENU_HEIGHT}
        width={MENU_WIDTH}
        closeOnSelect={true}
        hasTitle={false}
        isMultiSelect={false}
        onDeselect={() => dispatch(setSelectedDomain(null))}
        onSelect={(item) => dispatch(setSelectedDomain(item.value as string))}
        options={Object.keys(allDomains)
          .sort()
          .map((domain) => ({ label: domain, value: domain }))}
        position={Position.BOTTOM_RIGHT}
        selected={selectedDomain === null ? undefined : [selectedDomain]}
        statelessProps={{
          className: 'domain-picker__popover',
        }}
        emptyView={
          <div className='domain-picker__placeholder'>
            <span>No domains found</span>
          </div>
        }
      >
        {selectedDomain ? (
          <IconButton disabled={isLoadingRecords} icon='caret-down' />
        ) : (
          <Button
            disabled={isLoadingRecords}
            iconAfter='caret-down'
            marginRight={BUTTON_MARGIN}
          >
            Select Domain
          </Button>
        )}
      </SelectMenu>
    </span>
  );
};
