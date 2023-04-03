import type {GetStaticProps} from 'next';

import {motion} from 'framer-motion';
import Head from 'next/head';

import ArticleSwiper from '@/components/ArticleSwiper';
import TouchTipNotification from '@/components/TouchTipNotification';

import axios from '@/functions/axios';

const Meta = () => (
    <Head>
        {/*<meta*/}
        {/*    content="Sander's CodeHouse is a web development company based in the Netherlands. We create websites and web applications for small and medium sized businesses as well as individuals."*/}
        {/*    lang="en" name="description"/>*/}
        {/*<meta*/}
        {/*    content="Sander's CodeHouse is een web development bedrijf gevestigd in Nederland. Wij maken websites en web applicaties voor kleine en middelgrote bedrijven zowel als particulieren."*/}
        {/*    lang="nl" name="description"/>*/}

        {/*<meta content="all" property="audience"/>*/}
        {/*<meta*/}
        {/*    content="sander's codehouse, cheap website, goedkope website, sander, codehouse, nextjs, laravel, react, reactjs, react.js, vue, vuejs, vue.js, javascript, typescript, tailwind, tailwindcss, websites, website, webapp, web-application, web-app, web-applications, web-apps, web-applicatie, nederland, international"*/}
        {/*    property="keywords"/>*/}

        {/*<meta content=" Sander's CodeHouse is a web development company based in the Netherlands. We create websites and web applications for small and medium sized businesses as well as individuals." lang="en" property="og:description"/>*/}
        {/*<meta content="Sander' s CodeHouse is een web development bedrijf gevestigd in Nederland. Wij maken websites en web applicaties voor kleine en middelgrote bedrijven zowel als particulieren." lang=" nl" property=" og:description"/>*/}
        {/*<meta content=" Sander's CodeHouse" property="og:title"/>*/}
        {/*<meta content="website" property="og:type"/>*/}
        {/*<meta content="https://sandercokart.com" property="og:url"/>*/}
        {/*<meta content="/static/images/logo/Logo.png" media="(prefers-color-scheme: dark)" property="og:image"/>*/}
        {/*<meta content="/static/images/logo/Logo-INV.png" media="(prefers-color-scheme: light)" property="og:image"/>*/}

        {/*<meta content="summary_large_image" name="twitter:card"/>*/}
        {/*<meta content="https://sandercokart.com" name="twitter:url"/>*/}
        {/*<meta content="@SanderCokart" name="twitter:site"/>*/}
        {/*<meta content="@SanderCokart" name="twitter:creator"/>*/}
        {/*<meta content="Sander' s CodeHouse" name=" twitter:title"/>*/}
        {/*<meta content=" Sander's CodeHouse is a web development company based in the Netherlands. We create websites and web applications for small and medium sized businesses as well as individuals." lang="en" name="twitter:description"/>*/}
        {/*<meta content="Sander' s CodeHouse is een web development bedrijf gevestigd in Nederland. Wij maken websites en web applicaties voor kleine en middelgrote bedrijven zowel als particulieren." lang=" nl" name=" twitter:description"/>*/}
        {/*<meta content="/static/images/logo/Logo.png" media="(prefers-color-scheme: dark)" name="twitter:image"/>*/}
        {/*<meta content="/static/images/logo/Logo-INV.png" media="(prefers-color-scheme: light)" name="twitter:image"/>*/}


        {/*<meta content="dPDNIWNVFj_4vuPMESyYIF--2WitrHLfPQe2CTcz-Ok" name="google-site-verification"/>*/}
        {/*<meta content="#6d28d9" name="theme-color"/>*/}

        <link href="https://sandercokart.com/nl" hrefLang="nl" rel="alternate"/>
        <link href="https://sandercokart.com" hrefLang="en" rel="alternate"/>
        <link href="https://sandercokart.com" hrefLang="x-default" rel="alternate"/>
        <title>SanderCokart.com - Discover</title>
    </Head>
);

interface HomePageProps {
    general: any;
    courses: any;
    tips: any;
}

const HomePage = ({ general, courses, tips }: HomePageProps) => {
    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: .25,
                staggerDirection: -1
            }
        }
    };

    const item = {
        hidden: { height: 0, transition: { duration: .5 } },
        show: { height: 'auto', transition: { duration: .5 } }
    };
    return (
        <>
            <Meta/>
            <main className="flex flex-col section-no-padding" id="hero">
                <TouchTipNotification/>
                <motion.div
                    animate="show"
                    initial="hidden"
                    variants={container}
                >
                    <motion.div className="relative" variants={item}>
                        <ArticleSwiper articles={general} title="General"/>
                    </motion.div>
                    <motion.div className="relative" variants={item}>
                        <ArticleSwiper articles={courses} title="Courses"/>
                    </motion.div>
                    <motion.div className="relative" variants={item}>
                        <ArticleSwiper articles={tips} title="Tips"/>
                    </motion.div>
                </motion.div>
            </main>
        </>
    );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
    const { data: { articles } } = await axios.simpleGet('/articles');
    return { props: { ...articles } };
};