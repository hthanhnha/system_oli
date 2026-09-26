import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, "../../"),
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/menu/home',
        permanent: false, // Để false để nếu sau này đổi ý thì không bị cache ở trình duyệt
      },
    ];
  },
};

export default nextConfig;

