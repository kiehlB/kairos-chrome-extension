import Dexie from 'dexie';
import ChromeIcon from '../../../assets/chrome-icon.png';
import { RawActivity } from '../models/activity';

import {
  DomainTableRecord,
  TitleTableRecord,
  ActivityTableRecord,
} from '../types';

const generateId: () => number = (function () {
  const idGenerator = (function* getActivityIdGenerator() {
    let index = 1;
    while (true) yield index++;
  })();

  return function (): number {
    return idGenerator.next().value;
  };
})();

function randomRangeValue([min, max]): number {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomArrayElement<T>(arr: T[]): T {
  const len = arr.length;
  if (len === 0) {
    throw new Error('Array is empty');
  }
  return arr[Math.floor(Math.random() * len) % len];
}

export function exportTableRecords<T>(
  table: Dexie.Table<T, number>
): Promise<T[]> {
  return table.toCollection().toArray();
}

export function getActivityData(
  url: URL,
  iconUrl: string
): { domain: string; path: string; favIconUrl: string } {
  if (url.origin !== 'null') {
    new Error(`[db] ${url} is not a valid URL.`);
  }

  let domain = `${url.protocol}//${url.hostname}`;
  let path = `${url.pathname}${url.hash}${url.search}`;
  let favIconUrl = iconUrl;
  switch (url.protocol) {
    case 'about:':
    case 'brave:':
    case 'chrome:':
    case 'edge:':
    case 'opera:':
      domain = `${url.protocol}//`;
      path = `${url.hostname}${url.pathname}${url.hash}${url.search}`;
      favIconUrl = ChromeIcon;
      break;
    case 'chrome-extension:':
    case 'extension:':
    case 'moz-extension:':
      domain = url.origin;
      break;
    case 'http:':
    case 'https:':
      domain = `https://${url.hostname}`;
      break;
    default:
      new Error(`[db] ${url} is not a valid URL. (unrecognized protocol)`);
      break;
  }

  return { domain, path, favIconUrl };
}

export function createUrl(activity: ActivityTableRecord): string {
  return `${activity.domain}${activity.path}`;
}

export function generateRecords({
  url: rawUrl,
  favIconUrl: iconUrl,
  title,
  startTime,
  endTime,
}: RawActivity): {
  activity: ActivityTableRecord;
  domain: DomainTableRecord;
  title: TitleTableRecord;
} {
  const urlObject = new URL(rawUrl);
  const { domain, path, favIconUrl } = getActivityData(urlObject, iconUrl);

  const activity = { domain, path, startTime, endTime };

  const a = randomArrayElement(activity as any);

  const url = createUrl(activity);

  return {
    activity,
    domain: { id: domain, favIconUrl },
    title: { id: url, title },
  };
}
