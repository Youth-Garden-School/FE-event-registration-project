/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, 
  },
  images: {
    domains: [
      "slnuqxxrujjguzqowslh.supabase.co",
      "images.lumacdn.com",
    ],
  },
};

module.exports = nextConfig;
