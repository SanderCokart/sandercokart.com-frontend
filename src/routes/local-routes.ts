import type {ArticleType} from '@/types/CommonTypes';
import type {CourseModel, ArticleModel} from '@/types/ModelTypes';

export const localHomeRoute = (hash: string) => hash ? `/#${hash}` : '/';

//articles
export const localArticleRoute = (typeName: ArticleType, slug: ArticleModel['slug']) => `/articles/${typeName}/${slug}`;
export const localArticlesRoute = (typeName: ArticleType) => `/articles/${typeName}`;
//courses
export const localCourseRoute = (course: CourseModel) => `/courses/${course.slug}`;
export const localCourseArticleRoute = (courseSlug: CourseModel['slug'], articleSlug: ArticleModel['slug']) => `/courses/${courseSlug}/${articleSlug}`;
export const localCoursesRoute = () => '/courses';