import Link from 'next/link';

import type { HTMLAttributes, ReactNode } from 'react';

interface NavigationHelpersProps extends HTMLAttributes<HTMLDivElement> {}

export const NavigationHelpers = ({ children }: NavigationHelpersProps) => {
  return (
    <div className="sticky top-[theme(spacing.header-mobile)] z-10 mb-2 flex justify-between gap-4 sm:top-[calc(theme(spacing.header-desktop)_+_theme(spacing.2))]">
      {children}
    </div>
  );
};

interface NavigationHelperNavigationButtonProps {
  href: string;
  children: ReactNode;
}

const NavigationHelperNavigationButton = ({
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

NavigationHelpers.NavigationButton = NavigationHelperNavigationButton;
