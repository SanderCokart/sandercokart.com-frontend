import type {ArticleModel} from '@/types/ModelTypes';
import type {GetStaticProps} from 'next';

import c from 'classnames';
import type {MDXRemoteSerializeResult} from 'next-mdx-remote';
import {MDXRemote} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {FaChevronLeft} from 'react-icons/fa';

import axios from '@/functions/axios';

interface BlogPostPageProps {
    article: Omit<ArticleModel, 'body'> & { body: MDXRemoteSerializeResult };
}

const ArticlePage = ({ article }: BlogPostPageProps) => {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    return (
        <main className="section prose-all">
            <button className="mb-2 flex items-center gap-2 label hover:bg-secondary" onClick={goBack}><FaChevronLeft/> Go back</button>
            <div className="relative not-prose aspect-[3/2]">
                <div className="absolute inset-0 z-10 m-16">
                    <h1 className={c(
                        'font-bold label p-1 rounded bg-secondary/75 dark:bg-secondaryDark/75 text-white',
                        'md:text-8xl line-clamp-4'
                    )}>{article.title}</h1>
                </div>
                <Image fill priority alt={article.banner.file_name} src={article.banner.original_url} style={{ objectFit: 'cover' }}/>
                <div className="absolute inset-x-0 bottom-0 flex justify-between p-2">
                    <span className="label">Published: {article.published_at}</span>
                    <span className="capitalize label">{article.type.name}</span>
                </div>
            </div>
            <MDXRemote {...article.body}/>
        </main>
    );
};

export default ArticlePage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { data: { article } } = await axios.simpleGet(`/articles/${params?.type}/${params?.slug}`);

    article.body = await serialize(article.body);

    return { props: { article } };
};

export const getStaticPaths = async () => {
    const { data: paths } = await axios.simpleGet('/articles/paths');

    return { paths, fallback: false };
};
