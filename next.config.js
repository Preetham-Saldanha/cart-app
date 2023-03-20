/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['fakestoreapi.com'],
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'fakestoreapi.com',
  //       port: '',
  //       pathname: '/img/*',
  //     },
  //   ],
  // }
}

module.exports = nextConfig
