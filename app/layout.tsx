import {PropsWithChildren} from 'react';
import {Footer} from './footer';
import {Header} from './header';

export default function Layout({ children }: PropsWithChildren) {
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