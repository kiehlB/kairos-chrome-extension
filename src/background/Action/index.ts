import { ChromeAction, ActionTypes } from './Action';

export function InitBrowserActionService(): ActionTypes {
  return new ChromeAction();
}
