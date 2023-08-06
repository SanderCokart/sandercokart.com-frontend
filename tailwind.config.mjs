const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'ring-pulse-primary': 'ring-pulse-primary 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ring-pulse-secondary': 'ring-pulse-secondary 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: ({ theme }) => ({
        'ring-pulse-primary': {
          '0%': { boxShadow: `0 0 0 0 ${theme('colors.primary')}AA` },
          '100%': { boxShadow: `0 0 0 6px ${theme('colors.primary')}00` }
        },
        'ring-pulse-secondary': {
          '0%': { boxShadow: `0 0 0 0 ${theme('colors.secondary')}AA` },
          '100%': { boxShadow: `0 0 0 6px ${theme('colors.secondary')}00` }
        }
      }),
      fontFamily: {
        sans: ['var(--font-roboto)', ...defaultTheme.fontFamily.sans],
        code: 'var(--font-cascadia-mono)',
        digital: 'var(--font-digital)'
      },
      colors: {
        background: {
          DEFAULT: 'hsl(var(--background) / <alpha-value>)',
          foreground: 'hsl(var(--background-foreground) / <alpha-value>)',
        },
        muted:{
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        primary:{
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
          active: 'hsl(var(--primary-active) / <alpha-value>)',
        },
        secondary:{
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
          active: 'hsl(var(--secondary-active) / <alpha-value>)',
        },
        misc:{
          react: '#61dafb',
          laravel: '#ff2d20',
          vue: '#42b883'
        }
        // 'body': 'hsl(var(--color-body) / <alpha-value>)',
        // 'body-muted': 'hsl(var(--color-body-muted) / <alpha-value>)',
        // 'body-foreground': 'hsl(var(--color-body-foreground) / <alpha-value>)',
        // 'primary': 'hsl(var(--color-primary) / <alpha-value>)',
        // 'primary-foreground': 'hsl(var(--color-primary-foreground) / <alpha-value>)',
        // 'primary-active': 'hsl(var(--color-primary-active) / <alpha-value>)',
        // 'secondary': 'hsl(var(--color-secondary) / <alpha-value>)',
        // 'secondary-foreground': 'hsl(var(--color-secondary-foreground) / <alpha-value>)',
        // 'secondary-active': 'hsl(var(--color-secondary-active) / <alpha-value>)',
        //
        // 'react': '#61dafb',
        // 'laravel': '#ff2d20',
        // 'vue': '#42b883'
      },
      container: {
        center: true
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2048px',
        '5xl': '2560px',
        '6xl': '3840px'
      },
      dropShadow: ({ theme }) => ({
        'light': `0 0px 10px rgba(0, 0, 0, 0.5)`,
        'dark': `0 0px 10px ${theme('colors.primary')}`,
        'react': `0 0px 10px ${theme('colors.react')}`,
        'laravel': `0 0px 10px ${theme('colors.laravel')}`,
        'vue': `0 0px 10px ${theme('colors.vue')}`,
        'next': `0 0px 10px #fff`,
        'primary': `0 0px 10px ${theme('colors.primary')}`,
        'secondary': `0 0px 10px ${theme('colors.secondary')}`,
        'hard-sm': '0 2px 0 #000'
      }),
      textShadow: ({ theme }) => ({
        react: `0 0 50px ${theme('colors.react')}`,
        laravel: `0 0px 50px ${theme('colors.laravel')}`,
        vue: `0 0px 50px ${theme('colors.vue')}`,
        next: `0 0px 50px #fff`,
        none: 'none'
      }),
      minHeight: ({ theme }) => ({
        desktop: `calc(100dvh - ${theme('spacing.header-desktop')})`,
        between: `calc(100dvh - ${theme('spacing.header-desktop')} - ${theme(
          'spacing.header-mobile'
        )})`,
        mobile: `calc(100dvh - ${theme('spacing.nav-mobile')} - ${theme('spacing.header-mobile')})`
      }),
      spacing: {
        'header-desktop': defaultTheme.spacing[16],
        'header-mobile': defaultTheme.spacing[11],
        'nav-mobile': defaultTheme.spacing[14]
      },
      boxShadow: {
        'hard-sm': '0 2px 0 0 #000'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': value => ({
            textShadow: value
          })
        },
        { values: theme('textShadow') }
      );
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'w-screen': value => ({
            width: value
          })
        },
        { values: theme('screens') }
      );
    }),
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.label': {
          display: 'block',
          fontWeight: theme('fontWeight.bold'),
          paddingTop: theme('spacing.1'),
          paddingRight: theme('spacing.4'),
          paddingBottom: theme('spacing.1'),
          paddingLeft: theme('spacing.4'),
          backgroundColor: 'hsl(var(--secondary))',
          color: 'hsl(var(--secondary-foreground))',
          boxShadow: theme('boxShadow.hard-sm'),
          fontFamily: theme('fontFamily.code'),
        }
      });
    })
  ]
};
