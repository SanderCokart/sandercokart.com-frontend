import type {ArticleType} from '@/types/CommonTypes';

import GoBackButton from '@/app/[articleType]/[slug]/(components)/GoBackButton';
import {CH} from '@code-hike/mdx/components';
import {MDXRemote} from 'next-mdx-remote/rsc';
import Image from 'next/image';

import calculatePublishedTimestamp from '@/functions/calculatePublishedTimestamp';
import getArticle from '@/functions/server/getArticle';

interface ArticlePageProps {
    params: {
        articleType: ArticleType;
        slug: string;
    };
}

const ArticlePage = async ({ params: { articleType, slug } }: ArticlePageProps) => {
    const article = await getArticle(articleType, slug);

    return (
        <main className="min-h-main p-8">
            <div className="mx-auto max-w-screen-lg p-2 md:p-0">
                <GoBackButton/>
                <div className="relative aspect-[3/2]">
                    <Image fill priority alt={article.banner.file_name} src={article.banner.original_url} style={{ objectFit: 'cover' }}/>
                    <div className="absolute inset-x-0 top-0 flex justify-between p-2 font-code text-xs font-bold md:text-xl">
                        <span className="label hidden md:inline-block">Published: {calculatePublishedTimestamp(article.published_at)}</span>
                        <span className="label md:hidden">Published: {calculatePublishedTimestamp(article.published_at, true)}</span>
                        <span className="label capitalize">{article.type.name}</span>
                    </div>
                </div>
            </div>
            <article className="article p-4 md:p-0">
                <div className="mx-auto max-w-screen-lg">
                    <MDXRemote components={{ CH }} source={article.body}/>
                </div>
            </article>
        </main>

    );
};

export default ArticlePage;