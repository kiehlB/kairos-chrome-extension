import { InitBrowserActionService } from './Action';
import { InitExtensionService } from './Extension';
import { InitTabsService } from './Tabs';
import { Tab } from './Tabs/tabs';

export function Background(): void {
  // const browserActionService = InitBrowserActionService()
  const extensionService = InitExtensionService();
  // const tabsService = InitTabsService()

  if (extensionService) {
    chrome.action.onClicked.addListener(function (activeTab) {
      var newURL = 'index.html';
      chrome.tabs.create({ url: newURL });
    });
  }
}
