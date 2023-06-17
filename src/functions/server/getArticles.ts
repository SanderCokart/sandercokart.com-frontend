import type {ArticleType} from '@/types/CommonTypes';
import type {ArticleModel} from '@/types/ModelTypes';

import {ApiRouteArticles} from '@/routes/api-routes';
import {cache} from 'react';

import type {SuccessResponse} from '@/functions/axios';
import axios from '@/functions/axios';

const getArticles = cache(async (type: ArticleType) => {
    const { data } = await axios.simpleGet<null, SuccessResponse<{ articles: ArticleModel[] }>>(ApiRouteArticles(type));

    return data.articles;
});

export default getArticles;