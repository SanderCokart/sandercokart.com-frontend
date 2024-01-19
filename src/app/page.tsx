import { FaArrowCircleRight } from 'react-icons/fa';

import Link from 'next/link';

import type { SuccessResponse } from '@/functions/shared/api';
import type { ArticleModel, CourseModel } from '@/types/ModelTypes';

import { Swiper, SwiperSlide } from '@/components/swiper';

import api from '@/functions/shared/api';

import { localArticlesRoute } from '@/routes/local-routes';

import { ArticleSlideItem } from '@/app/(components)/slides/ArticleSlideItem';
import { CourseSlideItem } from '@/app/(components)/slides/CourseSlideItem';

const getArticles = async () => {
  const {
    data: { articles: general },
  } = await api.simpleGet<null, SuccessResponse<{ articles: ArticleModel[] }>>('/articles/general');
  const {
    data: { articles: tips },
  } = await api.simpleGet<null, SuccessResponse<{ articles: ArticleModel[] }>>('/articles/tips');
  const {
    data: { courses },
  } = await api.simpleGet<null, SuccessResponse<{ courses: CourseModel[] }>>('/courses');

  return { general, courses, tips };
};

const HomePage = async () => {
  const { courses, tips, general } = await getArticles();

  const breakpoints = {
    0: {
      slidesPerView: 1,
      centeredSlides: true,
    },
    640: {
      slidesPerView: 2,
      centeredSlides: false,
    },
    1024: {
      slidesPerView: 3,
      centeredSlides: false,
    },
    1280: {
      slidesPerView: 4,
      centeredSlides: false,
    },
  };

  return (
    <main>
      <div className="flex bg-secondary text-secondary-foreground">
        <h1 className="grow p-2 text-center font-digital text-4xl">General</h1>
        <Link className="flex items-center gap-2 font-digital text-3xl" href={localArticlesRoute('general')}>
          more <FaArrowCircleRight />
        </Link>
      </div>
      <Swiper navigation breakpoints={breakpoints} className="h-72 bg-muted">
        {general.map(article => {
          return (
            <SwiperSlide key={article.id}>
              <ArticleSlideItem article={article} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper navigation breakpoints={breakpoints} className="h-72 bg-muted">
        {courses.map(course => {
          return (
            <SwiperSlide key={course.id}>
              <CourseSlideItem course={course} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper navigation breakpoints={breakpoints} className="h-72 bg-muted">
        {tips.map(article => {
          return (
            <SwiperSlide key={article.id}>
              <ArticleSlideItem article={article} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </main>
  );
};

export default HomePage;
