import { clsx } from 'clsx';
import moment from 'moment/moment';
import { twMerge } from 'tailwind-merge';

import type { ClassValue } from 'clsx';

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

export const calculatePublishedTimestamp = (timestamp: string, short?: boolean) => {
  if (!timestamp) return 'Draft';

  return short
    ? `${moment.utc(timestamp).fromNow()}`
    : `${moment.utc(timestamp).fromNow()} on ${moment
        .utc(timestamp)
        .format('dddd [the] Do [of] MMMM YYYY [at] h:mm A')}`;
};
