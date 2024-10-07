/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: {
      // Enabled by default.
      cssProp: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgflip.com",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
