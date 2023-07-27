import './globals.scss';

import type {Metadata} from 'next';
import type {ReactNode} from 'react';

import DesktopNavigation from '@/app/(components)/(navigation)/DesktopNavigation';
import MobileNavigation from '@/app/(components)/(navigation)/MobileNavigation';
import Footer from '@/app/(components)/Footer';
import GlobalProviders from '@/app/(components)/GlobalProviders';
import Header from '@/app/(components)/Header';
import ScrollProgressIndicator from '@/app/(components)/ScrollProgressIndicator';
import {Roboto} from 'next/font/google';
import localFont from 'next/font/local';
import {twJoin} from 'tailwind-merge';

import {ThemeToggle} from '@/components/ThemeToggle';

const fontLetsGoDigital = localFont({
    src:      '../fonts/LetsGoDigital.ttf',
    variable: '--font-digital',
    weight:   '400',
    style:    'normal',
    preload:  true
});

const fontCascadiaMono = localFont({
    src:      '../fonts/CascadiaMono.ttf',
    variable: '--font-cascadia-mono',
    weight:   '400',
    style:    'normal',
    preload:  false
});

const fontRoboto = Roboto({
    variable: '--font-roboto',
    weight:   '400',
    subsets:  ['latin'],
    style:    'normal',
    preload:  true
});

const fontVariables = [
    fontLetsGoDigital.variable,
    fontCascadiaMono.variable,
    fontRoboto.variable
];

interface RootLayoutProps {
    children: ReactNode;
}

export const metadata: Metadata = {
    title: 'sandercokart.com'
};

const RootLayout = (props: RootLayoutProps) => {
    return (
        <html suppressHydrationWarning lang="en">
        <body className={twJoin(fontVariables)}>
        <GlobalProviders>
            <div className="sticky top-0 z-50 bg-primary shadow-2xl">
                <Header>
                    <DesktopNavigation className="hidden flex-wrap justify-center gap-x-8 gap-y-1 justify-self-center text-2xl md:flex"/>
                    <ThemeToggle className="mx-2 justify-self-end text-2xl"/>
                    <MobileNavigation className="md:hidden"/>
                </Header>
                <ScrollProgressIndicator/>
            </div>
            {props.children}
            <Footer/>
        </GlobalProviders>
        </body>
        </html>
    );
};

export default RootLayout;