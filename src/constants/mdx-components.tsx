import hljs from 'highlight.js';

import 'highlight.js/styles/tokyo-night-dark.css';

import React from 'react';

import type { ComponentProps, DetailedHTMLProps, HTMLAttributes } from 'react';
/*@ts-expect-error - MDXProvider is not typed*/
import type { MDXProvider } from '@mdx-js/react';

import { cn } from '@/functions/shared/utils';

const code = ({ children, className, ...props }: HTMLAttributes<HTMLElement>) => {
  const language = className?.replace('language-', '') as string;
  const highlightedCode = hljs.highlight(children as string, { language });

  return (
    <code
      {...props}
      className={cn(className, 'font-code')}
      dangerouslySetInnerHTML={{ __html: highlightedCode.value }}
    />
  );
};
const pre = (props: any) => <pre className="hljs overflow-auto border border-secondary p-4" {...props} />;
const Code = ({ children, title, className, ...restOfProps }: HTMLAttributes<HTMLElement>) => {
  return (
    <div {...restOfProps} className={cn('flex flex-col', className)}>
      <div className="flex bg-secondary p-1 font-bold text-secondary-foreground">{title}</div>
      {children}
    </div>
  );
};
const mdxComponents: ComponentProps<typeof MDXProvider>['components'] = {
  Code,
  pre,
  code,
};

export default mdxComponents;
