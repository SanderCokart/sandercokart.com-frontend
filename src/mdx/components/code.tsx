import React from 'react';

import type { HTMLAttributes } from 'react';

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

const CodeTabs = ({}: {}) => (
  <Tabs className="bg-muted" defaultValue="index.html">
    <TabsList className="m-0 flex h-auto w-min divide-x-2 divide-muted-foreground p-0">
      <TabsTrigger
        className="grow rounded-none bg-muted text-muted-foreground data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
        value="index.html">
        index.html
      </TabsTrigger>
      <TabsTrigger
        className="grow rounded-none bg-muted text-muted-foreground data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
        value="app.js">
        app.js
      </TabsTrigger>
      <TabsTrigger
        className="grow rounded-none bg-muted text-muted-foreground data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
        value="globals.css">
        globals.css
      </TabsTrigger>
    </TabsList>
    <TabsContent value="index.html">index.html</TabsContent>
    <TabsContent value="app.js">app.js</TabsContent>
    <TabsContent value="globals.css">globals.css</TabsContent>
  </Tabs>
);

const CodeTab = () => null;

export { Code, CodeTabs, CodeTab };
