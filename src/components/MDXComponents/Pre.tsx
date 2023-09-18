'use client';

import { useSessionStorage } from '@mantine/hooks';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { twJoin } from 'tailwind-merge';

import { useEffect, useState } from 'react';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { Animation } from '@/types/CommonTypes';

import { AnimatePresence, motion } from '@/components/framer-motion';

import { cn } from '@/functions/shared/utils';

interface PreProps extends ComponentPropsWithoutRef<'pre'> {
  children: ReactNode;
  showLineNumbers?: boolean;
  title?: string;
}

export const Pre = ({ children, title, className, showLineNumbers, ...restOfProps }: PreProps) => {
  const [theme] = useSessionStorage({
    key: 'codeTheme',
    defaultValue: 'tokyo-night-dark',
  });

  return (
    <div className=" flex flex-col">
      <div className="flex justify-between">
        <ul className="flex justify-start">
          <li className="dark:bg-secondaryDark px-2 py-1 empty:hidden">{title}</li>
        </ul>
        <SelectTheme />
      </div>
      <pre
        {...restOfProps}
        className={twJoin(className, theme, 'dark:border-primaryDark relative border-2 border-primary')}>
        {children}
      </pre>
    </div>
  );
};

const SelectTheme = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useSessionStorage({
    key: 'codeTheme',
    defaultValue: 'tokyo-night-dark',
  });

  useEffect(() => {
    import(`../../app/styles/code-highlighting/${theme}.scss`);
  }, [theme]);

  const [initialTheme, setInitialTheme] = useState(theme);

  const containerAnimation: Animation = {
    variants: {
      initial: { height: 0, transition: { duration: 0.15 } },
      animate: { height: 'auto', transition: { duration: 0.15, staggerChildren: 0.05 } },
      exit: { height: 0, transition: { duration: 0.15 }, paddingTop: 0, paddingBottom: 0 },
    },
    animate: 'animate',
    initial: 'initial',
    exit: 'exit',
  };

  return (
    <button
      className="relative flex w-[175px] select-none items-center justify-between gap-1 rounded-t bg-secondary px-2 py-1 font-bold text-secondary-foreground"
      type="button"
      onClick={() => setOpen(open => !open)}
      onMouseLeave={() => {
        setOpen(false);
        setTheme(initialTheme);
      }}>
      {theme}
      <FaChevronDown className={cn('transition-transform', open && '-rotate-180')} />
      <AnimatePresence>
        {open && (
          <motion.div
            {...containerAnimation}
            className="absolute right-0 top-full z-10 w-full cursor-auto space-y-1 overflow-hidden rounded-b-2xl border border-secondary bg-muted p-4 shadow-2xl">
            {themes.map(themeName => (
              <motion.div
                key={themeName}
                className="origin-top cursor-pointer select-none bg-secondary px-2 py-1 text-secondary-foreground hover:bg-secondary-active"
                variants={{
                  initial: {
                    scale: 0,
                  },
                  animate: {
                    scale: 1,
                  },
                }}
                onClick={() => {
                  // setOpen(false);
                  setInitialTheme(themeName);
                  setTheme(themeName);
                }}
                onMouseEnter={() => {
                  setTheme(themeName);
                }}>
                {themeName}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

const themes = [
  // 'agate',
  // 'an-old-hope',
  // 'androidstudio',
  // 'arduino-light',
  // 'arta',
  // 'ascetic',
  'atom-one-dark',
  // 'atom-one-dark-reasonable',
  'atom-one-light',
  // 'brown-paper',
  // 'codepen-embed',
  // 'color-brewer',
  // 'dark',
  // 'default',
  // 'devibeans',
  // 'docco',
  // 'far',
  // 'felipec',
  // 'foundation',
  'github-light',
  'github-dark',
  // 'github-dark-dimmed',
  // 'gml',
  // 'googlecode',
  // 'gradient-dark',
  // 'gradient-light',
  // 'grayscale',
  // 'hybrid',
  // 'idea',
  // 'intellij-light',
  // 'ir-black',
  // 'isbl-editor-dark',
  // 'isbl-editor-light',
  // 'kimbie.dark',
  // 'kimbie.light',
  // 'lightfair',
  // 'lioshi',
  // 'magula',
  // 'mono-blue',
  // 'monokai',
  // 'monokai-sublime',
  // 'night-owl',
  // 'nnfx-dark',
  // 'nnfx-light',
  // 'nord',
  // 'obsidian',
  // 'panda-syntax-dark',
  // 'panda-syntax-light',
  // 'paraiso-dark',
  // 'paraiso-light',
  // 'pojoaque',
  // 'purebasic',
  // 'qtcreator-dark',
  // 'qtcreator-light',
  // 'rainbow',
  // 'routeros',
  // 'school-book',
  // 'shades-of-purple',
  // 'srcery',
  // 'stackoverflow-dark',
  // 'stackoverflow-light',
  // 'sunburst',
  'tokyo-night-dark',
  'tokyo-night-light',
  // 'tomorrow-night-blue',
  // 'tomorrow-night-bright',
  // 'vs',
  // 'vs2015',
  // 'xcode',
  // 'xt256'
];
