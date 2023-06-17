import type {ArticleType} from '@/types/CommonTypes';
import type {ArticleModel} from '@/types/ModelTypes';

import {ApiRouteArticle} from '@/routes/api-routes';
import {cache} from 'react';

import type {SuccessResponse} from '@/functions/axios';
import axios from '@/functions/axios';

const getArticles = cache(async (type: ArticleType, slug: string) => {
    const { data } = await axios.simpleGet<null, SuccessResponse<{article:ArticleModel}>>(ApiRouteArticle(type, slug));
    return data.article;
});

export default getArticles;