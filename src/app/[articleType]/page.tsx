import type { ArticleType } from "@/types/CommonTypes";
import type { ArticleModel } from "@/types/ModelTypes";
import type { ArticleModelsResponse } from "@/types/ResponseTypes";

import { ApiRouteArticles } from "@/routes/api-routes";
import { localArticleRoute } from "@/routes/local-routes";
import moment from "moment/moment";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { twJoin } from "tailwind-merge";

import type { SuccessResponse } from "@/functions/shared/api";
import api from "@/functions/shared/api";
import calculatePublishedTimestamp from "@/functions/shared/calculatePublishedTimestamp";

interface ArticlesPageProps {
  params: {
    articleType: ArticleType;
  };
}

interface ArticleFigureProps {
  article: ArticleModel;
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

const ArticleFigure = ({ article }: ArticleFigureProps) => (
  <Link
    key={article.id}
    className="group pointer-events-auto"
    href={localArticleRoute(article.type.name, article.slug)}
  >
    <figure className="relative flex flex-col border-2 border-secondary transition-transform hover:scale-95 dark:border-secondaryDark">
      <div className="relative aspect-video h-full w-full overflow-hidden">
        <Image
          fill
          alt={article.title}
          className="transition-transform group-hover:scale-110"
          src={article.banner.original_url}
          style={{ objectFit: "cover" }}
        />
      </div>

      <figcaption
        className={twJoin(
          "flex h-full flex-col justify-between",
          "bg-black/25 text-white",
        )}
      >
        <h1
          className={twJoin(
            "label bg-secondary transition-opacity dark:bg-secondaryDark",
            "line-clamp-2 font-code text-sm font-black capitalize text-black dark:text-white md:text-xl",
          )}
        >
          {article.title}
        </h1>

        <div
          className={twJoin(
            "flex flex-col p-4",
            "bg-bodyLightSecondary text-black dark:bg-bodyDarkSecondary dark:text-white",
          )}
        >
          <p className="line-clamp-5 font-code text-xs font-normal md:text-base">
            {article.excerpt}
          </p>
        </div>

        <span
          className={twJoin(
            "label shadow-none",
            "text-center font-code text-xs text-black",
          )}
        >
          Published: {calculatePublishedTimestamp(article.published_at, true)}
        </span>
      </figcaption>
    </figure>
  </Link>
);

export default ArticlesPage;
