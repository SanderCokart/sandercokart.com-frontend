import 'highlight.js/styles/tokyo-night-dark.css';

import hljs from 'highlight.js';

import React from 'react';

import type { ComponentProps, HTMLAttributes } from 'react';
/*@ts-expect-error - MDXProvider is not typed*/
import type { MDXProvider } from '@mdx-js/react';

import { cn } from '@/functions/shared/utils';

import { Code, CodeTab, CodeTabs } from './components/code';

const mdxComponents: ComponentProps<typeof MDXProvider>['components'] = {
  Code,
  CodeTab,
  CodeTabs,
  pre: (props: any) => <pre className="hljs overflow-auto border border-secondary p-4" {...props} />,
  code: ({ children, className, ...props }: HTMLAttributes<HTMLElement>) => {
    const language = className?.replace('language-', '') as string;
    const highlightedCode = hljs.highlight(children as string, { language });

    return (
      <code
        {...props}
        className={cn(className, 'font-code')}
        dangerouslySetInnerHTML={{ __html: highlightedCode.value }}
      />
    );
  },
};

export default mdxComponents;
