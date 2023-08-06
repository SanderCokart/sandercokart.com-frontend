import 'server-only';

import { cache } from 'react';

import type { SuccessResponse } from '@/functions/shared/api';
import type { ArticleModel, CourseModel } from '@/types/ModelTypes';
import type { CourseModelResponse, CourseModelsResponse } from '@/types/ResponseTypes';

import api from '@/functions/shared/api';
import {
  ApiRouteArticlePaths,
  ApiRouteArticles,
  ApiRouteCourse,
  ApiRouteCourses
} from '@/routes/api-routes';

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
  const { data } = await api.simpleGet<null, SuccessResponse<{ slug: string; type: string }[]>>(
    ApiRouteArticlePaths()
  );

  return data;
});

export const getCourses = async () => {
  const {
    data: { courses }
  } = await api.simpleGet<null, SuccessResponse<CourseModelsResponse>>(ApiRouteCourses());

  return courses;
};

export const getCourse = cache(async (slug: CourseModel['slug']) => {
  const {
    data: { course }
  } = await api.simpleGet<null, SuccessResponse<CourseModelResponse>>(ApiRouteCourse(slug));

  return course;
});
