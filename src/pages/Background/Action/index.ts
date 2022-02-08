import { ChromeAction, ActionTypes } from './Action';

export function InitActionService(): ActionTypes {
  return new ChromeAction();
}
