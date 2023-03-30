import {Html, Head, Main, NextScript} from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head lang="en"/>
            <body className="min-h-screen bg-body mb-[56px] overflow-x-hidden md:mb-0 text-black dark:text-white transition-colors">
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}