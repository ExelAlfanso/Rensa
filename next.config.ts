import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["picsum.photos", "res.cloudinary.com"], // add any external image domains here
  },
};

export default nextConfig;
