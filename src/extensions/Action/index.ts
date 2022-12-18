import { ActionTypes, ChromeAction } from "./action";

 
 
export function InitBrowserActionService(): ActionTypes {
  return new ChromeAction()
}