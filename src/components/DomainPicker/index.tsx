import { Avatar, Button, IconButton, Position, SelectMenu } from 'evergreen-ui';
import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Domain } from '../../lib/db/models/activity';
import { BUTTON_MARGIN, ICON_SIZE_MD } from '../../lib/styles/constants';
import { RootState, useAppDispatch } from '../../store';
import { getAllDomains, getIsLoadingRecords } from '../../store/activity/selectors';
import { setSelectedDomain } from '../../store/router/actions';
import { getSearchParamsSelectedDomain } from '../../store/router/selectors';

interface DomainPickerProps {}

const MENU_HEIGHT = 400;
const MENU_WIDTH = 320;

export const DomainPicker = ({}: DomainPickerProps) => {
  const dispatch = useAppDispatch();

  const allDomains = useSelector((state: RootState) => getAllDomains(state));

  const isLoadingRecords = useSelector((state: RootState) => getIsLoadingRecords(state));
  const selectedDomain = useSelector((state: RootState) =>
    getSearchParamsSelectedDomain(state),
  );

  const favIconUrl =
    selectedDomain && allDomains[selectedDomain]
      ? allDomains[selectedDomain].favIconUrl
      : undefined;

  return (
    <span className=" ">
      <SelectMenu
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
          <div className="domain-picker__placeholder">
            <span>No domains found</span>
          </div>
        }>
        <Button
          height={30}
          disabled={isLoadingRecords}
          iconAfter="caret-down"
          marginRight={BUTTON_MARGIN}>
          {selectedDomain ? selectedDomain : 'Select Domain'}
        </Button>
      </SelectMenu>
    </span>
  );
};
