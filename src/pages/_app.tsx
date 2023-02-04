import {AppProps} from 'next/app';
import '@/styles/globals.scss';
import 'swiper/swiper.min.css';
import Footer from '@/components/pageComponents/root/Footer';
import Header from '@/components/pageComponents/root/Header';
import {MDXProvider} from '@mdx-js/react';

//font Inter NextFont
import {Roboto} from '@next/font/google';

const roboto = Roboto({
    variable: '--font-roboto',
    weight: ['400', '700'],
    subsets: ['latin']
});

function Font() {
    return (
        <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
    );
}

export default function MyApp({ Component, pageProps }: AppProps) {

    return (
        <>
            <Font/>
            <MDXProvider>
                <Header/>
                <Component {...pageProps} />
                <Footer/>
            </MDXProvider>
        </>
    );
}