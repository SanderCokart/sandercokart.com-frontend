const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content:  [
        './src/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    darkMode: 'class',
    theme:    {
        extend: {
            animation:      {
                'ring-pulse-primary':   'ring-pulse-primary 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'ring-pulse-secondary': 'ring-pulse-secondary 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }, keyframes:   ({theme}) => ({
                'ring-pulse-primary':      {
                    '0%':   {boxShadow: `0 0 0 0 ${theme('colors.primary')}AA`},
                    '100%': {boxShadow: `0 0 0 6px ${theme('colors.primary')}00`}
                }, 'ring-pulse-secondary': {
                    '0%':   {boxShadow: `0 0 0 0 ${theme('colors.secondary')}AA`},
                    '100%': {boxShadow: `0 0 0 6px ${theme('colors.secondary')}00`}
                }
            }), fontFamily: {
                sans:      ['var(--font-roboto)', ...defaultTheme.fontFamily.sans],
                'code':    'var(--font-cascadia-mono)',
                'digital': 'var(--font-digital)'
            }, colors:      {
                bodyLight:          colors.slate[100],
                bodyLightSecondary: colors.slate[200],
                bodyDark:           colors.slate[900],
                bodyDarkSecondary:  colors.slate[800],
                primary:            colors.blue[500],
                primaryDark:        colors.blue[900],
                secondary:          colors.amber[400],
                secondaryDark:      colors.amber[600],
                react:              '#61dafb',
                laravel:            '#ff2d20',
                vue:                '#42b883'
            }, screens:     {
                'sm':  '640px',
                'md':  '768px',
                'lg':  '1024px',
                'xl':  '1280px',
                '2xl': '1536px',
                '3xl': '1920px',
                '4xl': '2048px',
                '5xl': '2560px',
                '6xl': '3840px'
            }, dropShadow:  ({theme}) => ({
                'light':     `0 0px 10px rgba(0, 0, 0, 0.5)`,
                'dark':      `0 0px 10px ${theme('colors.primary')}`,
                'react':     `0 0px 10px ${theme('colors.react')}`,
                'laravel':   `0 0px 10px ${theme('colors.laravel')}`,
                'vue':       `0 0px 10px ${theme('colors.vue')}`,
                'next':      `0 0px 10px #fff`,
                'primary':   `0 0px 10px ${theme('colors.primary')}`,
                'secondary': `0 0px 10px ${theme('colors.secondary')}`,
                'hard-sm':   '0 2px 0 #000',
            }), textShadow: ({theme}) => ({
                'react':   `0 0 50px ${theme('colors.react')}`,
                'laravel': `0 0px 50px ${theme('colors.laravel')}`,
                'vue':     `0 0px 50px ${theme('colors.vue')}`,
                'next':    `0 0px 50px #fff`,
                'none':    'none'
            }), minHeight:  ({theme}) => ({
                'desktop': `calc(100dvh - ${theme('spacing.header-desktop')})`,
                'between': `calc(100dvh - ${theme('spacing.header-desktop')} - ${theme('spacing.header-mobile')})`,
                'mobile':  `calc(100dvh - ${theme('spacing.nav-mobile')} - ${theme('spacing.header-mobile')})`,
            }), spacing:    {
                'header-desktop': '68px',
                'header-mobile':  '44px',
                'nav-mobile':     '56px'
            }, boxShadow: {
                'hard-sm':   '0 2px 0 0 #000',
            }
        }
    },
    plugins:  [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        plugin(function ({matchUtilities, theme}) {
            matchUtilities({
                'text-shadow': (value) => ({
                    textShadow: value
                })
            }, {values: theme('textShadow')});
        }),
        //w-screen-{theme.screens}
        plugin(function ({matchUtilities, theme}) {
            matchUtilities({
                'w-screen': (value) => ({
                    width: value
                })
            }, {values: theme('screens')});
        })
    ]
};