import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Experimental features for better performance
  experimental: {
    // Optimize package imports to reduce bundle size
    optimizePackageImports: [
      "@copilotkit/react-ui",
      "@copilotkit/react-core",
      "recharts",
    ],
  },

  images: {
    // Use modern image formats for better compression
    formats: ["image/avif", "image/webp"],
    // Optimize device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },

  // Compiler options for smaller bundle
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },
  async redirects() {
    return [
      // MIAM cluster redirects
      {
        source: "/miam/what-is-a-miam",
        destination: "/what-is-a-miam",
        permanent: true,
      },
      {
        source: "/miam/certificate",
        destination: "/miam-certificate",
        permanent: true,
      },
      {
        source: "/miam/exemptions",
        destination: "/miam-exemptions",
        permanent: true,
      },
      {
        source: "/miam/cost",
        destination: "/miam-cost",
        permanent: true,
      },
      {
        source: "/miam/form-fm1",
        destination: "/form-fm1",
        permanent: true,
      },
      // Mediation cluster redirects
      {
        source: "/mediation/what-is-mediation",
        destination: "/what-is-mediation",
        permanent: true,
      },
      {
        source: "/mediation/cost",
        destination: "/mediation-cost",
        permanent: true,
      },
      {
        source: "/mediation/family",
        destination: "/family-mediation",
        permanent: true,
      },
      {
        source: "/mediation/free",
        destination: "/free-mediation",
        permanent: true,
      },
      {
        source: "/mediation/legal-aid",
        destination: "/legal-aid-mediation",
        permanent: true,
      },
      {
        source: "/mediation/divorce-mediation",
        destination: "/divorce-mediation",
        permanent: true,
      },
      {
        source: "/mediation/workplace",
        destination: "/workplace-mediation",
        permanent: true,
      },
      {
        source: "/mediation/shuttle-mediation",
        destination: "/shuttle-mediation",
        permanent: true,
      },
      {
        source: "/mediation/how-long-does-mediation-take",
        destination: "/how-long-does-mediation-take",
        permanent: true,
      },
      {
        source: "/mediation/benefits-of-mediation",
        destination: "/benefits-of-mediation",
        permanent: true,
      },
      {
        source: "/mediation/family-mediation-voucher-scheme",
        destination: "/family-mediation-voucher-scheme",
        permanent: true,
      },
      // Forms cluster redirects
      {
        source: "/forms/c100",
        destination: "/c100-form",
        permanent: true,
      },
      // Court orders cluster redirects
      {
        source: "/court-orders/consent-order",
        destination: "/consent-order",
        permanent: true,
      },
      {
        source: "/court-orders/prohibited-steps-order",
        destination: "/prohibited-steps-order",
        permanent: true,
      },
      {
        source: "/court-orders/specific-issue-order",
        destination: "/specific-issue-order",
        permanent: true,
      },
      // Guides cluster redirects
      {
        source: "/guides/parenting-plan",
        destination: "/parenting-plan",
        permanent: true,
      },
      {
        source: "/guides/parallel-parenting",
        destination: "/parallel-parenting",
        permanent: true,
      },
      {
        source: "/guides/supervised-contact",
        destination: "/supervised-contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
