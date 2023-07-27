export const revalidate = 0;

import type { ArticleType } from '@/types/CommonTypes';
import type { ArticleModel } from '@/types/ModelTypes';
import type { ArticleModelsResponse } from '@/types/ResponseTypes';

import Image from 'next/image';
import Link from 'next/link';
import { twJoin } from 'tailwind-merge';

import type { SuccessResponse } from '@/functions/shared/api';
import api from '@/functions/shared/api';
import calculatePublishedTimestamp from '@/functions/shared/calculatePublishedTimestamp';

import { ApiRouteArticles } from '@/routes/api-routes';
import { localArticleRoute } from '@/routes/local-routes';

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
    data: { articles }
  } = await api.simpleGet<null, SuccessResponse<ArticleModelsResponse>>(ApiRouteArticles(type));

  return articles;
};

const ArticlesPage = async ({ params: { articleType } }: ArticlesPageProps) => {
  const articles = await getArticles(articleType);

  return (
    <main className="min-h-main p-8">
      <div
        className={twJoin(
          'pointer-events-none grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
          '[&:hover_>*:hover]:opacity-100 [&:hover_>*]:opacity-75 [&_>*]:transition-opacity'
        )}>
        {articles.map(article => (
          <ArticleFigure key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
};

const ArticleFigure = ({ article }: ArticleFigureProps) => (
  <Link
    key={article.id}
    className="group pointer-events-auto"
    href={localArticleRoute(article.type.name, article.slug)}>
    <figure className="dark:border-secondaryDark relative flex flex-col border-2 border-secondary">
      <div className="relative aspect-video h-full w-full overflow-hidden">
        <Image
          fill
          alt={article.title}
          className="transition-transform group-hover:scale-110"
          src={article.banner.original_url}
          style={{ objectFit: 'cover' }}
        />
      </div>

      <figcaption
        className={twJoin('flex h-full flex-col justify-between', 'bg-black/25 text-white')}>
        <h1
          className={twJoin(
            'dark:bg-secondaryDark label bg-secondary transition-opacity',
            'line-clamp-2 font-code text-sm font-black capitalize text-black dark:text-white md:text-xl'
          )}>
          {article.title}
        </h1>

        <div
          className={twJoin(
            'flex flex-col p-4',
            'bg-bodyLightSecondary dark:bg-bodyDarkSecondary text-black dark:text-white'
          )}>
          <p className="line-clamp-5 font-code text-xs font-normal md:text-base">
            {article.excerpt}
          </p>
        </div>

        <span className={twJoin('label shadow-none', 'text-center font-code text-xs text-black')}>
          Published: {calculatePublishedTimestamp(article.published_at, true)}
        </span>
      </figcaption>
    </figure>
  </Link>
);

export default ArticlesPage;
