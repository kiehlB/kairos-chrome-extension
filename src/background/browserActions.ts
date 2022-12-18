import { InitBrowserActionService } from "../extensions/Action";
import { InitExtensionService } from "../extensions/Extension";
import { InitTabsService } from "../extensions/Tabs";
import { Tab } from "../extensions/Tabs/tabs";

 
 
export function  Background(): void {
  // Initialize all dependencies
  const browserActionService = InitBrowserActionService();
  const extensionService = InitExtensionService();
  const tabsService = InitTabsService();

  if (browserActionService && extensionService && tabsService) {
    browserActionService.onClicked.addListener((tab: Tab) => {
      const extensionUrl = new URL(extensionService.getURL("index.html"));
      const tabUrl = new URL(tab.url || "");

      if (tab.id && tabUrl.origin !== extensionUrl.origin) {
        tabsService.update(tab.id, { active: true, url: extensionUrl.href });
      }
    });
  }
}