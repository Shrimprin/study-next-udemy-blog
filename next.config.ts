import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'xdwylzwbmpgzwyrtcytm.supabase.co',
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
