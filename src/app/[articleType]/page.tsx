import moment from 'moment/moment';
import { twJoin } from 'tailwind-merge';

import { Fragment } from 'react';
import Link from 'next/link';

import type { SuccessResponse } from '@/functions/shared/api';
import type { ArticleType } from '@/types/CommonTypes';
import type { ArticleModel } from '@/types/ModelTypes';
import type { ArticleModelsResponse } from '@/types/ResponseTypes';

import api from '@/functions/shared/api';

import { ApiRouteArticles } from '@/routes/api-routes';

import { ArticleFigure } from '@/app/[articleType]/ArticleFigure';

interface ArticlesPageProps {
  params: {
    articleType: ArticleType;
  };
}

const getArticles = async (type: ArticleType) => {
  const { data } = await api.simpleGet<null, SuccessResponse<ArticleModelsResponse>>(ApiRouteArticles(type));

  return data?.articles ?? [];
};

const ArticlesPage = async ({ params: { articleType } }: ArticlesPageProps) => {
  const articles = await getArticles(articleType);

  const articlesByMonth = articles.reduce(
    (acc, article) => {
      const year = moment(article.published_at).format('YYYY');
      const month = moment(article.published_at).format('MMMM');

      const yearIndex = acc.findIndex(item => item.year === year);

      if (yearIndex === -1) {
        acc.push({ year, months: { [month]: [article] } });
      } else {
        if (!acc[yearIndex].months[month]) {
          acc[yearIndex].months[month] = [article];
        } else {
          acc[yearIndex].months[month].push(article);
        }
      }

      return acc;
    },
    [] as { year: string; months: { [month: string]: ArticleModel[] } }[],
  );

  return (
    <div className="flex">
      <main>
        {articlesByMonth.map(entry => (
          <Fragment key={entry.year}>
            <div>
              <h1
                className="dark:bg-secondaryDark z-10 scroll-mt-[68px] bg-secondary text-center font-digital text-4xl font-bold"
                id={entry.year}>
                {entry.year}
              </h1>

              {Object.entries(entry.months).map(([month, articles]) => (
                <Fragment key={month}>
                  <h2
                    className="dark:bg-secondaryDark z-10 scroll-mt-[68px] bg-secondary text-center font-digital text-4xl font-bold"
                    id={month}>
                    {month}
                  </h2>

                  <div
                    key={month}
                    className={twJoin(
                      'pointer-events-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
                      '[&:hover_>*:hover]:opacity-100 [&:hover_>*]:opacity-75 [&_>*]:transition-opacity',
                    )}>
                    {articles.map(article => (
                      <ArticleFigure key={article.id} article={article} />
                    ))}
                  </div>
                </Fragment>
              ))}
            </div>
          </Fragment>
        ))}
      </main>
      <aside className="dark:border-secondaryDark sticky top-[68px] h-96 min-w-96 border-secondary">
        <h1 className="dark:bg-secondaryDark bg-secondary text-center font-digital text-4xl">History</h1>
        <ul className="divide-y-2">
          {articlesByMonth.map(entry => (
            <li key={entry.year} className="flex flex-col">
              <div className="dark:bg-secondaryDark h-full w-full bg-secondary p-2 text-center font-bold">
                {entry.year}
              </div>
              <ul>
                {Object.entries(entry.months).map(([month]) => (
                  <li key={month} className="flex">
                    <Link
                      className="hover:bg-primaryDark dark:bg-primaryDark h-full w-full cursor-pointer bg-primary p-2 text-center font-bold dark:hover:bg-primary"
                      href={`#${month}`}>
                      {month}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default ArticlesPage;
