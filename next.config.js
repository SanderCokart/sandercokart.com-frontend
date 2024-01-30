const { withSentryConfig } = require('@sentry/nextjs');

const million = require('million/compiler');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // logging: {
  //   fetches: {
  //     fullUrl: false,
  //   },
  // },
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
        protocol: 'https',
        hostname: '*.sandercokart.com',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.it',
      },
    ],
  },
};

module.exports = withSentryConfig(
  million.next(nextConfig, { auto: { rsc: true } }),
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options
    silent: true,
    org: 'sanders-codehouse',
    project: 'sandercokart-com',
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
  },
);
