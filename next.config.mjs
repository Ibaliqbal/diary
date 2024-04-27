/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "img.clerk.com",
      },
    ],
  },
  redirects: [
    {
      source: "/dashboard",
      destination: "/dashboard/my-diary",
      permanent: false,
    },
    {
      source: "/diary/:id*",
      destination: "/dashboard/my-diary",
      permanent: false,
    },
    {
      source: "/diary/:id",
      destination: "/dashboard/my-comments",
      permanent: false,
    },
  ],
};

export default nextConfig;
