import {PropsWithChildren} from 'react';
import {Footer} from './footer';
import {Header} from './header';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <html lang="en" data-theme="">
        <head>
            <title>SanderCokart.com</title>
        </head>
        <body className="h-[calc(100vh-50px)] min-h-[calc(100vh-50px)] bg-white text-black dark:bg-black dark:text-white">
        <Header/>
        {children}
        <Footer/>
        </body>
        </html>
    );
}