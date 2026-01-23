import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export interface PageData {
  id: number;
  slug: string;
  cluster: string;
  title: string;
  meta_description: string;
  keywords: string[];
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  breadcrumbs: { name: string; url: string }[];
  schema_jsonld: Record<string, unknown>[];
  content_mdx: string;
  hero_subtitle: string | null;
  key_facts: { value: string; label: string }[];
  cta_title: string | null;
  cta_description: string | null;
  related_pages: string[];
  is_published: boolean;
  priority: number;
  created_at: string;
  updated_at: string;
}

export async function getPageBySlug(slug: string): Promise<PageData | null> {
  const rows = await sql`SELECT * FROM pages WHERE slug = ${slug} AND is_published = true LIMIT 1`;
  if (rows.length === 0) return null;
  return rows[0] as unknown as PageData;
}

export async function getPagesByCluster(cluster: string): Promise<PageData[]> {
  const rows = await sql`SELECT * FROM pages WHERE cluster = ${cluster} AND is_published = true ORDER BY priority DESC`;
  return rows as unknown as PageData[];
}

export async function getAllPublishedPages(): Promise<Pick<PageData, "slug" | "cluster" | "title" | "updated_at">[]> {
  const rows = await sql`SELECT slug, cluster, title, updated_at FROM pages WHERE is_published = true ORDER BY priority DESC`;
  return rows as unknown as Pick<PageData, "slug" | "cluster" | "title" | "updated_at">[];
}

export async function getRelatedPages(slugs: string[]): Promise<Pick<PageData, "slug" | "title" | "meta_description" | "cluster">[]> {
  if (slugs.length === 0) return [];
  const rows = await sql`SELECT slug, title, meta_description, cluster FROM pages WHERE slug = ANY(${slugs}) AND is_published = true`;
  return rows as unknown as Pick<PageData, "slug" | "title" | "meta_description" | "cluster">[];
}
