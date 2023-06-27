import type {ArticleModel, CourseModel} from '@/types/ModelTypes';
import type {GetStaticProps} from 'next';

import {articleRoute, coursesRoute, articlesRoute, tipsRoute, tipRoute} from '@/routes/local-routes';
import c from 'classnames';
import {motion} from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {SwiperSlide} from 'swiper/react';

import ArticleFigure from '@/components/ArticleFigure';
import CourseFigure from '@/components/CourseFigure';
import {GenericSwiper} from '@/components/Swipers';
import TouchTipNotification from '@/components/TouchTipNotification';

import type {SuccessResponse} from '@/functions/shared/axios';
import axios from '@/functions/shared/axios';
import calculatePublishedTimestamp from '@/functions/shared/calculatePublishedTimestamp';

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
    general: ArticleModel[];
    courses: CourseModel[];
    tips: ArticleModel[];
}

function MoreButton({ text, route }: { text: string, route: string }) {
    return (
        <div className="my-4 grid place-items-center">
            <Link className="label font-bold" href={route}>More {text}</Link>
        </div>
    );
}

const HomePage = ({ general, courses, tips }: HomePageProps) => {
    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: .5,
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
            <main className="section-no-padding flex flex-col" id="hero">
                <TouchTipNotification/>
                <motion.div
                    animate="show"
                    className="flex select-none flex-col"
                    initial="hidden"
                    variants={container}
                >
                    <motion.div className="relative z-10" variants={item}>
                        <GenericSwiper title="General">
                            {general.map((article) => (
                                <SwiperSlide key={article.id} className="aspect-video w-full overflow-hidden border-4 border-primary dark:border-primaryDark sm:w-[min(578px,100%)] md:rounded">
                                    <ArticleFigure article={article} route={articleRoute(article)}/>
                                </SwiperSlide>
                            ))}
                            <MoreButton route={articlesRoute()} text="articles"/>
                        </GenericSwiper>
                    </motion.div>
                    <motion.div className="relative z-10" variants={item}>

                        <GenericSwiper title="Courses">
                            {courses.map((course) => (
                                <SwiperSlide key={course.id} className="aspect-video w-full overflow-hidden border-4 border-primary dark:border-primaryDark sm:w-[min(578px,100%)] md:rounded">
                                    <CourseFigure course={course}/>
                                </SwiperSlide>
                            ))}
                            <MoreButton route="" text="courses"/>
                        </GenericSwiper>

                    </motion.div>
                    <motion.div className="relative z-10" variants={item}>
                        <GenericSwiper title="Tips">
                            {tips.map((tip) => (
                                <SwiperSlide key={tip.id} className="aspect-video w-full overflow-hidden border-4 border-primary dark:border-primaryDark sm:w-[min(578px,100%)] md:rounded">
                                    <ArticleFigure article={tip} route={tipRoute(tip)}/>
                                </SwiperSlide>
                            ))}
                            <MoreButton route={tipsRoute()} text="tips"/>
                        </GenericSwiper>
                    </motion.div>
                </motion.div>
            </main>
        </>
    );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
    const { data: { articles: general } } = await axios.simpleGet<null, SuccessResponse<{ articles: ArticleModel[] }>>('/articles/general');
    const { data: { articles: tips } } = await axios.simpleGet<null, SuccessResponse<{ articles: ArticleModel[] }>>('/articles/tips');
    const { data: { courses } } = await axios.simpleGet<null, SuccessResponse<{ courses: ArticleModel[] }>>('/courses');
    return { props: { general, courses, tips } };
};

const Figure = ({ article }: { article: ArticleModel }) => {
    return (
        <Link className=" group" href={articleRoute(article)}>
            <figure className="relative h-full w-full overflow-hidden">
                <Image fill
                       alt={article.title}
                       className="transition-transform group-hover:scale-110"
                       src={article.banner.original_url}
                       style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0 backdrop-blur-[2px] group-hover:backdrop-blur-none"></div>

                <figcaption className={c(
                    'absolute inset-x-0 bottom-0 group-hover:opacity-0 transition-opacity',
                    'flex flex-col justify-between h-full',
                    'text-white bg-black/25'
                )}>

                    <h1 className={c(
                        'transition-opacity label bg-secondary dark:bg-secondaryDark',
                        'capitalize text-sm md:text-xl font-black font-code line-clamp-2 text-black dark:text-white'
                    )}>
                        {article.title}
                    </h1>

                    <div className="flex flex-col">
                        <p className={c(
                            'label',
                            'bg-black/75',
                            'text-xs md:text-base text-white font-normal font-code line-clamp-1'
                        )}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur culpa dolorem exercitationem fugit harum illo laudantiumsssss
                        </p>

                        <span className={c(
                            /*TODO FIX LABEL ALIGN use grid maybe*/
                            'label',
                            'text-center text-xs font-code text-black'
                        )}>Published: {calculatePublishedTimestamp(article.published_at, true)}</span>
                    </div>
                </figcaption>
            </figure>
        </Link>
    );
};