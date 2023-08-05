import Link from 'next/link';

import type { HTMLAttributes } from 'react';

import { localHomeRoute } from '@/routes/local-routes';

export const Logo = ({ ...restOfProps }: HTMLAttributes<HTMLDivElement>) => (
  <div {...restOfProps}>
    <h1 className="whitespace-nowrap">
      <Link
        className="group flex flex-col text-right text-base drop-shadow-lg"
        href={localHomeRoute('hero')}>
        <span className="block text-base !leading-none transition-colors group-hover:text-secondary group-focus:text-secondary sm:text-3xl">
          sandercokart.com
        </span>
        <span className="block text-xs !leading-none sm:text-xl">Let's Learn...</span>
      </Link>
    </h1>
  </div>
);
