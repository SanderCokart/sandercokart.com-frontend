import type { HTMLAttributes } from 'react';

import { cn } from '@/functions/shared/utils';

export const table = ({ className, ...restOfProps }: HTMLAttributes<HTMLTableElement>) => (
  <table className={cn('max-h-[80vh] w-full table-auto overflow-auto', className)} {...restOfProps} />
);

export const td = ({ className, ...restOfProps }: HTMLAttributes<HTMLTableCellElement>) => (
  <td
    className={cn(
      'px-4 py-2 selection:bg-primary selection:text-primary-foreground hover-focus:bg-secondary-active hover-focus:font-bold hover-focus:text-white md:hover-focus:shadow-hard-sm',
      className,
    )}
    {...restOfProps}
  />
);

export const tr = ({ className, ...restOfProps }: HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={cn(
      'bg-primary transition-[transform] hover:scale-x-105 focus:scale-x-105 hover-focus:bg-secondary-active hover-focus:font-bold hover-focus:text-white md:hover-focus:shadow-hard-sm',
      className,
    )}
    tabIndex={0}
    {...restOfProps}
  />
);

export const thead = ({ className, ...restOfProps }: HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn(className)} {...restOfProps} />
);

export const tbody = ({ className, ...restOfProps }: HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn('divide-y-2 divide-muted', className)} {...restOfProps} />
);

export const th = ({ className, ...restOfProps }: HTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={cn('bg-secondary px-4 py-2 text-left text-secondary-foreground dark:text-white', className)}
    {...restOfProps}
  />
);
