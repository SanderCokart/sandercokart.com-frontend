import remarkGfm from 'remark-gfm';
import mdx from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import rehypePrettyCode from 'rehype-pretty-code';

const withMDX = mdx({
    options: {
        remarkPlugins: [remarkGfm, remarkFrontmatter],
        rehypePlugins: [[rehypePrettyCode, {theme: 'one-dark-pro',keepBackground:true}]],
        providerImportSource: '@mdx-js/react'
    }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
    reactStrictMode: false
};

export default withMDX(nextConfig);