import React from 'react';

import type { ComponentProps, HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';
/*@ts-expect-error - MDXProvider is not typed*/
import type { MDXProvider } from '@mdx-js/react';

import { cn } from '@/functions/shared/utils';

import { Code, CodeTab, CodeTabs } from './components/code';

import './code.css';

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const mdxComponents: ComponentProps<typeof MDXProvider>['components'] = {
  table: (props: TableHTMLAttributes<HTMLTableElement>) => <Table {...props} />,
  thead: (props: HTMLAttributes<HTMLTableSectionElement>) => <TableHeader className="" {...props} />,
  tbody: (props: HTMLAttributes<HTMLTableSectionElement>) => <TableBody {...props} />,
  tfoot: (props: HTMLAttributes<HTMLTableSectionElement>) => <TableFooter {...props} />,
  tr: (props: HTMLAttributes<HTMLTableRowElement>) => (
    <TableRow {...props} className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground" />
  ),
  th: (props: ThHTMLAttributes<HTMLTableCellElement>) => (
    <TableHead className="bg-secondary text-secondary-foreground" {...props} />
  ),
  td: (props: TdHTMLAttributes<HTMLTableCellElement>) => <TableCell {...props} />,

  Code,
  CodeTab,
  CodeTabs,
  pre: (props: any) => <pre className="hljs overflow-auto border border-secondary p-4" {...props} />,
  code: ({ children, className, ...props }: HTMLAttributes<HTMLElement>) => {
    // const language = className?.replace('language-', '') as string;
    // const highlightedCode = hljs.highlight(children as string, { language });

    return (
      <code {...props} className={cn(className, 'font-code')}>
        {children}
      </code>
    );
  },
};

export default mdxComponents;
