import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en" data-theme="dark">
            <Head />
            <body className="body bg-white text-black dark:bg-black dark:text-white mb-[50px] sm:mb-0 bg-gradient-to-b from-accent/20 via-black to-accent/20 via-black">
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}