/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    eslint: {
      ignoreBuildErrors: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    appDir: true,
    serverComponentsExternalPackages: ["bcrypt"],
  },
};

module.exports = nextConfig;
