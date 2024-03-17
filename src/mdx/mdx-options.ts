import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';

import type { SerializeOptions } from 'next-mdx-remote/dist/types';

const mdxOptions: SerializeOptions['mdxOptions'] = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    [
      rehypePrism as any,
      {
        showLineNumbers: true,
      },
    ],
  ],
};

export default mdxOptions;
