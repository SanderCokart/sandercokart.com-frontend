import type { ReactNode, HTMLAttributes } from 'react';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import { localHomeRoute } from '@/routes/local-routes';

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

const Header = ({ children, className, ...restOfProps }: HeaderProps) => (
  <section
    className={twMerge(
      'mx-auto grid max-w-screen-xl grid-cols-[auto,40px] place-items-center gap-4 overflow-hidden px-4 py-2 font-digital font-bold text-white sm:min-h-[68px] md:grid-cols-[auto,1fr,40px]',
      className
    )}>
    <h1 className="justify-self-start whitespace-nowrap">
      <Link className="group flex flex-col text-base drop-shadow-lg" href={localHomeRoute('hero')}>
        <span className="block text-base !leading-none  group-hover:text-secondary  sm:text-3xl">
          sandercokart.com
        </span>
        <span className="block self-end text-xs !leading-none  sm:text-xl">Let's Learn...</span>
      </Link>
    </h1>
    {children}
  </section>
);
export default Header;
