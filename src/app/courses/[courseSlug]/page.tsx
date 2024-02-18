import React, { cache } from 'react';

import type { CourseModel } from '@/types/ModelTypes';

import { API } from '@/functions/shared/new-api';
import { cn } from '@/functions/shared/utils';

import { ApiRouteCourse } from '@/routes/api-routes';

import { ArticleFigure } from '@/app/[articleType]/article-figure';

interface PageProps {
  params: {
    courseSlug: string;
  };
}

const getCourse = cache(async (slug: CourseModel['slug']) => {
  return await API.get<CourseModel>(ApiRouteCourse(slug));
});

const ComingSoon = () => (
  <div className="bg-primary p-8 text-center font-code text-2xl text-primary-foreground">Coming Soon...</div>
);

const formatArticleCount = (articles_count: number) => {
  if (articles_count === 0) return 'No articles';
  if (articles_count === 1) return '1 article';

  return `${articles_count} articles`;
};

const CourseArticles = async ({ articles }: { articles: CourseModel['articles'] }) => (
  <>
    {articles.map(article => (
      <ArticleFigure key={article.id} article={article} />
    ))}
  </>
);

const CoursePage = async ({ params: { courseSlug } }: PageProps) => {
  const { data: course, errors } = await getCourse(courseSlug);
  if (errors) throw new Error(errors.message);

  return (
    <div className="flex">
      <main>
        <div className="dark:bg-secondaryDark grid grid-cols-3 place-items-center bg-secondary">
          <h1 className="col-start-2 text-center font-digital text-4xl">{course.title}</h1>
          <div className="font-digital text-4xl">{formatArticleCount(course.articles_count)}</div>
        </div>
        <div
          className={cn(
            'pointer-events-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
            '[&:hover_>*:hover]:opacity-100 [&:hover_>*]:opacity-75 [&_>*]:transition-opacity',
          )}>
          <CourseArticles articles={course.articles} />
        </div>
      </main>
    </div>
  );
};

export default CoursePage;
