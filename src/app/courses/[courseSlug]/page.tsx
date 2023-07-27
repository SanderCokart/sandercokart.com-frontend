import type { CourseModel } from '@/types/ModelTypes';
import type { ArticleModelsResponse } from '@/types/ResponseTypes';

import type { SuccessResponse } from '@/functions/shared/api';
import api from '@/functions/shared/api';

import { ApiRouteCourse } from '@/routes/api-routes';

interface PageProps {
  params: {
    courseSlug: string;
  };
}

const getCourse = async (slug: CourseModel['slug']) => {
  const {
    data: { articles }
  } = await api.simpleGet<null, SuccessResponse<ArticleModelsResponse>>(ApiRouteCourse(slug));

  return articles;
};

const CoursePage = ({ params: { courseSlug } }: PageProps) => {
  const articles = getCourse(courseSlug);

  return <main className="min-h-main" />;
};

export default CoursePage;
