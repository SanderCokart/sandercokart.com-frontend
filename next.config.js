const million = require('million/compiler');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      {
        protocol: 'http',
        hostname: '*.sandercokart.com',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.it',
      },
    ],
  },
};

module.exports = million.next(nextConfig, { auto: { rsc: true } });
