import _ from 'lodash';
import { composeWithDevTools } from 'remote-redux-devtools';
import { RootState } from '.';
import { Activity } from '../lib/db/models/activity';
import { ActivityState } from './activity/activity';

type SanitizedActivityAction = {
  type: string;
  payload: Activity[] | string;
};

interface SanitizedActivityState extends Omit<ActivityState, 'records'> {
  records: Activity[] | string;
}
interface RootSanitizedState extends Omit<any, 'activity'> {
  activity: SanitizedActivityState;
}

export default composeWithDevTools({
  port: 8098,
  realtime: true,
  actionSanitizer: (action: any) => {
    const sanitizedAction: any = _.cloneDeep(action);
    if (
      typeof sanitizedAction !== 'function' &&
      sanitizedAction.type === 'getRecordsSuccess' &&
      sanitizedAction.payload &&
      Array.isArray(sanitizedAction.payload)
    ) {
      const recordCount = sanitizedAction.payload.length;
      const recordsPlaceholder = `<<${recordCount}_RECORDS>>`;
      sanitizedAction.payload = recordsPlaceholder;
    }

    return sanitizedAction;
  },
  stateSanitizer: (state: RootState) => {
    const sanitizedState: RootSanitizedState = _.cloneDeep(state);
    if (state.activity && state.activity.records) {
      const recordCount = state.activity.records.length;
      const recordsPlaceholder = `<<${recordCount}_RECORDS>>`;
      sanitizedState.activity.records = recordsPlaceholder;
    }

    return sanitizedState;
  },
});
