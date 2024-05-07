/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "gjdbafvktbovctaxdhjz.supabase.co",
      },
      {
        protocol: "https",
        hostname:
          "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname:
          "loremflickr.com",
      },
      {
        protocol: "https",
        hostname:
          "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
