import type { ArticleType } from "@/types/CommonTypes";
import type { CourseModel, ArticleModel } from "@/types/ModelTypes";

export const localHomeRoute = () => "/";

//<editor-fold desc="Articles">
export const localArticleRoute = (
  typeName: ArticleType,
  slug: ArticleModel["slug"],
) => `/${typeName}/${slug}`;

export const localArticlesRoute = (typeName: ArticleType) => `/${typeName}`;
//</editor-fold>

//<editor-fold desc="Courses">
export const localCourseRoute = (courseSlug: CourseModel["slug"]) =>
  `/courses/${courseSlug}`;
export const localCourseArticleRoute = (
  courseSlug: CourseModel["slug"],
  articleSlug: ArticleModel["slug"],
) => `/courses/${courseSlug}/${articleSlug}`;
export const localCoursesRoute = () => "/courses";
//</editor-fold>
