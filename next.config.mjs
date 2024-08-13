/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
    ],
  },
  experimental: {
    staleTimes: {
      dynamic: 5,
      // static: 180,
    },
  },
}

export default nextConfig
