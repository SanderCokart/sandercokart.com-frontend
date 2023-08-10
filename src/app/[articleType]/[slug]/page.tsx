import { MDXRemote } from 'next-mdx-remote/rsc';
import { FaArrowCircleLeft } from 'react-icons/fa';

import { cache } from 'react';
import Image from 'next/image';

import type { SuccessResponse } from '@/functions/shared/api';
import type { ArticleType } from '@/types/CommonTypes';
import type { ArticleModel } from '@/types/ModelTypes';
import type { ArticleModelResponse } from '@/types/ResponseTypes';
import type { Metadata } from 'next';

import { NavigationHelperNavigationButton, NavigationHelpers } from '@/app/components';

import mdxComponents from '@/constants/mdxComponents';
import mdxOptions from '@/constants/mdxOptions';
import api from '@/functions/shared/api';
import { calculatePublishedTimestamp } from '@/functions/shared/utils';
import { ApiRouteArticle } from '@/routes/api-routes';
import { localArticlesRoute } from '@/routes/local-routes';

interface MetaDataProps {
  params: RouteParams;
}

export async function generateMetadata({ params }: MetaDataProps) {
  const article = await getArticle(params.articleType, params.slug);

  const metaData: Metadata = {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: 'Sander Cokart', url: 'https://www.github.com/sandercokart' }]
  };

  return metaData;
}

interface RouteParams {
  articleType: ArticleType;
  slug: string;
}

interface ArticlePageProps {
  params: RouteParams;
}

const getArticle = cache(async (type: ArticleType, slug: ArticleModel['slug']) => {
  const {
    data: { article }
  } = await api.simpleGet<null, SuccessResponse<ArticleModelResponse>>(ApiRouteArticle(type, slug));

  return article;
});

const ArticlePage = async ({ params: { articleType, slug } }: ArticlePageProps) => {
  const article = await getArticle(articleType, slug);

  //get all ids
  //look for markdown headers and slugify them
  const regex = /(?<=\n)(#{1,6})\s(.+)/g;
  const ids =
    article.body.match(regex)?.map(header => {
      return header
        .replace(/#{1,6}\s/, '')
        .toLocaleLowerCase()
        .replace(/\s/g, '-');
    }) ?? [];

  return (
    <main className="min-h-main p-4 md:p-8">
      <div className="relative">
        <NavigationHelpers>
          <NavigationHelperNavigationButton href={localArticlesRoute(articleType)}>
            <FaArrowCircleLeft />
            <span>Go to overview</span>
          </NavigationHelperNavigationButton>
        </NavigationHelpers>
        <div className=" mx-auto max-w-screen-lg">
          <div>
            <div className="relative aspect-[3/2]">
              <Image
                fill
                priority
                alt={article.banner.file_name}
                src={article.banner.original_url}
                style={{ objectFit: 'cover' }}
              />
              <div className="absolute inset-x-0 top-0 flex justify-between p-2 font-code text-xs font-bold md:text-xl">
                <span className="label hidden lg:inline-block">
                  Published: {calculatePublishedTimestamp(article.published_at)}
                </span>
                <span
                  className="label lg:hidden"
                  title={`Published: ${calculatePublishedTimestamp(article.published_at)}`}>
                  Published: {calculatePublishedTimestamp(article.published_at, true)}
                </span>
                <span className="label capitalize">{article.type.name}</span>
              </div>
            </div>
          </div>
          <div className="relative mx-auto max-w-screen-lg">
            <article className="article space-y-4 leading-relaxed">
              <MDXRemote
                components={mdxComponents}
                options={{ mdxOptions }}
                source={article.body}
              />
            </article>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ArticlePage;
