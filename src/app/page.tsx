import type {ArticleModel} from '@/types/ModelTypes';

import Slides from '@/app/(components)/Slides';

import type {SuccessResponse} from '@/functions/axios';
import axios from '@/functions/axios';

const getArticles = async () => {
    const { data: { articles: general } } = await axios.simpleGet<null, SuccessResponse<{ articles: ArticleModel[] }>>('/articles/general');
    const { data: { articles: tips } } = await axios.simpleGet<null, SuccessResponse<{ articles: ArticleModel[] }>>('/articles/tips');
    const { data: { courses } } = await axios.simpleGet<null, SuccessResponse<{ courses: ArticleModel[] }>>('/courses');
    return { articles: { general, courses, tips } };
};

const HomePage = async () => {
    const { articles } = await getArticles();

    return (
        <main className="min-h-main flex flex-col">
            <Slides articles={articles}/>
        </main>
    );
};

export default HomePage;