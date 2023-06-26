/*@ts-expect-error - MDXProvider is not typed*/
import type {MDXProvider} from '@mdx-js/react';
import type React from 'react';

const mdxComponents: React.ComponentProps<typeof MDXProvider>['components'] = {};

export default mdxComponents;
