import type { SerializeOptions } from 'next-mdx-remote/dist/types';

import rehypeHighlight from 'rehype-highlight';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';

const mdxOptions: SerializeOptions['mdxOptions'] = {
  remarkPlugins: [
    // remarkToc,
    remarkGfm
  ],
  rehypePlugins: [rehypeSlug, rehypeHighlight, rehypeMdxCodeProps],
  useDynamicImport: true
};

export default mdxOptions;
