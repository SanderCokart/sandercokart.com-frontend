import type {ArticleModel, CourseModel} from '@/types/ModelTypes';

export const localHomeRoute = (hash: string) => hash ? `/#${hash}` : '/';

//articles
export const localArticleRoute = (article: ArticleModel) => `/articles/${article.type.name}/${article.slug}`;
export const localArticlesRoute = () => '/articles';
//courses
export const localCourseRoute = (course: CourseModel) => `/courses/${course.slug}`;
export const localCoursesRoute = () => '/courses';
//tips
export const localTipRoute = (tip: ArticleModel) => `/tips/${tip.slug}`;
export const localTipsRoute = () => '/tips';