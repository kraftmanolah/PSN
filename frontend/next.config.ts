// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'http://localhost:8000/api/:path*',  // Proxy API requests
//       },
//       {
//         source: '/media/:path*',
//         destination: 'http://localhost:8000/media/:path*',  // Proxy media requests
//       },
//     ];
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*", // Proxy API requests
      },
      {
        source: "/media/:path*",
        destination: "http://localhost:8000/media/:path*", // Proxy media requests
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**", // Matches /media/cart_designs/...
      },
    ],
  },
};

export default nextConfig;