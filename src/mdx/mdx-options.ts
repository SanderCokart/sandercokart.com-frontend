import remarkGfm from 'remark-gfm';

import type { SerializeOptions } from 'next-mdx-remote/dist/types';

const mdxOptions: SerializeOptions['mdxOptions'] = {
  remarkPlugins: [remarkGfm],
};

export default mdxOptions;
