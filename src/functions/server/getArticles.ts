import type {ArticleType} from '@/types/CommonTypes';
import type {ArticleModel} from '@/types/ModelTypes';

import {ApiRouteArticles} from '@/routes/api-routes';
import {cache} from 'react';

import axios from '@/functions/axios';


const getArticles = cache(async (type: ArticleType) => {
    return axios.simpleGet<ArticleModel[]>(ApiRouteArticles(type));
});

export default getArticles;