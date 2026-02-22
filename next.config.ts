import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb', // デフォルトではアップロードできるサイズの上限が1MBのため変更する
    },
  },
};

export default nextConfig;
