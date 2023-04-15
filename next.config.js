/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typescript: {
      ignoreBuildErrors: true,
    },
    appDir: true,
    serverComponentsExternalPackages: ["bcrypt"],
  },
};

module.exports = nextConfig;
