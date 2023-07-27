'use client';

import type { ArticleModel, CourseModel } from '@/types/ModelTypes';

import ArticleFigure from '@/app/(components)/(figures)/ArticleFigure';
import CourseFigure from '@/app/(components)/(figures)/CourseFigure';
import { motion } from 'framer-motion';
import { SwiperSlide } from 'swiper/react';

import GenericSwiper from '@/components/Swipers/GenericSwiper';

import { localArticlesRoute, localCoursesRoute } from '@/routes/local-routes';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.5
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, transition: { duration: 0.5 } },
  show: { opacity: 1, transition: { duration: 0.5 } }
};

interface SlidesProps {
  articles: {
    general: ArticleModel[];
    courses: CourseModel[];
    tips: ArticleModel[];
  };
}

const Slides = ({ articles: { general, tips, courses } }: SlidesProps) => {
  return (
    <motion.div
      animate="show"
      className="flex select-none flex-col"
      initial="hidden"
      variants={containerVariants}>
      <motion.div className="relative z-10" variants={itemVariants}>
        <GenericSwiper moreHref={localArticlesRoute('general')} title="General">
          {general.map(article => (
            <SwiperSlide
              key={article.id}
              className="dark:border-primaryDark aspect-video w-full overflow-hidden border-4 border-primary sm:w-[min(578px,100%)] md:rounded">
              <ArticleFigure article={article} />
            </SwiperSlide>
          ))}
        </GenericSwiper>
      </motion.div>
      <motion.div className="relative z-10" variants={itemVariants}>
        <GenericSwiper moreHref={localCoursesRoute()} title="Courses">
          {courses.map(course => (
            <SwiperSlide
              key={course.id}
              className="dark:border-primaryDark aspect-video w-full overflow-hidden border-4 border-primary sm:w-[min(578px,100%)] md:rounded">
              <CourseFigure course={course} />
            </SwiperSlide>
          ))}
        </GenericSwiper>
      </motion.div>
      <motion.div className="relative z-10" variants={itemVariants}>
        <GenericSwiper moreHref={localArticlesRoute('tips')} title="General">
          {tips.map(article => (
            <SwiperSlide
              key={article.id}
              className="dark:border-primaryDark aspect-video w-full overflow-hidden border-4 border-primary sm:w-[min(578px,100%)] md:rounded">
              <ArticleFigure article={article} />
            </SwiperSlide>
          ))}
        </GenericSwiper>
      </motion.div>
    </motion.div>
  );
};

export default Slides;
