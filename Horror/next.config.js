/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.ico$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/[path][name][ext]'
      }
    });
    return config;
  }
};

module.exports = nextConfig;