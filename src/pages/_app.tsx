import {AppProps} from 'next/app';
import '@/styles/globals.scss';
import 'swiper/swiper.min.css';
import Footer from '@/components/pageComponents/root/Footer';
import Header from '@/components/pageComponents/root/Header';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header/>
            <Component {...pageProps} />
            <Footer/>
        </>
    );
}
