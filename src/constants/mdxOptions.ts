import type {SerializeOptions} from 'next-mdx-remote/dist/types';

import {remarkCodeHike} from '@code-hike/mdx';
//@ts-expect-error - no types
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';

const theme = require('shiki/themes/github-dark.json');

const mdxOptions: SerializeOptions['mdxOptions'] = {
    remarkPlugins: [
        [remarkCodeHike, { theme, lineNumbers: true, autoImport: false, showCopyButton: true,showExpandButton:true }],
        remarkToc, remarkGfm
    ],
    rehypePlugins: [rehypeSlug],
    useDynamicImport: true
};

export default mdxOptions;