'use client';

import { useSessionStorage } from '@mantine/hooks';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { twJoin } from 'tailwind-merge';

import { createContext, useContext, useEffect, useState } from 'react';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface PreProps extends ComponentPropsWithoutRef<'pre'> {
  children: ReactNode;
  showLineNumbers?: boolean;
  title?: string;
}

export const Pre = ({ children, title, className, showLineNumbers, ...restOfProps }: PreProps) => {
  const [theme] = useSessionStorage({
    key: 'codeTheme',
    defaultValue: 'tokyo-night-dark'
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
        className={twJoin(
          className,
          theme,
          'dark:border-primaryDark relative border-2 border-primary'
        )}>
        {children}
      </pre>
    </div>
  );
};

const SelectTheme = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useSessionStorage({
    key: 'codeTheme'
  });
  const [initialTheme, setInitialTheme] = useState(theme);

  return (
    <div
      className="relative flex cursor-pointer items-center gap-1 rounded-t bg-secondary px-2 py-1 text-secondary-foreground"
      onClick={() => setOpen(open => !open)}
      onMouseLeave={() => {
        setOpen(false);
      }}>
      {theme}
      {open ? <FaChevronUp /> : <FaChevronDown />}
      {open && (
        <div
          className="bg-secondaryDark absolute right-0 top-8 z-10 flex w-[200px] flex-col gap-1 rounded-b"
          onMouseLeave={() => setOpen(false)}>
          {themes.map(themeName => (
            <div
              key={themeName}
              className="cursor-pointer select-none bg-secondary px-2 py-1 text-secondary-foreground hover:bg-secondary-active"
              onClickCapture={() => {
                setOpen(false);
                setInitialTheme(themeName);
                setTheme(themeName);
              }}
              onMouseEnter={() => {
                import(`../../app/styles/code-highlighting/${themeName}.scss`);
                setTheme(themeName);
              }}
              onMouseLeave={() => {
                setTheme(initialTheme);
              }}>
              {themeName}
            </div>
          ))}
        </div>
      )}
    </div>
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
  'tokyo-night-light'
  // 'tomorrow-night-blue',
  // 'tomorrow-night-bright',
  // 'vs',
  // 'vs2015',
  // 'xcode',
  // 'xt256'
];
