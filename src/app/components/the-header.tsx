import type { HTMLAttributes } from 'react';

import { ThemeToggle } from '@/components/ThemeToggle';

import { Logo, ScrollProgressIndicator } from '@/app/components';
import { DesktopNavigation, MobileNavigation } from '@/app/components/navigation';

import { cn } from '@/functions/shared/utils';

interface TheHeaderProps extends HTMLAttributes<HTMLElement> {}

export const TheHeader = ({ className, ...restOfProps }: TheHeaderProps) => (
  <header
    className={cn(
      'h-header-mobile overflow-hidden bg-background font-digital sm:h-header-desktop',
      className
    )}
    {...restOfProps}>
    <div className="container grid h-full grid-cols-[240px,1fr,40px] items-center">
      <Logo className="justify-self-start" />
      <MobileNavigation aria-label="mobile" className="md:hidden" />
      <DesktopNavigation
        aria-label="main"
        className="hidden grow flex-wrap justify-center gap-x-8 gap-y-1 justify-self-center text-2xl md:flex"
      />
      <ThemeToggle className="mx-2 justify-self-end text-2xl" />
      <ScrollProgressIndicator />
    </div>
  </header>
);
