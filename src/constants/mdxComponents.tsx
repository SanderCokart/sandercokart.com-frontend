/*@ts-expect-error - MDXProvider is not typed*/
import type { MDXProvider } from '@mdx-js/react';

import { Pre } from '@/components/MDXComponents';

import * as headings from './headings';
import * as table from './table';

const mdxComponents: React.ComponentProps<typeof MDXProvider>['components'] = {
  pre: Pre,
  // code: Code,
  ...table,
  ...headings
};

export default mdxComponents;
