/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    IPFS_URL: process.env.IPFS_URL,
    IPFS_PROJEC_ID: process.env.IPFS_PROJEC_ID,
    IPFS_PROJECT_SECRET: process.env.IPFS_PROJECT_SECRET,
  },
};

module.exports = nextConfig;
