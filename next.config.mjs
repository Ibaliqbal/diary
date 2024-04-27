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
      has: [
        {
          type: "header",
          key: "x-redirect-me",
        },
      ],
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
      has: [
        {
          type: "query",
          key: "comment",
          value: "true",
        },
      ],
    },
  ],
};

export default nextConfig;
