const million = require('million/compiler');
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images:          {
        domains: ['localhost', '127.0.0.1', '*.sandercokart.com', 'unsplash.it'],
    }
};

module.exports = million.next(
  nextConfig, { auto: { rsc: true } }
);
