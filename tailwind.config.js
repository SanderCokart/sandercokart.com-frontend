const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
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
        },
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
    darkMode: ['class', '[data-theme="dark"]']
};
