import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    qualities: [25, 50, 75, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1400, 1920, 2048, 3840, 3975],
  },
};

export default nextConfig;
