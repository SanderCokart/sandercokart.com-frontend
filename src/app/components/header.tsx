import Link from 'next/link';

import type { ReactNode } from 'react';

import { localHomeRoute } from '@/routes/local-routes';

import ScrollProgressIndicator from '@/app/(components)/ScrollProgressIndicator';

export const Header = ({ children }: { children: ReactNode }) => (
  <header className="sticky top-0 z-10 flex h-16 bg-primary">
    <div className="container flex justify-between gap-8">
      <TitleLogo />
      {children}
    </div>
    <ScrollProgressIndicator />
  </header>
);

const TitleLogo = () => (
  <h1 className="grid w-fit place-items-center whitespace-nowrap font-digital">
    <Link className="group/logo flex flex-col drop-shadow-lg" href={`${localHomeRoute()}#hero`}>
      <span className="block text-xl !leading-none transition-colors  group-hover/logo:text-secondary sm:text-3xl">
        sandercokart.com
      </span>
      <span className="block self-end text-lg !leading-none sm:text-xl">Let's Learn...</span>
    </Link>
  </h1>
);
