import Link from 'next/link';

import type { HTMLAttributes } from 'react';

import { routes } from '@/constants/routes';

interface DesktopNavigationProps extends HTMLAttributes<HTMLElement> {}

export const DesktopNavigation = ({ ...restOfProps }: DesktopNavigationProps) => (
  <nav {...restOfProps}>
    {routes.map(({ href, label }) => (
      <Link
        key={href}
        className="leading-none transition-colors hover-focus:text-secondary"
        href={href}>
        {label}
      </Link>
    ))}
    {/*<Link className="hover:text-secondary leading-none" href="/#techstack">{t('nav:tech-stack')}</Link>*/}
    {/*<Link className="hover:text-secondary leading-none" href="/#testimonials">{t('nav:testimonials')}</Link>*/}
    {/*<Link className="hover:text-secondary leading-none" href="/#contact">{t('nav:contact')}</Link>*/}
  </nav>
);
