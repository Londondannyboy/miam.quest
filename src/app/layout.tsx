import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BetaBanner } from "@/components/BetaBanner";
import { CookieConsent } from "@/components/CookieConsent";
import "@copilotkit/react-ui/styles.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Miam Certificate Quest | Free MIAM Certificate Help UK",
    template: "%s | Miam Certificate Quest",
  },
  description:
    "Get your MIAM certificate with free AI help. Prepare for your Mediation Information Assessment Meeting and understand MIAM certificates for family court in England & Wales.",
  keywords: [
    "miam",
    "miam certificate",
    "what is a miam",
    "miam mediation",
    "miam exemption",
    "c100 form",
    "family mediation",
    "mediation uk",
    "child arrangements",
    "divorce mediation",
    "mediation costs uk",
    "mediation preparation",
    "family court",
  ],
  authors: [{ name: "Miam Certificate Quest" }],
  creator: "Miam Certificate Quest",
  publisher: "Miam Certificate Quest",
  metadataBase: new URL("https://miam.quest"),
  alternates: {
    canonical: "https://miam.quest",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://miam.quest",
    siteName: "Miam Certificate Quest",
    title: "Miam Certificate Quest | Free MIAM Certificate Preparation",
    description:
      "Get your MIAM certificate with free AI help. Understand MIAM certificates, prepare for mediation, and connect with accredited mediators in England & Wales.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miam Certificate Quest | Free MIAM Certificate Help",
    description:
      "Get your MIAM certificate with free AI help. Understand MIAM certificates and prepare for family court in England & Wales.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD structured data
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://miam.quest/#website",
  name: "Miam Certificate Quest",
  alternateName: ["MIAM Certificate Help", "MIAM Quest", "MIAM Mediation Preparation"],
  url: "https://miam.quest",
  description:
    "Free AI-powered MIAM certificate preparation platform for UK families. Get help with your MIAM certificate, understand the process, and connect with accredited mediators.",
  inLanguage: "en-GB",
  publisher: {
    "@type": "Organization",
    "@id": "https://miam.quest/#organization",
    name: "Miam Certificate Quest",
    url: "https://miam.quest",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://miam.quest/#organization",
  name: "Miam Certificate Quest",
  url: "https://miam.quest",
  description:
    "AI-powered MIAM certificate preparation platform helping UK families prepare for their legally-required MIAM meetings and obtain their MIAM certificate.",
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
  serviceType: ["MIAM Certificate Preparation", "Mediation Preparation", "Family Dispute Resolution Support"],
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://miam.quest/#app",
  name: "Miam Certificate Quest",
  description:
    "Free AI-powered MIAM certificate preparation assistant for UK families going through separation or divorce.",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "GBP",
  },
  featureList: [
    "Voice-first AI conversation with Miam",
    "MIAM certificate guidance",
    "MIAM process education",
    "Position capture and organization",
    "Preparation document generation",
    "Accredited mediator directory",
    "Exemption eligibility checking",
    "C100 form guidance",
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Miam Certificate Quest",
      item: "https://miam.quest",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Miam Certificate Quest" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <BetaBanner />
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
