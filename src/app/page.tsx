import type { ArticleModel, CourseModel } from '@/types/ModelTypes';

import { API } from '@/functions/shared/new-api';

import '@/components/client';
import 'swiper/css/bundle';

import { FaArrowCircleRight } from 'react-icons/fa';

import React from 'react';
import Link from 'next/link';

import type { ReactNode } from 'react';

import { MotionDiv } from '@/components/client';
import { ArticleSwiper } from '@/components/Swipers/article-swiper';

import { cn } from '@/functions/shared/utils';

import { localArticlesRoute } from '@/routes/local-routes';

export const revalidate = 60;

const getGeneralArticles = async () => {
  return await API.get<{ articles: ArticleModel[] }>('/articles/general');
};

const getTipsArticles = async () => {
  return await API.get<{ articles: ArticleModel[] }>('/articles/tips');
};

const getCourses = async () => {
  return await API.get<{ courses: CourseModel[] }>('/courses');
};

const getArticles = async () => {
  const { data: generalData } = await API.get<{ articles: ArticleModel[] }>('/articles/general');
  const { data: tipsData } = await API.get<{ articles: ArticleModel[] }>('/articles/tips');
  const { data: coursesData } = await API.get<{ courses: CourseModel[] }>('/courses');

  const general = generalData?.articles ?? [];
  const tips = tipsData?.articles ?? [];
  const courses = coursesData?.courses ?? [];

  return { general, tips, courses };
};

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

const GeneralArticles = async () => {
  const { data, errors } = await getGeneralArticles();

  if (errors) {
    throw errors.message;
  }

  if (!data?.articles.length) {
    return <div className="p-8 text-center font-code text-2xl">Coming Soon...</div>;
  }

  return <ArticleSwiper articles={data?.articles} />;
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
        </MotionDiv>
      </div>
    </main>
  );
};

export default HomePage;
