import { cx } from 'class-variance-authority';
import moment from 'moment/moment';
import { twMerge } from 'tailwind-merge';

import type { CxOptions } from 'class-variance-authority';

export function cn(...args: CxOptions[]) {
  return twMerge(cx(args));
}

export const calculatePublishedTimestamp = (timestamp: string, short?: boolean) => {
  if (!timestamp) return 'Draft';

  return short
    ? `${moment.utc(timestamp).fromNow()}`
    : `${moment.utc(timestamp).fromNow()} on ${moment
        .utc(timestamp)
        .format('dddd [the] Do [of] MMMM YYYY [at] h:mm A')}`;
};
