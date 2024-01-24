import type { ArticleModel, CourseModel } from '@/types/ModelTypes';

import 'swiper/css';

import { API } from '@/functions/shared/new-api';

import Slides from '@/app/(components)/Slides';

const getArticles = async () => {
  const { data: generalData } = await API.get<{ articles: ArticleModel[] }, null>('/articles/general');
  const { data: tipsData } = await API.get<{ articles: ArticleModel[] }, null>('/articles/tips');
  const { data: coursesData } = await API.get<{ courses: CourseModel[] }, null>('/courses');

  const general = generalData?.articles ?? [];
  const tips = tipsData?.articles ?? [];
  const courses = coursesData?.courses ?? [];

  return { general, tips, courses };
};

const HomePage = async () => {
  const articles = await getArticles();

  return (
    <main>
      <Slides articles={articles} />
    </main>
  );
};

export default HomePage;
