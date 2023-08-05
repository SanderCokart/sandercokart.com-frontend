import { MDXRemote } from 'next-mdx-remote/rsc';

import { cache } from 'react';
import Image from 'next/image';

import type { SuccessResponse } from '@/functions/shared/api';
import type { ArticleType } from '@/types/CommonTypes';
import type { ArticleModel } from '@/types/ModelTypes';
import type { ArticleModelResponse } from '@/types/ResponseTypes';
import type { Metadata } from 'next';

import { GoBackButton } from '@/app/[articleType]/[slug]/components/GoBackButton';

import mdxComponents from '@/constants/mdxComponents';
import mdxOptions from '@/constants/mdxOptions';
import api from '@/functions/shared/api';
import { calculatePublishedTimestamp } from '@/functions/shared/utils';
import { ApiRouteArticle } from '@/routes/api-routes';

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
  const ids = article.body.match(regex)?.map(header => {
    const id = header
      .replace(/#{1,6}\s/, '')
      .toLocaleLowerCase()
      .replace(/\s/g, '-');

    return id;
  });

  return (
    <main className="min-h-main p-4 md:p-8">
      <div className="mx-auto max-w-screen-lg">
        <GoBackButton />
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
      <div className="relative mx-auto grid max-w-screen-lg grid-cols-[3fr,1fr] gap-8">
        <article className="article flex flex-col gap-4 leading-relaxed">
          <MDXRemote components={mdxComponents} options={{ mdxOptions }} source={article.body} />
        </article>
        <aside className="">
          <h1>Table Of Contents</h1>
          <ul className="list-inside list-disc">
            {ids?.map(id => (
              <li key={id}>
                <a href={`#${id}`}>{id}</a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
};

export default ArticlePage;
