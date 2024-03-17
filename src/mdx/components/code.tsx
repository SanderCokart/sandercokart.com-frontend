'use client';

import React, { Children } from 'react';

import type { HTMLAttributes, ReactNode } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { cn } from '@/functions/shared/utils';

const Code = ({ children, title, className, ...restOfProps }: HTMLAttributes<HTMLElement>) => {
  return (
    <div {...restOfProps} className={cn('my-4 flex flex-col', className)}>
      <div className="flex bg-secondary p-1 font-bold text-secondary-foreground">{title}</div>
      {children}
    </div>
  );
};

const CodeTabs = ({ children }: { children: ReactNode }) => (
  <Tabs defaultValue="index.html">
    <TabsList className="m-0 flex h-auto w-min divide-x-2 divide-muted-foreground p-0">
      {Children.map(children, child => (
        <TabsTrigger
          className="grow rounded-none bg-muted text-muted-foreground data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
          value={(child as any).props.title}>
          {(child as any).props.title}
        </TabsTrigger>
      ))}
    </TabsList>
    {children}
  </Tabs>
);

const CodeTab = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <TabsContent className="mt-0" value={title}>
      {children}
    </TabsContent>
  );
};

export { Code, CodeTabs, CodeTab };
