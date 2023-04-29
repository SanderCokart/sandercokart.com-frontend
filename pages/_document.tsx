import {Html, Head, Main, NextScript} from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head lang="en"/>
            <body className="min-h-screen overflow-x-hidden text-black transition-colors bg-bodyLight dark:bg-bodyDark mb-[56px] dark:text-white md:mb-0">
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}