import type { ArticleType } from "@/types/CommonTypes";
import type { ArticleModel } from "@/types/ModelTypes";
import type { ArticleModelsResponse } from "@/types/ResponseTypes";

import { ArticleFigure } from "@/app/[articleType]/articleFigure";
import { ApiRouteArticles } from "@/routes/api-routes";
import moment from "moment/moment";
import Link from "next/link";
import { Fragment } from "react";
import { twJoin } from "tailwind-merge";

import type { SuccessResponse } from "@/functions/shared/api";
import api from "@/functions/shared/api";

interface ArticlesPageProps {
  params: {
    articleType: ArticleType;
  };
}

const getArticles = async (type: ArticleType) => {
  const {
    data: { articles },
  } = await api.simpleGet<null, SuccessResponse<ArticleModelsResponse>>(
    ApiRouteArticles(type),
  );
  return articles;
};

const ArticlesPage = async ({ params: { articleType } }: ArticlesPageProps) => {
  const articles = await getArticles(articleType);

  const articlesByMonth = articles.reduce(
    (acc, article) => {
      const year = moment(article.published_at).format("YYYY");
      const month = moment(article.published_at).format("MMMM");

      const yearIndex = acc.findIndex((item) => item.year === year);

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
        {articlesByMonth.map((entry) => (
          <Fragment key={entry.year}>
            <div>
              <h1
                className="z-10 scroll-mt-[68px] bg-secondary text-center font-digital text-4xl font-bold dark:bg-secondaryDark"
                id={entry.year}
              >
                {entry.year}
              </h1>

              {Object.entries(entry.months).map(([month, articles]) => (
                <Fragment key={month}>
                  <h2
                    className="z-10 scroll-mt-[68px] bg-secondary text-center font-digital text-4xl font-bold dark:bg-secondaryDark"
                    id={month}
                  >
                    {month}
                  </h2>

                  <div
                    key={month}
                    className={twJoin(
                      "pointer-events-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
                      "[&:hover_>*:hover]:opacity-100 [&:hover_>*]:opacity-75 [&_>*]:transition-opacity",
                    )}
                  >
                    {articles.map((article) => (
                      <ArticleFigure key={article.id} article={article} />
                    ))}
                  </div>
                </Fragment>
              ))}
            </div>
          </Fragment>
        ))}
      </main>
      <aside className="sticky top-[68px] h-96 min-w-96 border-secondary dark:border-secondaryDark">
        <h1 className="bg-secondary text-center font-digital text-4xl dark:bg-secondaryDark">
          History
        </h1>
        <ul className="divide-y-2">
          {articlesByMonth.map((entry) => (
            <li key={entry.year} className="flex flex-col">
              <div className="h-full w-full bg-secondary p-2 text-center font-bold dark:bg-secondaryDark">
                {entry.year}
              </div>
              <ul>
                {Object.entries(entry.months).map(([month]) => (
                  <li key={month} className="flex">
                    <Link
                      className="h-full w-full cursor-pointer bg-primary p-2 text-center font-bold hover:bg-primaryDark dark:bg-primaryDark dark:hover:bg-primary"
                      href={`#${month}`}
                    >
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
