import './globals.scss';

import { IoPlanetSharp } from 'react-icons/io5';

import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';
import Link from 'next/link';

import type { ReactNode } from 'react';
import type { Metadata } from 'next';

import { cn } from '@/functions/shared/utils';

import { localHomeRoute } from '@/routes/local-routes';

import Footer from '@/app/(components)/Footer';
import GlobalProviders from '@/app/(components)/GlobalProviders';
import { Header, NavButton } from '@/app/components';

const fontLetsGoDigital = localFont({
  src: '../fonts/LetsGoDigital.ttf',
  variable: '--font-digital',
  weight: '400',
  style: 'normal',
  preload: true,
});

const fontCascadiaMono = localFont({
  src: '../fonts/CascadiaMono.ttf',
  variable: '--font-cascadia-mono',
  weight: '400',
  style: 'normal',
  preload: false,
});

const fontRoboto = Roboto({
  variable: '--font-roboto',
  weight: '400',
  subsets: ['latin'],
  style: 'normal',
  preload: true,
});

const fontVariables = [fontLetsGoDigital.variable, fontCascadiaMono.variable, fontRoboto.variable];

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'sandercokart.com',
};

const links = [
  {
    href: `${localHomeRoute()}`,
    text: 'Discover',
    icon: <IoPlanetSharp />,
  },
];

const MobileNavigation = () => (
  <nav aria-label="mobile navigation" className="fixed inset-x-0 bottom-0 bg-primary sm:hidden">
    <ul className="flex h-14">
      {links.map(link => (
        <li key={link.href} className="flex-grow">
          <NavButton href={link.href} icon={link.icon} text={link.text} />
        </li>
      ))}
    </ul>
  </nav>
);

const DesktopNavigation = () => (
  <nav aria-label="desktop navigation" className="hidden sm:block">
    <ul className="flex h-full flex-wrap items-center gap-x-8">
      {links.map(link => (
        <li key={link.href} className="grow">
          <Link
            className="group/link relative font-digital text-2xl leading-none transition-colors hover:text-secondary"
            href={link.href}>
            <div className="absolute inset-0 grid place-items-center">
              <div className="scale-0 opacity-0 transition-[opacity,transform] md:group-hover/link:scale-[200%] md:group-hover/link:opacity-25">
                {link.icon}
              </div>
            </div>
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

const RootLayout = (props: RootLayoutProps) => {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={cn('font-sans', 'bg-background text-foreground', fontVariables)}>
        <GlobalProviders>
          <div className="flex min-h-dvh flex-col">
            <Header>
              <DesktopNavigation />
            </Header>
            {/*The flex grow ensures the children are 100% of the remaining view height with header present.*/}
            <div className="grow">{props.children}</div>
          </div>
          {/*footer is always below the fold because of the flexbox above, also creates margin at the bottom to accommodate the mobile navigation*/}
          <div className="mb-14 md:mb-0">
            <Footer />
          </div>

          <MobileNavigation />
        </GlobalProviders>
      </body>
    </html>
  );
};

export default RootLayout;
