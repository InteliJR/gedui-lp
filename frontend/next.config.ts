import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  // ✅ Compressão de assets
  compress: true,
  // ✅ Power by header (segurança)
  poweredByHeader: false,
};

export default nextConfig;