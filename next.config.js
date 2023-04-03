/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images:          {
        domains: ['localhost', '127.0.0.1', '*.sandercokart.com', 'unsplash.it'],
    }
};

module.exports = nextConfig;
