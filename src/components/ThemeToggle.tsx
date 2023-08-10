'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { CgSun } from 'react-icons/cg';
import { FaDesktop, FaMoon } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

import type { ComponentProps } from 'react';

import { animateAscend, animateDescend, animateFade } from '@/constants/animations';
import useMounted from '@/hooks/useMounted';

export const ThemeToggle = ({ className, ...props }: ComponentProps<'div'>) => {
  const { mounted } = useMounted();
  const { setTheme, theme } = useTheme();

  if (!mounted) return null;

  return (
    <div className={twMerge('relative grid place-items-center', className)} {...props}>
      <AnimatePresence mode="wait">
        {theme === 'light' && (
          <motion.div key="light" {...animateAscend}>
            <CgSun
              className="focusable cursor-pointer text-black transition-colors hover-focus:text-secondary"
              tabIndex={0}
              onClick={() => setTheme('dark')}
            />
          </motion.div>
        )}

        {theme === 'dark' && (
          <motion.div key="dark" {...animateDescend}>
            <FaMoon
              className="focusable cursor-pointer text-white transition-colors hover-focus:text-secondary"
              tabIndex={0}
              onClick={() => setTheme('system')}
            />
          </motion.div>
        )}

        {theme === 'system' && (
          <motion.div key="system" {...animateFade}>
            <FaDesktop
              className="focusable cursor-pointer text-white transition-colors hover-focus:text-secondary"
              tabIndex={0}
              onClick={() => setTheme('light')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
