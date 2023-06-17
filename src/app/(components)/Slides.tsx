'use client';

import type {ArticleModel} from '@/types/ModelTypes';

import ArticleFigure from '@/app/(components)/(figures)/ArticleFigure';
import {localArticleRoute, localArticlesRoute, localCourseRoute, localTipRoute, localTipsRoute, localCoursesRoute} from '@/routes/local-routes';
import {motion} from 'framer-motion';
import Link from 'next/link';
import {SwiperSlide} from 'swiper/react';

import GenericSwiper from '@/components/Swipers/GenericSwiper';

const containerVariants = {
    hidden: {},
    show:   {
        transition: {
            staggerChildren:  .5,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, transition: { duration: .5 } },
    show:   { opacity: 1, transition: { duration: .5 } }
};

interface SlidesProps {
    articles: {
        general: ArticleModel[];
        courses: ArticleModel[];
        tips: ArticleModel[];
    };
}

const MoreButton = ({ text, route }: { text: string, route: string }) => (
    <div className="my-4 grid place-items-center">
        <Link className="label font-bold" href={route}>More {text}</Link>
    </div>
);

const Slides = ({ articles: { general, tips, courses } }: SlidesProps) => {
    return (
        <motion.div
            animate="show"
            className="flex select-none flex-col"
            initial="hidden"
            variants={containerVariants}
        >
            <motion.div className="relative z-10" variants={itemVariants}>
                <GenericSwiper moreHref={localArticlesRoute()} title="General">
                    {general.map((article) => (
                        <SwiperSlide key={article.id} className="aspect-video w-full overflow-hidden border-4 border-primary dark:border-primaryDark sm:w-[min(578px,100%)] md:rounded">
                            <ArticleFigure article={article} route={localArticleRoute(article)}/>
                        </SwiperSlide>
                    ))}
                </GenericSwiper>
            </motion.div>
            <motion.div className="relative z-10" variants={itemVariants}>
                <GenericSwiper moreHref={localCoursesRoute()} title="Courses">
                    {courses.map((article) => (
                        <SwiperSlide key={article.id} className="aspect-video w-full overflow-hidden border-4 border-primary dark:border-primaryDark sm:w-[min(578px,100%)] md:rounded">
                            <ArticleFigure article={article} route={localCourseRoute(article)}/>
                        </SwiperSlide>
                    ))}
                </GenericSwiper>
            </motion.div>
            <motion.div className="relative z-10" variants={itemVariants}>
                <GenericSwiper moreHref={localTipsRoute()} title="General">
                    {tips.map((article) => (
                        <SwiperSlide key={article.id} className="aspect-video w-full overflow-hidden border-4 border-primary dark:border-primaryDark sm:w-[min(578px,100%)] md:rounded">
                            <ArticleFigure article={article} route={localTipRoute(article)}/>
                        </SwiperSlide>
                    ))}
                </GenericSwiper>
            </motion.div>
        </motion.div>
    );
};

export default Slides;