'use client';

import { AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { CgSun } from 'react-icons/cg';
import { FaDesktop, FaMoon } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

import type { ComponentProps } from 'react';

import BasicAnimation from '@/components/FramerMotion/BasicAnimation';

import { ascendVariant, descendVariant } from '@/constants/animations/ascendAndDecend';
import { fadeVariant } from '@/constants/animations/fade';
import useMounted from '@/hooks/useMounted';

export const ThemeToggle = ({ className, ...props }: ComponentProps<'div'>) => {
  const { mounted } = useMounted();
  const { setTheme, theme } = useTheme();

  if (!mounted) return null;

  return (
    <div className={twMerge('relative grid place-items-center', className)} {...props}>
      <AnimatePresence mode="wait">
        {theme === 'light' && (
          <BasicAnimation key="light" variants={ascendVariant}>
            <CgSun
              className="cursor-pointer text-black transition-colors hover-focus:text-secondary"
              tabIndex={0}
              onClick={() => setTheme('dark')}
            />
          </BasicAnimation>
        )}

        {theme === 'dark' && (
          <BasicAnimation key="dark" variants={descendVariant}>
            <FaMoon
              className="cursor-pointer text-white transition-colors hover-focus:text-secondary"
              tabIndex={0}
              onClick={() => setTheme('system')}
            />
          </BasicAnimation>
        )}

        {theme === 'system' && (
          <BasicAnimation key="system" variants={fadeVariant}>
            <FaDesktop
              className="cursor-pointer text-white transition-colors hover-focus:text-secondary"
              tabIndex={0}
              onClick={() => setTheme('light')}
            />
          </BasicAnimation>
        )}
      </AnimatePresence>
    </div>
  );
};
