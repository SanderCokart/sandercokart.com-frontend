import {AppProps} from 'next/app';
import '@/styles/globals.scss';
import 'swiper/swiper.min.css';
import Footer from '@/components/pageComponents/root/Footer';
import Header from '@/components/pageComponents/root/Header';
import {MDXProvider} from '@mdx-js/react';

export default function MyApp({ Component, pageProps }: AppProps) {

    return (
        <MDXProvider>
            <Header/>
            <Component {...pageProps} />
            <Footer/>
        </MDXProvider>
    );
}