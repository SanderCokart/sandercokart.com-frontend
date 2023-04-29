import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/css/effect-coverflow';
import '@/styles/globals.scss';
import '@code-hike/mdx/dist/index.css';
import type {AppProps} from 'next/app';
import type {PropsWithChildren} from 'react';

import Axios from 'axios';
import {ThemeProvider} from 'next-themes';
import {Roboto} from 'next/font/google';
import localFont from 'next/font/local';
import Head from 'next/head';
import {ModalProvider} from 'react-simple-modal-provider';
import {SWRConfig} from 'swr';

import {Lightbox} from '@/components/modals';

import axios from '@/functions/axios';

import RootLayout from '@/layouts/RootLayout';

const fontLetsGoDigital = localFont({
    src: '../public/fonts/LetsGoDigital.ttf',
    variable: '--font-digital',
    weight: '400',
    style: 'normal',
    preload: true
});

const fontCascadiaMono = localFont({
    src: '../public/fonts/CascadiaMono.ttf',
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

Axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
Axios.defaults.withCredentials = true;

const fetcher = (url: string, config: object) => axios.simpleGet(url, config).then(({ data }) => {
    return data;
});

function Providers({ children }: PropsWithChildren) {
    return (
        <SWRConfig value={{ fetcher }}>
            <ThemeProvider attribute="class">
                <ModalProvider value={[Lightbox]}>
                    {children}
                </ModalProvider>
            </ThemeProvider>
        </SWRConfig>
    );
}

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className={`${fontLetsGoDigital.variable} ${fontRoboto.variable} ${fontCascadiaMono.variable} font-sans`}>
            <Providers>
                <RootLayout>
                    <Head>
                        <meta content="width=device-width, initial-scale=1, minimum-scale=1" name="viewport"/>
                        <link href="/static/images/logo/Logo.png" rel="icon" type="image/png"/>
                    </Head>
                    <Component {...pageProps} />
                </RootLayout>
            </Providers>
        </div>
    );
}

export default MyApp;