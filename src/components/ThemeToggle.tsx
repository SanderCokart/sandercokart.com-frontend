'use client';

import { AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';

import BasicAnimation from '@/components/FramerMotion/BasicAnimation';

import { ascendVariant, descendVariant } from '@/constants/animations/ascendAndDecend';

import useMounted from '@/hooks/useMounted';

export function ThemeToggle() {
  const { mounted } = useMounted();
  const { setTheme, theme, systemTheme } = useTheme();

  if (!mounted) return null;

  return (
    <div className="relative grid place-items-center text-2xl">
      <AnimatePresence mode="wait">
        {(theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) && (
          <BasicAnimation key="light" variants={descendVariant}>
            <FaSun
              className="cursor-pointer transition-colors hover:text-yellow-400"
              onClick={() => setTheme('light')}
            />
          </BasicAnimation>
        )}

        {(theme === 'light' || (theme === 'system' && systemTheme === 'light')) && (
          <BasicAnimation key="dark" variants={descendVariant}>
            <FaMoon className="cursor-pointer transition-colors hover:text-white" onClick={() => setTheme('dark')} />
          </BasicAnimation>
        )}
      </AnimatePresence>
    </div>
  );
}
