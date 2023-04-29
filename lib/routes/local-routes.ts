import type {ArticleModel, CourseModel} from '@/types/ModelTypes';

export const homeRoute = (hash: string) => hash ? `/#${hash}` : '/';

//articles
export const articleRoute = (article: ArticleModel) => `/articles/${article.type.name}/${article.slug}`;
export const articlesRoute = () => '/articles';
//courses
export const courseRoute = (course: CourseModel) => `/courses/${course.slug}`;
export const coursesRoute = () => '/courses';
//tips
export const tipRoute = (tip: ArticleModel) => `/tips/${tip.slug}`;
export const tipsRoute = () => '/tips';