import type {ArticleMDXResponse} from '@/types/ResponseTypes';
import type {GetServerSideProps} from 'next';
import type {BlogPostPageProps} from 'pages/articles/[type]/[slug]';

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

const PreviewPage = ({ article }: BlogPostPageProps) => {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    return (
        <main className="section">
            {article && (
                <>
                    <div className="max-w-screen-lg  mx-auto p-2 md:p-0">
                        <button className="mb-2 flex text-xl md:text-2xl items-center gap-2 label hover:bg-secondary" onClick={goBack}><FaChevronLeft/> Go back</button>
                        <div className="relative aspect-[3/2]">
                            <div className="absolute inset-0 flex items-center justify-center z-10 m-16">
                                <h1 className={c(
                                    'font-bold label p-1 rounded bg-secondary/75 dark:bg-secondaryDark/75 text-white',
                                    'md:text-8xl line-clamp-4'
                                )}>{article.title}</h1>
                            </div>
                            <Image fill priority alt={article.banner.file_name} src={article.banner.original_url} style={{ objectFit: 'cover' }}/>
                            <div className="absolute inset-x-0 bottom-0 flex justify-between p-2 text-xs md:text-xl">
                                <span className="label hidden md:inline-block">Published: {calculatePublishedTimestamp(article.published_at)}</span>
                                <span className="label md:hidden">Published: {calculatePublishedTimestamp(article.published_at, true)}</span>
                                <span className="capitalize label">{article.type?.name}</span>
                            </div>
                        </div>
                    </div>
                    <article className="prose-all p-4 md:p-0">
                        <div className="max-w-screen-lg mx-auto">
                            <MDXRemote components={{
                                CH
                            }} {...article.body}/>
                        </div>
                    </article>
                </>
            )}
        </main>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { type, slug, expires, signature } = query;
    const response = await axios.simpleGet<ArticleMDXResponse>(`/articles/${type}/${slug}?expires=${expires}&signature=${signature}`);

    if (response.type !== 'success') {
        return { notFound: true };
    }

    const { article } = response.data;

    article.body = await serialize(article.body, {
        mdxOptions
    });

    return { props: { article } };
};

export default PreviewPage;