import { MDXRemote } from 'next-mdx-remote/rsc';

import { cache } from 'react';
import Image from 'next/image';

import type { ArticleType } from '@/types/CommonTypes';
import type { ArticleModel } from '@/types/ModelTypes';

import calculatePublishedTimestamp from '@/functions/shared/calculatePublishedTimestamp';
import { API } from '@/functions/shared/new-api';

import { ApiRouteArticle } from '@/routes/api-routes';

import GoBackButton from '@/app/[articleType]/[slug]/(components)/GoBackButton';
import mdxComponents from '@/mdx/mdx-components';
import mdxOptions from '@/mdx/mdx-options';

interface ArticlePageProps {
  params: {
    articleType: ArticleType;
    slug: string;
  };
}

const getArticle = cache(async (type: ArticleType, slug: ArticleModel['slug']) => {
  return await API.get<ArticleModel>(ApiRouteArticle(type, slug));
});

const ArticlePage = async ({ params: { articleType, slug } }: ArticlePageProps) => {
  const { data: article, errors } = await getArticle(articleType, slug);

  if (errors) {
    return (
      <main className="prose dark:prose-invert">
        <h1>Error</h1>
        <pre>{JSON.stringify(errors, null, 2)}</pre>
      </main>
    );
  }

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
            <span className="label lg:hidden" title={`Published: ${calculatePublishedTimestamp(article.published_at)}`}>
              Published: {calculatePublishedTimestamp(article.published_at, true)}
            </span>
            <span className="label capitalize">{article.type.name}</span>
          </div>
        </div>
      </div>
      <article className="article">
        <div className="mx-auto max-w-screen-lg">
          <MDXRemote components={mdxComponents} options={{ mdxOptions }} source={article.body} />
        </div>
      </article>
    </main>
  );
};

export default ArticlePage;
