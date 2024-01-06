import type {ArticleModel, CourseModel} from '@/types/ModelTypes';

import Slides from '@/app/(components)/Slides';

import type {SuccessResponse} from '@/functions/shared/api';
import api from '@/functions/shared/api';

const getArticles = async () => {
    const { data: { articles: general } } = await api.simpleGet<null, SuccessResponse<{ articles: ArticleModel[] }>>('/articles/general');
    const { data: { articles: tips } } = await api.simpleGet<null, SuccessResponse<{ articles: ArticleModel[] }>>('/articles/tips');
    const { data: { courses } } = await api.simpleGet<null, SuccessResponse<{ courses: CourseModel[] }>>('/courses');

    return { general, courses, tips };

};

const HomePage = async () => {
    const articles = await getArticles();

    return (
        <main className="min-h-main flex flex-col">
            <Slides articles={articles}/>
        </main>
    );
};

export default HomePage;