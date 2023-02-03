import remarkGfm from 'remark-gfm';
import mdx from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';

const withMDX = mdx({
    options: {
        remarkPlugins: [remarkGfm, remarkFrontmatter],
        rehypePlugins: [],
    }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
    reactStrictMode: false,
};

export default withMDX(nextConfig);