/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  output: 'export',
  ...(isGitHubPages
    ? {
        basePath: '/bemybuddy',
        trailingSlash: true,
      }
    : {}),
};

module.exports = nextConfig;
