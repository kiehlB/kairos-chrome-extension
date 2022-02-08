import { Tab } from '../Tabs/tabs';
import Events from '../types';

export type ActionFn = (tab: Tab) => void;

export type ActionOnClicked = Events<ActionFn>;

export interface ActionTypes {
  onClicked: ActionOnClicked;
}

export interface ChromeActionAPI {
  onClicked: any;
}

// Manifest V2 only
export class ChromeAction implements ActionTypes {
  private Action: ChromeActionAPI;
  public onClicked: ActionOnClicked;

  constructor(Action: ChromeActionAPI = chrome.action) {
    this.Action = Action;
    this.onClicked = {
      addListener(callback: ActionFn): void {
        Action.onClicked.addListener(callback);
      },
      hasListener(callback: ActionFn): boolean {
        return Action.onClicked.hasListener(callback);
      },
      removeListener(callback: ActionFn): void {
        Action.onClicked.removeListener(callback);
      },
    };
  }
}
