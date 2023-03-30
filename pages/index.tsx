import Head from 'next/head';

import Line from '@/components/Line';
import Hero from '@/components/pages/root/Hero';

const HomePage = () => {

    return (
        <>
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
            <div className="relative z-0">
                <Hero/>

                {/*<Line/>*/}

                {/*<Portfolio/>*/}

                {/*<Line/>*/}

                {/*<TechStack/>*/}

                {/*<Line/>*/}

                {/*<Line/>*/}

                {/*<Testimonials/>*/}

                {/*<Line/>*/}

                {/*<ContactUs/>*/}

            </div>
        </>
    );
};

export default HomePage;