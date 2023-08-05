import 'server-only';

import { cache } from 'react';

import type { SuccessResponse } from '@/functions/shared/api';
import type { ArticleModel, CourseModel } from '@/types/ModelTypes';

import api from '@/functions/shared/api';
import { ApiRouteArticlePaths, ApiRouteArticles, ApiRouteCourses } from '@/routes/api-routes';

export const getArticles = cache(async () => {
  const {
    data: { articles: general }
  } = await api.simpleGet<null, SuccessResponse<{ articles: ArticleModel[] }>>(
    ApiRouteArticles('general')
  );
  const {
    data: { articles: tips }
  } = await api.simpleGet<null, SuccessResponse<{ articles: ArticleModel[] }>>(
    ApiRouteArticles('tips')
  );
  const {
    data: { courses }
  } = await api.simpleGet<null, SuccessResponse<{ courses: CourseModel[] }>>(ApiRouteCourses());

  return { general, courses, tips };
});

export const getArticlePaths = cache(async () => {
  const { data } = await api.simpleGet<null, SuccessResponse<{}>>(ApiRouteArticlePaths());

  return data;
});
