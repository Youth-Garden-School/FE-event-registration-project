/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "slnuqxxrujjguzqowslh.supabase.co",
      "images.lumacdn.com", // ✅ Add this line
    ],
  },
};

module.exports = nextConfig;
