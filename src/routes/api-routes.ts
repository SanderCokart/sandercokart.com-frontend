import type {ArticleType} from '@/types/CommonTypes';

import * as process from 'process';

//     const { data: { articles: general } } = await axios.simpleGet<null, SuccessResponse<{ articles: ArticleModel[] }>>('/articles/general');
//     const { data: { articles: tips } } = await axios.simpleGet<null, SuccessResponse<{ articles: ArticleModel[] }>>('/articles/tips');
//     const { data: { courses } } = await axios.simpleGet<null, SuccessResponse<{ courses: ArticleModel[] }>>('/courses');

const base = process.env.NEXT_PUBLIC_API_URL;
export const ApiRouteArticles = (type: ArticleType, includeBaseUrl = false) => `${includeBaseUrl ? base : ''}/articles/${type}`;
export const ApiRouteArticle = (type: ArticleType, slug: string, includeBaseUrl = false) => `${includeBaseUrl ? base : ''}/articles/${type}/${slug}`;