import React, { cache } from 'react';

import type { ReactNode } from 'react';
import type { ArticleModel, CourseModel } from '@/types/ModelTypes';

import { API } from '@/functions/shared/new-api';

import '@/components/client';
import 'swiper/css/bundle';

import { FaArrowCircleRight } from 'react-icons/fa';

import Link from 'next/link';

import { MotionDiv } from '@/components/client';
import { ArticleSwiper } from '@/components/Swipers/article-swiper';
import { CourseSwiper } from '@/components/Swipers/course-swiper';

import { cn } from '@/functions/shared/utils';

import { localArticlesRoute } from '@/routes/local-routes';

export const revalidate = 5;

const getGeneralArticles = cache(async () => {
  return await API.get<ArticleModel[]>('/articles/general', { defaultData: [] });
});

const getTipsArticles = cache(async () => {
  return await API.get<ArticleModel[]>('/articles/tips', { defaultData: [] });
});

const getCourses = cache(async () => {
  return await API.get<CourseModel[]>('/courses', { defaultData: [] });
});

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

const SectionHeader = ({ children, href }: { href: string; children: ReactNode }) => (
  <h1
    className={cn(
      'flex items-center justify-center gap-32',
      'bg-secondary text-secondary-foreground transition-colors',
      'py-1 md:py-2',
      'overflow-hidden font-digital',
      'text-center text-xl md:text-4xl',
    )}>
    <span className="flex w-5/6 items-center justify-between">
      <span className="grow">{children}</span>
      <Link className="flex items-center gap-2" href={href}>
        more <FaArrowCircleRight />
      </Link>
    </span>
  </h1>
);

const ComingSoon = () => (
  <div className="bg-primary p-8 text-center font-code text-2xl text-primary-foreground">Coming Soon...</div>
);

const GeneralArticles = async () => {
  const { data: articles, errors } = await getGeneralArticles();

  if (errors) throw new Error(errors.message);

  if (!articles?.length) {
    return <ComingSoon />;
  }

  return <ArticleSwiper articles={articles} />;
};

const TipArticles = async () => {
  const { data: articles, errors } = await getTipsArticles();

  if (errors) throw new Error(errors.message);

  if (!articles.length) {
    return <ComingSoon />;
  }

  return <ArticleSwiper articles={articles} />;
};

const Courses = async () => {
  const { data: courses, errors } = await getCourses();

  if (errors) throw new Error(errors.message);

  if (!courses.length) {
    return <ComingSoon />;
  }

  return <CourseSwiper courses={courses} />;
};

const HomePage = async () => {
  return (
    <main>
      <div className="flex flex-col">
        <MotionDiv animate="show" className="flex select-none flex-col" initial="hidden" variants={containerVariants}>
          <MotionDiv className="relative z-10" variants={itemVariants}>
            <section className="relative z-10 shadow-2xl">
              <SectionHeader href={localArticlesRoute('general')}>General</SectionHeader>
              <div className="relative">
                <GeneralArticles />
              </div>
            </section>
          </MotionDiv>
          <MotionDiv className="relative z-10" variants={itemVariants}>
            <section className="relative z-10 shadow-2xl">
              <SectionHeader href="/courses">Courses</SectionHeader>
              <div className="relative">
                <Courses />
              </div>
            </section>
          </MotionDiv>
          <MotionDiv className="relative z-10" variants={itemVariants}>
            <section className="relative z-10 shadow-2xl">
              <SectionHeader href={localArticlesRoute('tips')}>Tips</SectionHeader>
              <div className="relative">
                <TipArticles />
              </div>
            </section>
          </MotionDiv>
        </MotionDiv>
      </div>
    </main>
  );
};

export default HomePage;
