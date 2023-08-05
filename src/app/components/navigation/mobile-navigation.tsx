import Link from 'next/link';

import type { HTMLAttributes } from 'react';

import { routes } from '@/constants/routes';
import { cn } from '@/functions/shared/utils';

interface MobileNavigationProps extends HTMLAttributes<HTMLElement> {}

export const MobileNavigation = ({ className, ...restOfProps }: MobileNavigationProps) => (
  <nav
    className={cn('fixed bottom-0 left-0 flex w-full bg-primary font-bold text-white', className)}
    {...restOfProps}>
    {routes.map(({ href, label, Icon }) => (
      <Link
        key={href}
        className="flex w-full flex-col items-center gap-1 py-2 text-center transition-colors hover:text-secondary focus:text-secondary"
        href={href}>
        <Icon />
        <span className="text-xs">{label}</span>
      </Link>
    ))}
  </nav>
);
