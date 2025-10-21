/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // If you're using images from external domains, add them here
  images: {
    domains: [],
  },
}

module.exports = nextConfig