import { FaArrowCircleLeft } from 'react-icons/fa';

import Image from 'next/image';
import Link from 'next/link';

import type { SuccessResponse } from '@/functions/shared/api';
import type { ArticleType } from '@/types/CommonTypes';
import type { ArticleModel } from '@/types/ModelTypes';
import type { ArticleModelsResponse } from '@/types/ResponseTypes';

import { NavigationHelperNavigationButton, NavigationHelpers } from '@/app/components';

import api from '@/functions/shared/api';
import { calculatePublishedTimestamp, cn } from '@/functions/shared/utils';
import { ApiRouteArticles } from '@/routes/api-routes';
import { localArticleRoute, localHomeRoute } from '@/routes/local-routes';

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
    <main className="min-h-main p-8" id="articles">
      <NavigationHelpers>
        <NavigationHelperNavigationButton href={localHomeRoute()}>
          <FaArrowCircleLeft />
          Back to discover
        </NavigationHelperNavigationButton>
      </NavigationHelpers>

      <div
        className={cn(
          'supports-[grid-template-rows:masonry]:grid-template-rows-[masonry] grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
          'pointer-events-none',
          '[&:hover_>*:hover]:opacity-100 [&:hover_>*]:opacity-30  [&_>*]:transition-opacity',
          '[&:focus-within>*:focus-within]:opacity-100 [&:focus-within>*]:opacity-30'
        )}>
        {articles.map(article => (
          <ArticleFigure key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
};

const ArticleFigure = ({ article }: ArticleFigureProps) => (
  <div>
    <Link
      key={article.id}
      className="group"
      href={localArticleRoute(article.type.name, article.slug)}>
      <figure className="pointer-events-auto relative flex flex-col border-2 border-secondary">
        <div className="relative aspect-video h-full w-full overflow-hidden">
          <Image
            fill
            priority
            alt={article.title}
            className="transition-transform group-hover:scale-110"
            src={article.banner.original_url}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <figcaption className="flex h-full flex-col justify-between">
          <h1
            className={cn(
              'label bg-secondary transition-opacity',
              'line-clamp-2 font-code text-sm font-black capitalize text-black md:text-xl'
            )}
            title={article.title}>
            {article.title}
          </h1>

          <div className="flex flex-col bg-muted p-4 text-black dark:text-white">
            <p
              className="line-clamp-5 font-code text-xs font-normal md:text-base"
              title={article.excerpt}>
              {article.excerpt}
            </p>
          </div>

          <span className="label text-center font-code text-xs text-black shadow-none">
            Published: {calculatePublishedTimestamp(article.published_at, true)}
          </span>
        </figcaption>
      </figure>
    </Link>
  </div>
);

export default ArticlesPage;
export const revalidate = 0;
