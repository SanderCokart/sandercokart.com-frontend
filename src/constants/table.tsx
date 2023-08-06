import type { HTMLAttributes } from 'react';

import { cn } from '@/functions/shared/utils';

export const table = ({ className, ...restOfProps }: HTMLAttributes<HTMLTableElement>) => (
  <table
    className={cn('max-h-[80vh] w-full table-auto overflow-auto', className)}
    {...restOfProps}
  />
);

export const td = ({ className, ...restOfProps }: HTMLAttributes<HTMLTableCellElement>) => (
  <td
    className={cn(
      'border-4 border-muted px-4 py-2 selection:bg-primary selection:text-primary-foreground hover-focus:bg-secondary-active hover-focus:font-bold hover-focus:text-white md:hover-focus:shadow-hard-sm',
      className
    )}
    {...restOfProps}
  />
);

export const tr = ({ className, ...restOfProps }: HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={cn(
      'bg-primary transition-[theme(transitionProperty.colors),transform] hover-focus:bg-secondary-active hover-focus:font-bold hover-focus:text-white md:hover-focus:shadow-hard-sm',
      className
    )}
    tabIndex={0}
    {...restOfProps}
  />
);

export const thead = ({ className, ...restOfProps }: HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn('drop-shadow-hard-sm', className)} {...restOfProps} />
);

export const tbody = ({ className, ...restOfProps }: HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody
    className={cn(
      'md:hover:shadow-hard-sm md:[&>tr:focus]:scale-x-105 md:[&>tr:hover]:scale-x-105',
      className
    )}
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
