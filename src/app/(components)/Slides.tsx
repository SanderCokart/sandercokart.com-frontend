"use client";

import type { ArticleModel, CourseModel } from "@/types/ModelTypes";
import type { ReactNode } from "react";

import { ArticleSlideItem } from "@/app/(components)/slides/ArticleSlideItem";
import { CourseSlideItem } from "@/app/(components)/slides/CourseSlideItem";
import { localArticlesRoute, localCoursesRoute } from "@/routes/local-routes";
import { motion } from "framer-motion";
import { SwiperSlide } from "swiper/react";

import GenericSwiper from "@/components/Swipers/GenericSwiper";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, transition: { duration: 0.5 } },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

interface SlidesProps {
  articles: {
    general: ArticleModel[];
    courses: CourseModel[];
    tips: ArticleModel[];
  };
}

const ComingSoon = ({
  active,
  children,
}: {
  active: boolean;
  children: ReactNode;
}) => {
  if (active)
    return <div className="text-center font-code text-2xl">Coming Soon...</div>;

  return children;
};

const Slides = ({ articles: { general, tips, courses } }: SlidesProps) => {
  return (
    <motion.div
      animate="show"
      className="flex select-none flex-col"
      initial="hidden"
      variants={containerVariants}
    >
      <motion.div className="relative z-10" variants={itemVariants}>
        <GenericSwiper moreHref={localArticlesRoute("general")} title="General">
          <ComingSoon active={!general.length}>
            {general.map((article) => (
              <SwiperSlide
                key={article.id}
                className="aspect-video w-full overflow-hidden border-4 border-primary dark:border-primaryDark sm:w-[min(578px,100%)] md:rounded"
              >
                <ArticleSlideItem article={article} />
              </SwiperSlide>
            ))}
          </ComingSoon>
        </GenericSwiper>
      </motion.div>
      <motion.div className="relative z-10" variants={itemVariants}>
        <GenericSwiper moreHref={localCoursesRoute()} title="Courses">
          <ComingSoon active={!courses.length}>
            {courses.map((course) => (
              <SwiperSlide
                key={course.id}
                className="aspect-video w-full overflow-hidden border-4 border-primary dark:border-primaryDark sm:w-[min(578px,100%)] md:rounded"
              >
                <CourseSlideItem course={course} />
              </SwiperSlide>
            ))}
          </ComingSoon>
        </GenericSwiper>
      </motion.div>
      <motion.div className="relative z-10" variants={itemVariants}>
        <GenericSwiper moreHref={localArticlesRoute("tips")} title="Tips">
          <ComingSoon active={!tips.length}>
            {tips.map((article) => (
              <SwiperSlide
                key={article.id}
                className="aspect-video w-full overflow-hidden border-4 border-primary dark:border-primaryDark sm:w-[min(578px,100%)] md:rounded"
              >
                <ArticleSlideItem article={article} />
              </SwiperSlide>
            ))}
          </ComingSoon>
        </GenericSwiper>
      </motion.div>
    </motion.div>
  );
};

export default Slides;
