/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'be-event-registration-project-jpv3.onrender.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn11.dienmaycholon.vn',
        port: '',
        pathname: '/**',
      },
      // bạn có thể thêm các host khác tương tự ở đây
    ],
  },
};
