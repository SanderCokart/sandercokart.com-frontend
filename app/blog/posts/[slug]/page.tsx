import PageContext from '@/types/PageContext';
import fs from 'fs';
import {compileMDX} from 'next-mdx-remote/rsc';
import {PropsWithChildren} from 'react';
import remarkGfm from 'remark-gfm';

const components = {
    Grid: ({ children, columns = 1, ...props }: PropsWithChildren<{ columns: number }>) => (
        <div className={`grid grid-cols-${columns} place-items-center`} {...props}>
            {children}
        </div>
    ),
    table: ({ children, ...props }: PropsWithChildren<{}>) => (
        <table className="max-w-lg w-full mx-auto bg-gray-900 table">{children}</table>
    ),
    thead: ({ children, ...props }: PropsWithChildren<{}>) => (
        <thead className="bg-red-900 text-white">{children}</thead>
    ),
};

async function getPostBySlug(slug: string) {
    const post = await fs.promises.readFile(`app/blog/posts/(posts)/${slug}.mdx`, 'utf-8');
    const { frontmatter, content } = await compileMDX({
        compiledSource: '',
        source: post,
        components,
        options: {
            parseFrontmatter: true, mdxOptions: {
                remarkPlugins: [remarkGfm]
            }
        }
    });

    return { frontmatter, content };
}

export default async function Post({ params: { slug } }: PageContext<{ slug: string }>) {
    const { frontmatter, content } = await getPostBySlug(slug);

    return (
        <article className="p-8 min-h-[calc(100vh-100px)]">
            <div className="grid w-full place-items-center">
                <figure>
                    <img className="rounded border-red-900 border-2" src={frontmatter?.banner} alt=""/>
                </figure>
            </div>
            <div className="prose-2xl dark:prose-invert">
                {content}
            </div>
        </article>
    );
}