import type { ComponentProps } from 'react';

import Link from 'next/link';

const DesktopNavigation = (props: ComponentProps<'nav'>) => (
  <nav aria-label="main" {...props}>
    <Link className="leading-none hover:text-secondary" href="/#discover">
      Discover
    </Link>
    {/*<Link className="hover:text-secondary leading-none" href="/#techstack">{t('nav:tech-stack')}</Link>*/}
    {/*<Link className="hover:text-secondary leading-none" href="/#testimonials">{t('nav:testimonials')}</Link>*/}
    {/*<Link className="hover:text-secondary leading-none" href="/#contact">{t('nav:contact')}</Link>*/}
  </nav>
);

export default DesktopNavigation;
