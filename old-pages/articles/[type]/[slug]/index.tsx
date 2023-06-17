import type {ArticleMDXResponse} from '@/types/ResponseTypes';
import type {GetStaticProps} from 'next';

import {CH} from '@code-hike/mdx/components';
import c from 'classnames';
import {MDXRemote} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {FaChevronLeft} from 'react-icons/fa';

import mdxOptions from '@/constants/mdxOptions';

import axios from '@/functions/axios';
import calculatePublishedTimestamp from '@/functions/calculatePublishedTimestamp';

export type BlogPostPageProps = ArticleMDXResponse

const ArticlePage = ({ article }: BlogPostPageProps) => {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    return (
        <main className="section">
            <div className="mx-auto max-w-screen-lg p-2 md:p-0">
                <button className="mb-2 flex items-center gap-2 text-xl label hover:bg-secondary md:text-2xl" onClick={goBack}><FaChevronLeft/> Go back</button>
                <div className="relative aspect-[3/2]">
                    <div className="absolute inset-0 z-10 m-16 flex items-center justify-center">
                        {/*<h1 className={c(*/}
                        {/*    'font-bold label p-1 rounded bg-secondary/75 dark:bg-secondaryDark/75 text-black dark:text-white',*/}
                        {/*    'text-[10vmin] md:text-8xl line-clamp-4'*/}
                        {/*)}>{article.title}</h1>*/}
                    </div>
                    <Image fill priority alt={article.banner.file_name} src={article.banner.original_url} style={{ objectFit: 'cover' }}/>
                    <div className="absolute font-code font-bold inset-x-0 top-0 flex justify-between p-2 text-xs md:text-xl">
                        <span className="hidden label md:inline-block">Published: {calculatePublishedTimestamp(article.published_at)}</span>
                        <span className="label md:hidden">Published: {calculatePublishedTimestamp(article.published_at, true)}</span>
                        <span className="capitalize label">{article.type.name}</span>
                    </div>
                </div>
            </div>
            <article className="p-4 md:p-0 article">
                <div className="mx-auto max-w-screen-lg">
                    <MDXRemote components={{
                        CH
                    }} {...article.body}/>
                </div>
            </article>
        </main>
    );
};

export default ArticlePage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const response = await axios.simpleGet<ArticleMDXResponse>(`/articles/${params?.type}/${params?.slug}`);
    if (response.type !== 'success') return { notFound: true };

    const { article } = response.data;

    article.body = await serialize(article.body, {
        mdxOptions
    });

    return { props: { article } };
};

export const getStaticPaths = async () => {
    const { data: paths } = await axios.simpleGet('/articles/paths');

    return { paths, fallback: false };
};
