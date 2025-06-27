import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const config: NextConfig = {
  images: {
    dangerouslyAllowSVG: true, // since contrib.rocks provides SVG images.
    contentDispositionType: "attachment", // to prevent scripts embedded in the SVG image from executing.
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // to prevent scripts embedded in the SVG image from executing.
    remotePatterns: [
      new URL("https://contrib.rocks/image?repo=yytypescript/book"),
    ],
  },
  async rewrites() {
    return [
      {
        source: "/:path*.md",
        destination: "/llms.mdx/:path*",
      },
      {
        source: "/:path*.mdx",
        destination: "/llms.mdx/:path*",
      },
    ];
  },
  reactStrictMode: true,
  serverExternalPackages: ["typescript", "twoslash"],
};

export default withMDX(config);
