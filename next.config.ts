import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV !== "production";
const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");
if (
  !["http:", "https:"].includes(apiUrl.protocol) ||
  apiUrl.username || apiUrl.password || apiUrl.hostname.includes("*") ||
  (!isDevelopment && apiUrl.protocol !== "https:")
) {
  throw new Error("NEXT_PUBLIC_API_URL must be HTTP(S), without credentials, and HTTPS in production");
}

// Static/partially prerendered pages need inline hydration scripts. Before
// serving financial dashboards, use a nonce-based policy with dynamic rendering.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' ${apiUrl.origin}${isDevelopment ? " ws://localhost:3001 ws://127.0.0.1:3001" : ""}`,
  "frame-src https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(!isDevelopment ? ["upgrade-insecure-requests"] : []),
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "Content-Security-Policy", value: contentSecurityPolicy },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ...(!isDevelopment ? [{
          key: "Strict-Transport-Security", value: "max-age=31536000",
        }] : []),
      ],
    }];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
