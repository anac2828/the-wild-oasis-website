/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allows us to use the nextjs Image component without setting the high and width.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nlovbzcjlodktqpwmpdu.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/cabin-images/**',
      },
    ],
  },
  // output: 'export', //Will export as static assets to deploy on any hosting service. All pages on your site need to be static.
};

export default nextConfig;
