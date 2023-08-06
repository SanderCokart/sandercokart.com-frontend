import type { HTMLAttributes } from 'react';

import { cn } from '@/functions/shared/utils';

export const table = ({ className, ...restOfProps }: HTMLAttributes<HTMLTableElement>) => (
  <table
    className={cn('max-h-[80vh] w-full table-auto overflow-auto', className)}
    {...restOfProps}
  />
);

export const td = ({ className, ...restOfProps }: HTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn('border-4 border-muted px-4 py-2', className)} {...restOfProps} />
);

export const tr = ({ className, ...restOfProps }: HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={cn(
      'transition-colors hover:bg-primary hover:font-bold hover:text-white md:hover:scale-x-105 md:hover:shadow-hard-sm',
      className
    )}
    {...restOfProps}
  />
);

export const thead = ({ className, ...restOfProps }: HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn('drop-shadow-hard-sm', className)} {...restOfProps} />
);

export const tbody = ({ className, ...restOfProps }: HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody
    className={cn('md:hover:scale-x-105 md:hover:shadow-hard-sm', className)}
    {...restOfProps}
  />
);

export const th = ({ className, ...restOfProps }: HTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={cn(
      'border-separate border-4 border-muted bg-secondary px-4 py-2 text-left text-black dark:text-white',
      className
    )}
    {...restOfProps}
  />
);
