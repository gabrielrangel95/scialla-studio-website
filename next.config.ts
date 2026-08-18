import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  async redirects() {
    return [
      // The portfolio section was renamed to "projects" — preserve SEO equity
      // and any existing inbound links with permanent redirects.
      {
        source: '/portfolio',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/portfolio/:slug',
        destination: '/projects/:slug',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
