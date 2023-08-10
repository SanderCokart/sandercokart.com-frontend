import './styles/globals.scss';

import { twJoin } from 'tailwind-merge';

import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';

import type { ReactNode } from 'react';
import type { Metadata } from 'next';

import { GlobalProviders, TheFooter, TheHeader } from '@/app/components';

const fontLetsGoDigital = localFont({
  src: '../fonts/LetsGoDigital.ttf',
  variable: '--font-digital',
  weight: '400',
  style: 'normal',
  preload: true
});

const fontCascadiaMono = localFont({
  src: '../fonts/CascadiaMono.ttf',
  variable: '--font-cascadia-mono',
  weight: '400',
  style: 'normal',
  preload: false
});

const fontRoboto = Roboto({
  variable: '--font-roboto',
  weight: '400',
  subsets: ['latin'],
  style: 'normal',
  preload: true
});

const fontVariables = [fontLetsGoDigital.variable, fontCascadiaMono.variable, fontRoboto.variable];

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'sandercokart.com'
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={twJoin(fontVariables)}>
        <GlobalProviders>
          <TheHeader className="sticky top-0 z-50" />
          <main className="min-h-main">{children}</main>
          <TheFooter className="sticky top-full mb-nav-mobile" />
        </GlobalProviders>
      </body>
    </html>
  );
};

export default RootLayout;
