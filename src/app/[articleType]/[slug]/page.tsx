import type {ArticleType} from '@/types/CommonTypes';
import type {ArticleModel} from '@/types/ModelTypes';
import type {ArticleModelResponse} from '@/types/ResponseTypes';
import type {Metadata} from 'next';

import GoBackButton from '@/app/[articleType]/[slug]/(components)/GoBackButton';
import {ApiRouteArticle} from '@/routes/api-routes';
import {MDXRemote} from 'next-mdx-remote/rsc';
import Image from 'next/image';

import mdxComponents from '@/constants/mdxComponents';
import mdxOptions from '@/constants/mdxOptions';

import type {SuccessResponse} from '@/functions/shared/api';
import api from '@/functions/shared/api';
import calculatePublishedTimestamp from '@/functions/shared/calculatePublishedTimestamp';

interface ArticlePageProps {
    params: {
        articleType: ArticleType;
        slug: string;
    };
}

const getArticle = async (type: ArticleType, slug: ArticleModel['slug']) => {
    const { data: { article } } = await api.simpleGet<null, SuccessResponse<ArticleModelResponse>>(ApiRouteArticle(type, slug));
    return article;
};

const ArticlePage = async ({ params: { articleType, slug } }: ArticlePageProps) => {
    const article = await getArticle(articleType, slug);

    return (
        <main className="min-h-main p-4 md:p-8">
            <div className="mx-auto max-w-screen-lg">
                <GoBackButton/>
                <div className="relative aspect-[3/2]">
                    <Image fill priority alt={article.banner.file_name} src={article.banner.original_url} style={{ objectFit: 'cover' }}/>
                    <div className="absolute inset-x-0 top-0 flex justify-between p-2 font-code text-xs font-bold md:text-xl">
                        <span className="label hidden lg:inline-block">Published: {calculatePublishedTimestamp(article.published_at)}</span>
                        <span className="label lg:hidden" title={`Published: ${calculatePublishedTimestamp(article.published_at)}`}>Published: {calculatePublishedTimestamp(article.published_at, true)}</span>
                        <span className="label capitalize">{article.type.name}</span>
                    </div>
                </div>
            </div>
            <article className="article">
                    <MDXRemote components={mdxComponents}
                               options={{mdxOptions}}
                               source={article.body}/>
            </article>
        </main>

    );
};

export default ArticlePage;