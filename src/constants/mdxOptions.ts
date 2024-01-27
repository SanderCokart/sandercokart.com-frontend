import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';

import type { SerializeOptions } from 'next-mdx-remote/dist/types';

const themes = {
  'css-variables': 'css-variables',
  'dark-plus': 'dark-plus',
  'dracula-soft': 'dracula-soft',
  'dracula': 'dracula',
  'github-dark-dimmed': 'github-dark-dimmed',
  'github-dark': 'github-dark',
  'github-light': 'github-light',
  'hc_light': 'hc_light',
  'light-plus': 'light-plus',
  'material-theme-darker': 'material-theme-darker',
  'material-theme-lighter': 'material-theme-lighter',
  'material-theme-ocean': 'material-theme-ocean',
  'material-theme-palenight': 'material-theme-palenight',
  'material-theme': 'material-theme',
  'min-dark': 'min-dark',
  'min-light': 'min-light',
  'monokai': 'monokai',
  'nord': 'nord',
  'one-dark-pro': 'one-dark-pro',
  'poimandres': 'poimandres',
  'rose-pine-dawn': 'rose-pine-dawn',
  'rose-pine-moon': 'rose-pine-moon',
  'rose-pine': 'rose-pine',
  'slack-dark': 'slack-dark',
  'slack-ochin': 'slack-ochin',
  'solarized-dark': 'solarized-dark',
  'solarized-light': 'solarized-light',
  'vitesse-dark': 'vitesse-dark',
  'vitesse-light': 'vitesse-light',
};

const mdxOptions: SerializeOptions['mdxOptions'] = {
  remarkPlugins: [remarkToc, remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [
      // @ts-ignore
      rehypePrettyCode,
      {
        theme: {
          light: themes['rose-pine-dawn'],
          dark: themes['one-dark-pro'],
        },
      },
    ],
  ],
  useDynamicImport: true,
};

export default mdxOptions;
