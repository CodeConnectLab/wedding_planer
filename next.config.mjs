/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Admins can paste image URLs from any https host (Cloudinary uploads are the default).
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  async redirects() {
    return [
      { source: '/portfolio', destination: '/gallery', permanent: true },
      { source: '/portfolio/:slug', destination: '/gallery/:slug', permanent: true },
    ];
  },
  // Disable telemetry to avoid trace file issues
  experimental: {
    instrumentationHook: false,
  },
};

export default nextConfig;
