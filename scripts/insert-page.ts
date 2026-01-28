import { neon } from "@neondatabase/serverless";

// Load environment variables from .env.local
import { config } from "dotenv";
config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL not found. Make sure .env.local exists.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

interface PageInput {
  slug: string;
  cluster: string;
  title: string;
  meta_description: string;
  keywords: string[];
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  breadcrumbs: { name: string; url: string }[];
  schema_jsonld: Record<string, unknown>[];
  content_mdx: string;
  hero_subtitle?: string;
  key_facts: { value: string; label: string }[];
  cta_title?: string;
  cta_description?: string;
  related_pages: string[];
  is_published?: boolean;
  priority?: number;
}

export async function insertPage(page: PageInput) {
  const result = await sql`
    INSERT INTO pages (
      slug, cluster, title, meta_description, keywords,
      canonical_url, og_title, og_description,
      breadcrumbs, schema_jsonld, content_mdx,
      hero_subtitle, key_facts, cta_title, cta_description,
      related_pages, is_published, priority
    ) VALUES (
      ${page.slug},
      ${page.cluster},
      ${page.title},
      ${page.meta_description},
      ${page.keywords},
      ${page.canonical_url || `https://miam.quest/${page.slug}`},
      ${page.og_title || page.title},
      ${page.og_description || page.meta_description},
      ${JSON.stringify(page.breadcrumbs)},
      ${JSON.stringify(page.schema_jsonld)},
      ${page.content_mdx},
      ${page.hero_subtitle || null},
      ${JSON.stringify(page.key_facts)},
      ${page.cta_title || null},
      ${page.cta_description || null},
      ${page.related_pages},
      ${page.is_published ?? true},
      ${page.priority ?? 0}
    )
    ON CONFLICT (slug) DO UPDATE SET
      cluster = EXCLUDED.cluster,
      title = EXCLUDED.title,
      meta_description = EXCLUDED.meta_description,
      keywords = EXCLUDED.keywords,
      canonical_url = EXCLUDED.canonical_url,
      og_title = EXCLUDED.og_title,
      og_description = EXCLUDED.og_description,
      breadcrumbs = EXCLUDED.breadcrumbs,
      schema_jsonld = EXCLUDED.schema_jsonld,
      content_mdx = EXCLUDED.content_mdx,
      hero_subtitle = EXCLUDED.hero_subtitle,
      key_facts = EXCLUDED.key_facts,
      cta_title = EXCLUDED.cta_title,
      cta_description = EXCLUDED.cta_description,
      related_pages = EXCLUDED.related_pages,
      is_published = EXCLUDED.is_published,
      priority = EXCLUDED.priority,
      updated_at = NOW()
    RETURNING id, slug
  `;
  return result[0];
}

// Helper to create FAQ schema
export function createFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Helper to create Article schema
export function createArticleSchema(page: {
  title: string;
  description: string;
  slug: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": page.title,
    "description": page.description,
    "author": {
      "@type": "Organization",
      "name": "Miam Certificate Quest"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Miam Certificate Quest",
      "url": "https://miam.quest"
    },
    "datePublished": page.datePublished || new Date().toISOString(),
    "dateModified": page.dateModified || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://miam.quest/${page.slug}`
    }
  };
}

// Helper to create Breadcrumb schema
export function createBreadcrumbSchema(breadcrumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url.startsWith("http") ? crumb.url : `https://miam.quest${crumb.url}`
    }))
  };
}

export { sql };
