'use client';
import hljs from 'highlight.js';
import type {ReactNode, ComponentPropsWithoutRef} from 'react';
import {useEffect} from 'react';
import {twJoin} from 'tailwind-merge';
import './styles.scss';
import {useSessionStorage} from '@mantine/hooks';

interface PreProps extends ComponentPropsWithoutRef<'pre'> {
    children: ReactNode;
    title?: string;
}

const Pre = ({ children, title, className, ...restOfProps }: PreProps) => {

    const [theme, setTheme] = useSessionStorage({ key: 'codeTheme', defaultValue: 'tokyo-night-dark' });

    useEffect(() => {
        hljs.configure({
            ignoreUnescapedHTML: true
        });
        hljs.initHighlighting();
    }, []);

    return (
        <div className=" flex flex-col">

            <div className="flex justify-between">
                <ul className="flex justify-start">
                    <li className="px-2 py-1 empty:hidden dark:bg-secondaryDark">{title}</li>
                </ul>
                <select className="py-0 text-black" id="theme" name="theme" value={theme} onChange={e => setTheme(e.target.value)}>
                    {themes.map((theme) => (
                        <option key={theme} value={theme}>
                            {theme}
                        </option>
                    ))}
                </select>
            </div>
            <pre {...restOfProps} className={twJoin(
                className,
                theme,
                'border-2 dark:border-secondaryDark'
            )}>
            {children}
        </pre>
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
    'github',
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