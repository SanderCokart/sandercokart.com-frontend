/*@ts-expect-error - MDXProvider is not typed*/
import type {MDXProvider} from '@mdx-js/react';
import type React from 'react';

import {Pre} from '@/components/MDXComponents';

const mdxComponents: React.ComponentProps<typeof MDXProvider>['components'] = {
    pre: Pre,
    // code: Code,
};

export default mdxComponents;
