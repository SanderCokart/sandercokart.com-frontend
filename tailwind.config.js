const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-roboto)', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                accent: colors.red['900'],
                hover: colors.red['800'],
            },
            width: {
                ...defaultTheme.screens
            },
            maxWidth: {
                ...defaultTheme.screens
            },
            minWidth: {
                ...defaultTheme.screens
            }
        },
        screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px'
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/line-clamp'),
    ],
    darkMode: ['class', '[data-theme="dark"]']
};
