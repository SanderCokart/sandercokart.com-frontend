import type { HTMLAttributes } from 'react';

import { cn } from '@/functions/shared/utils';

const globalClass =
  'md:scroll-mt-[calc(theme(spacing.header-desktop)_+_theme(spacing.16))] sm:scroll-my-header-mobile inline-block label focus:bg-secondary-active';

export const h1 = ({ className, ...restOfProps }: HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    className={cn(globalClass, 'p-4 text-5xl font-bold', className)}
    tabIndex={0}
    {...restOfProps}
  />
);

export const h2 = ({ className, ...restOfProps }: HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn(globalClass, 'text-3xl font-bold', className)} tabIndex={0} {...restOfProps} />
);

export const h3 = ({ className, ...restOfProps }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn(globalClass, 'text-2xl font-bold', className)} tabIndex={0} {...restOfProps} />
);

export const h4 = ({ className, ...restOfProps }: HTMLAttributes<HTMLHeadingElement>) => (
  <h4 className={cn(globalClass, 'text-xl font-bold', className)} tabIndex={0} {...restOfProps} />
);

export const h5 = ({ className, ...restOfProps }: HTMLAttributes<HTMLHeadingElement>) => (
  <h5 className={cn(globalClass, 'text-lg font-bold', className)} tabIndex={0} {...restOfProps} />
);

export const h6 = ({ className, ...restOfProps }: HTMLAttributes<HTMLHeadingElement>) => (
  <h6 className={cn(globalClass, 'text-base font-bold', className)} tabIndex={0} {...restOfProps} />
);
