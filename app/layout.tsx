import {Footer} from './footer';
import {Header} from './header';
import type {ReactNode} from 'react';
import '@/styles/globals.scss';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" data-theme="dark">
        <head>
            <title>SanderCokart.com</title>
        </head>
        <body className="body bg-white text-black dark:bg-black dark:text-white mb-[50px] sm:mb-0">
        <Header/>
        {children}
        <Footer/>
        </body>
        </html>
    );
}