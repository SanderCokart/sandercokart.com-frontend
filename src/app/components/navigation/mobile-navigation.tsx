'use client';

import Link from 'next/link';

import type { HTMLMotionProps } from 'framer-motion';

import { AnimatePresence, motion } from '@/components/framer-motion';

import { BackToTopButton } from '@/app/components/navigation/back-to-top-button';

import { animateHeightAuto } from '@/constants/animations';
import { routes } from '@/constants/routes';
import { cn } from '@/functions/shared/utils';
import useMediaQuery from '@/hooks/useMediaQuery';
import useWindowOverflow from '@/hooks/useWindowOverflow';

interface MobileNavigationProps extends HTMLMotionProps<'div'> {}

export const MobileNavigation = ({ className, ...restOfProps }: MobileNavigationProps) => {
  const isMobile = useMediaQuery();
  const { isOverflowing } = useWindowOverflow();

  return (
    <AnimatePresence>
      {isMobile && (
        <motion.nav
          className={cn(
            'fixed bottom-0 left-0 flex w-full bg-primary font-bold text-white',
            className
          )}
          {...restOfProps}
          {...animateHeightAuto('56px')}>
          {routes.map(({ href, label, Icon }) => (
            <Link
              key={href}
              className="flex w-full flex-col items-center gap-1 py-2 text-center transition-colors hover-focus:bg-primary-active hover-focus:text-secondary"
              href={href}>
              <Icon />
              <span className="text-xs">{label}</span>
            </Link>
          ))}

          <BackToTopButton />
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

//'use client';
//
// import Link from 'next/link';
//
// import type { HTMLAttributes } from 'react';
//
// import { BackToTopButton } from '@/app/components/navigation';
//
// import { animateHeightAuto } from '@/constants/animations';
// import { routes } from '@/constants/routes';
// import { cn } from '@/functions/shared/utils';
//
// interface MobileNavigationProps extends HTMLAttributes<HTMLElement> {}
//
// export const MobileNavigation = ({ className, ...restOfProps }: MobileNavigationProps) => (
//   <nav
//     className={cn('fixed bottom-0 left-0 flex w-full bg-primary font-bold text-white', className)}
//     {...restOfProps}
//     {...animateHeightAuto}>
//     {routes.map(({ href, label, Icon }) => (
//       <Link
//         key={href}
//         className="flex w-full flex-col items-center gap-1 py-2 text-center transition-colors hover:text-secondary focus:text-secondary"
//         href={href}>
//         <Icon />
//         <span className="text-xs">{label}</span>
//       </Link>
//     ))}
//
//     <BackToTopButton />
//   </nav>
// );
