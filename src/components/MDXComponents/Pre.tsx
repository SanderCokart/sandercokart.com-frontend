'use client';
import type {ReactNode, ComponentPropsWithoutRef} from 'react';
import {createContext, useContext} from 'react';

import {useSessionStorage} from '@mantine/hooks';
import {twJoin} from 'tailwind-merge';

interface PreProps extends ComponentPropsWithoutRef<'pre'> {
    children: ReactNode;
    showLineNumbers?: boolean;
    title?: string;
}

const PreContext = createContext({} as { theme: string; });
export const usePreContext = () => useContext(PreContext);

const Pre = ({ children, title, className, showLineNumbers, ...restOfProps }: PreProps) => {
    const [theme, setTheme] = useSessionStorage({ key: 'codeTheme', defaultValue: 'tokyo-night-dark'});
    return (
        <div className=" flex flex-col">
            <div className="flex justify-between">
                <ul className="flex justify-start">
                    <li className="px-2 py-1 empty:hidden dark:bg-secondaryDark">{title}</li>
                </ul>
                <select className="cursor-pointer rounded-t bg-secondary py-0 text-black dark:bg-secondaryDark dark:text-white" id="theme" name="theme" value={theme} onChange={e => setTheme(e.target.value)}>
                    {themes.map((theme) => (
                        <option key={theme} className="cursor-pointer bg-secondary dark:bg-secondaryDark" value={theme}>
                            {theme}
                        </option>
                    ))}
                </select>
            </div>
            <PreContext.Provider value={{ theme }}>
                <pre {...restOfProps} className={twJoin(
                    className,
                    theme,
                    'relative border-2 border-primary dark:border-primaryDark'
                )}>
                    {children}
                </pre>
            </PreContext.Provider>
        </div>
    );
};

export default Pre;

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