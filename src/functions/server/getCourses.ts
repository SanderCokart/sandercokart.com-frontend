import type {CourseModel} from '@/types/ModelTypes';

import {ApiRouteCourses} from '@/routes/api-routes';
import {cache} from 'react';

import type {SuccessResponse} from '@/functions/axios';
import axios from '@/functions/axios';

// TODO: fix routes and payload

const getArticles = cache(async () => {
    const { data } = await axios.simpleGet<null, SuccessResponse<{ courses: CourseModel[] }>>(ApiRouteCourses());

    return data.courses;
});

export default getArticles;