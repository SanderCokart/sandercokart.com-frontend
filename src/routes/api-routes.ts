import type { ArticleType } from '@/types/CommonTypes';

export const ApiRouteArticles = (type: ArticleType) => `/articles/${type}`;
export const ApiRouteArticle = (type: ArticleType, slug: string) => `/articles/${type}/${slug}`;
export const ApiRouteCourses = () => `/courses`;
export const ApiRouteCourse = (courseSlug: string) => `/courses/${courseSlug}}`;
export const ApiRouteCourseArticle = (courseSlug: string, articleSlug: string) =>
  `/courses/${courseSlug}/${articleSlug}`;
