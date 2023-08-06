import type { HTMLAttributes } from 'react';

import { cn } from '@/functions/shared/utils';

const globalClass =
  'md:scroll-mt-[calc(theme(spacing.header-desktop)_+_theme(spacing.16))] sm:scroll-my-header-mobile';

export const h1 = ({ className, ...restOfProps }: HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    className={cn(globalClass, 'label inline-block p-4 text-5xl font-bold', className)}
    {...restOfProps}
  />
);

export const h2 = ({ className, ...restOfProps }: HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn(globalClass, 'label inline-block text-3xl font-bold', className)}
    {...restOfProps}
  />
);

export const h3 = ({ className, ...restOfProps }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn(globalClass, 'label inline-block text-2xl font-bold', className)}
    {...restOfProps}
  />
);

export const h4 = ({ className, ...restOfProps }: HTMLAttributes<HTMLHeadingElement>) => (
  <h4
    className={cn(globalClass, 'label inline-block text-xl font-bold', className)}
    {...restOfProps}
  />
);

export const h5 = ({ className, ...restOfProps }: HTMLAttributes<HTMLHeadingElement>) => (
  <h5
    className={cn(globalClass, 'label inline-block text-lg font-bold', className)}
    {...restOfProps}
  />
);

export const h6 = ({ className, ...restOfProps }: HTMLAttributes<HTMLHeadingElement>) => (
  <h6
    className={cn(globalClass, 'label inline-block text-base font-bold', className)}
    {...restOfProps}
  />
);
