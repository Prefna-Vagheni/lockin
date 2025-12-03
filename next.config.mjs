/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      { protocol: 'https', hostname: 'zkevvqhnjdwaxfyxxcfk.supabase.co' },
    ],
  },
};

export default nextConfig;
