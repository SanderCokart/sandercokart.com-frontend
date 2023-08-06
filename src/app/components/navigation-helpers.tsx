'use client';

import Link from 'next/link';

import type { HTMLAttributes, ReactNode } from 'react';

import { scrollToTop } from '@/functions/shared/utils';

interface NavigationHelpersProps extends HTMLAttributes<HTMLDivElement> {}

export const NavigationHelpers = ({ children }: NavigationHelpersProps) => {
  return (
    <div className="sticky top-[theme(spacing.header-mobile)] z-10 mb-2 flex justify-between sm:top-[calc(theme(spacing.header-desktop)_+_theme(spacing.2))]">
      {children}
      <BackToTopButton />
    </div>
  );
};

interface NavigationHelperNavigationButtonProps {
  href: string;
  children: ReactNode;
}

export const NavigationHelperNavigationButton = ({
  href,
  children
}: NavigationHelperNavigationButtonProps) => {
  return (
    <Link
      className="label flex items-center gap-2 whitespace-nowrap font-digital text-xl transition-colors hover-focus:bg-secondary-active md:text-2xl"
      href={href}
      type="button">
      {children}
    </Link>
  );
};

const BackToTopButton = () => {
  return (
    <button
      className="label flex items-center gap-2 whitespace-nowrap font-digital text-xl transition-colors hover-focus:bg-secondary-active md:text-2xl"
      type="button"
      onClick={scrollToTop}>
      <span>Back top top</span>
    </button>
  );
};
