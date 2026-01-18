import { Metadata } from "next";

export interface PageSEO {
  title: string;
  description: string;
  keywords: readonly string[] | string[];
  canonical: string;
  ogImage?: string;
}

const SITE_URL = "https://miam.quest";
const SITE_NAME = "MIAM.quest - AI Mediation Preparation";

export function generateMetadata(page: PageSEO): Metadata {
  const fullTitle = `${page.title} | ${SITE_NAME}`;
  const ogImage = page.ogImage || `${SITE_URL}/og-image.png`;

  return {
    title: fullTitle,
    description: page.description,
    keywords: [...page.keywords] as string[],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: page.canonical,
    },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: page.canonical,
      siteName: SITE_NAME,
      title: page.title,
      description: page.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [ogImage],
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
}

// JSON-LD Schema generators
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: ["MIAM Preparation", "AI Mediation", "Family Mediation Preparation"],
    url: SITE_URL,
    description: "Free AI-powered mediation preparation for UK family disputes. Prepare for your MIAM meeting with Miam, your compassionate AI guide.",
    inLanguage: "en-GB",
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function generateServiceSchema(page: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${page.url}/#app`,
    name: page.name,
    description: page.description,
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
    },
    featureList: [
      "AI-powered mediation preparation",
      "Voice conversations with Miam",
      "Position capture and summary",
      "Find FMC-accredited mediators",
      "Child-focused approach",
      "MIAM information and guidance",
    ],
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Page-specific SEO configs
export const PAGE_SEO = {
  home: {
    title: "MIAM.quest | Free AI Mediation Preparation for UK Families",
    description: "Free AI-powered mediation preparation for UK family disputes. Chat with Miam, your compassionate AI guide, to prepare for your MIAM meeting. Child-focused, neutral support.",
    keywords: [
      "miam",
      "miam mediation",
      "mediation preparation",
      "family mediation",
      "child arrangements",
      "separation support",
      "divorce mediation",
    ],
    canonical: SITE_URL,
  },
  whatIsMiam: {
    title: "What is a MIAM? | Mediation Information Assessment Meeting Explained",
    description: "Learn what a MIAM is, why it's required before court, what happens at a MIAM meeting, and how to prepare. Free guidance from MIAM.quest.",
    keywords: [
      "what is a miam",
      "miam meaning",
      "mediation information assessment meeting",
      "miam explained",
      "miam meeting",
    ],
    canonical: `${SITE_URL}/miam/what-is-a-miam`,
  },
  certificate: {
    title: "MIAM Certificate | What It Is & How to Get One",
    description: "Everything you need to know about MIAM certificates. Who can issue them, what they contain, and why you need one for family court applications.",
    keywords: [
      "miam certificate",
      "miam form",
      "fm1 form",
      "mediation certificate",
      "miam evidence",
    ],
    canonical: `${SITE_URL}/miam/certificate`,
  },
  c100: {
    title: "C100 Form Guide | Child Arrangements Order Application",
    description: "Complete guide to the C100 form for child arrangements orders. Learn what it is, how to fill it in, and the MIAM requirements. Free help from MIAM.quest.",
    keywords: [
      "c100 form",
      "c100 application",
      "child arrangements order",
      "c100 how to fill in",
      "c100 example",
    ],
    canonical: `${SITE_URL}/forms/c100`,
  },
  exemption: {
    title: "MIAM Exemption Guide | When You Don't Need Mediation",
    description: "Find out if you qualify for a MIAM exemption. Covers domestic abuse, urgency, and other valid reasons to skip mediation. Free guidance.",
    keywords: [
      "miam exemption",
      "miam exemption domestic abuse",
      "exempt from miam",
      "miam not required",
    ],
    canonical: `${SITE_URL}/miam/exemption`,
  },
  cost: {
    title: "MIAM Cost Guide | How Much Does Mediation Cost?",
    description: "Understand MIAM and mediation costs, legal aid eligibility, and ways to reduce expenses. Many people qualify for free mediation.",
    keywords: [
      "miam cost",
      "mediation cost",
      "free mediation",
      "miam legal aid",
      "family mediation voucher scheme",
    ],
    canonical: `${SITE_URL}/mediation/cost`,
  },
  mediators: {
    title: "Find FMC-Accredited Mediators | MIAM.quest Directory",
    description: "Search our directory of FMC-accredited family mediators. Find qualified mediators near you for MIAM meetings and ongoing mediation.",
    keywords: [
      "family mediator",
      "fmc accredited mediator",
      "find mediator",
      "miam mediator",
      "local family mediation",
    ],
    canonical: `${SITE_URL}/mediators`,
  },
} as const;
