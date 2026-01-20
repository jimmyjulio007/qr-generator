import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable source maps in production for better debugging and Lighthouse insights
  productionBrowserSourceMaps: true,

  // Compiler optimizations for modern browsers
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Target modern browsers to reduce polyfills
  experimental: {
    // Optimize CSS loading
    optimizeCss: true,
    // Optimize package imports
    optimizePackageImports: ['lucide-react', 'framer-motion', 'react-hook-form'],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Content Security Policy - helps prevent XSS attacks
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js requires unsafe-eval and unsafe-inline for development
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
          // Cross-Origin-Opener-Policy - helps isolate the browsing context
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          // Cross-Origin-Resource-Policy
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
          // X-Frame-Options - prevents clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // X-Content-Type-Options - prevents MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Referrer-Policy - controls referrer information
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions-Policy - controls browser features
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
