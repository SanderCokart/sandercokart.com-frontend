import moment from 'moment/moment';
import { twJoin } from 'tailwind-merge';

import { Fragment } from 'react';
import Link from 'next/link';

import type { SuccessResponse } from '@/functions/shared/api';
import type { ArticleType } from '@/types/CommonTypes';
import type { ArticleModel } from '@/types/ModelTypes';
import type { ArticleModelsResponse } from '@/types/ResponseTypes';

import api from '@/functions/shared/api';
import { API } from '@/functions/shared/new-api';
import { cn } from '@/functions/shared/utils';

import { ApiRouteArticles } from '@/routes/api-routes';

import { ArticleFigure } from '@/app/[articleType]/article-figure';

interface ArticlesPageProps {
  params: {
    articleType: ArticleType;
  };
}

const getArticles = async (type: ArticleType) => {
  return await API.get<ArticleModel[]>(ApiRouteArticles(type));
};

const ArticlesPage = async ({ params: { articleType } }: ArticlesPageProps) => {
  const { data: articles, errors } = await getArticles(articleType);

  if (errors) throw new Error(errors.message);

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
      <main className="grow bg-white">
        {articlesByMonth.map(entry => (
          <Fragment key={entry.year}>
            <div>
              <h1
                className="z-10 scroll-mt-16 bg-secondary text-center font-digital text-4xl font-bold"
                id={entry.year}>
                {entry.year}
              </h1>

              {Object.entries(entry.months).map(([month, articles]) => (
                <Fragment key={month}>
                  <h2 className="z-10 scroll-mt-16 bg-secondary text-center font-digital text-4xl font-bold" id={month}>
                    {month}
                  </h2>

                  <div
                    key={month}
                    className={cn(
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
      <aside className="sticky top-16 h-full min-w-96">
        <h1 className="bg-secondary text-center font-digital text-4xl">History</h1>
        <ul className="divide-y-2">
          {articlesByMonth.map(entry => (
            <li key={entry.year} className="flex flex-col">
              <div className=" h-full w-full bg-secondary p-2 text-center font-bold">{entry.year}</div>
              <ul>
                {Object.entries(entry.months).map(([month]) => (
                  <li key={month} className="flex">
                    <Link
                      className="h-full w-full cursor-pointer bg-primary p-2 text-center font-bold"
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
