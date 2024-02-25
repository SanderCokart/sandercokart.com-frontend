import moment from 'moment/moment';

import { cache, Fragment } from 'react';
import Link from 'next/link';

import type { ArticleType } from '@/types/CommonTypes';
import type { ArticleModel } from '@/types/ModelTypes';

import { API } from '@/functions/shared/new-api';
import { cn } from '@/functions/shared/utils';

import { ApiRouteArticles } from '@/routes/api-routes';

import { ArticleFigure } from '@/app/[articleType]/article-figure';

interface ArticlesPageProps {
  params: {
    articleType: ArticleType;
  };
}

const getArticles = cache(async (type: ArticleType) => {
  return await API.get<ArticleModel[]>(ApiRouteArticles(type));
});

interface ArticlesByMonth {
  year: string;
  months: { [month: string]: ArticleModel[] };
}

const getArticlesByMonth = (articles: ArticleModel[]) =>
  articles.reduce((acc, article) => {
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
  }, [] as ArticlesByMonth[]);

const ArticlesPage = async ({ params: { articleType } }: ArticlesPageProps) => {
  const { data: articles, errors } = await getArticles(articleType);

  if (errors) throw new Error(errors.message);

  const articlesByMonth = getArticlesByMonth(articles);

  return (
    <div className="flex">
      <ArticleGrid articlesByMonth={articlesByMonth} />
      <HistorySidebar articlesByMonth={articlesByMonth} />
    </div>
  );
};

const ArticleGrid = ({ articlesByMonth }: { articlesByMonth: ArticlesByMonth[] }) => {
  return (
    <main className="grow">
      {articlesByMonth.map(entry => (
        <Fragment key={entry.year}>
          <section>
            <h1 className="z-10 scroll-mt-16 bg-secondary text-center font-digital text-4xl font-bold" id={entry.year}>
              {entry.year}
            </h1>

            {Object.entries(entry.months).map(([month, articles]) => (
              <Fragment key={month}>
                <h2 className="z-10 scroll-mt-16 bg-secondary text-center font-digital text-4xl font-bold" id={month}>
                  {month}
                </h2>

                <ul key={month} className={cn('grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]', '')}>
                  {articles.map(article => (
                    <li key={article.id}>
                      <ArticleFigure article={article} />
                    </li>
                  ))}
                </ul>
              </Fragment>
            ))}
          </section>
        </Fragment>
      ))}
    </main>
  );
};

const HistorySidebar = ({ articlesByMonth }: { articlesByMonth: ArticlesByMonth[] }) => {
  return (
    <aside className="sticky top-16 h-full overflow-y-auto">
      <h1 className="bg-secondary text-center font-digital text-4xl">History</h1>
      <ul className="space-y-2 divide-y-2">
        {articlesByMonth.map(entry => (
          <li key={entry.year} className="flex flex-col">
            <h1 className=" h-full w-full bg-secondary p-2 text-center font-bold">{entry.year}</h1>
            <ul className="flex flex-col">
              {Object.entries(entry.months).map(([month]) => (
                <li key={month} className="flex flex-col">
                  <Link
                    className="bg-primary px-16 py-2 text-center font-bold transition-colors hover:bg-accent hover:text-accent-foreground"
                    href={`#${month}`}>
                    <h2>{month}</h2>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ArticlesPage;
