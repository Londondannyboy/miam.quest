-- SEO Content Pages Table
-- Stores all content pages as MDX with structured metadata
-- Designed to be queryable by the AI agent and portable for future migrations

CREATE TABLE IF NOT EXISTS pages (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,           -- URL path e.g. 'forms/c100', 'court-orders/prohibited-steps-order'
    cluster VARCHAR(100) NOT NULL,               -- Content cluster: 'miam', 'mediation', 'forms', 'court-orders', 'guides'
    title VARCHAR(500) NOT NULL,                 -- Page H1 title
    meta_description TEXT NOT NULL,              -- SEO meta description
    keywords TEXT[] DEFAULT '{}',                -- SEO keywords array
    canonical_url VARCHAR(500),                  -- Canonical URL (defaults to https://miam.quest/{slug})
    og_title VARCHAR(500),                       -- OpenGraph title (defaults to title)
    og_description TEXT,                         -- OpenGraph description (defaults to meta_description)
    breadcrumbs JSONB DEFAULT '[]',              -- Breadcrumb trail: [{"name": "Home", "url": "/"}, ...]
    schema_jsonld JSONB DEFAULT '[]',            -- Array of JSON-LD schema objects (FAQ, Article, Breadcrumb, etc.)
    content_mdx TEXT NOT NULL,                   -- Main page content as MDX (markdown + JSX components)
    hero_subtitle TEXT,                          -- Subtitle shown in the hero section
    key_facts JSONB DEFAULT '[]',               -- Key facts grid: [{"value": "£232", "label": "Court Fee"}, ...]
    cta_title VARCHAR(500),                      -- Call-to-action section title
    cta_description TEXT,                        -- Call-to-action description
    related_pages TEXT[] DEFAULT '{}',           -- Array of related page slugs
    is_published BOOLEAN DEFAULT true,           -- Whether the page is live
    priority INTEGER DEFAULT 0,                  -- Display/sitemap priority (higher = more important)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_cluster ON pages(cluster);
CREATE INDEX IF NOT EXISTS idx_pages_published ON pages(is_published);
CREATE INDEX IF NOT EXISTS idx_pages_priority ON pages(priority DESC);

-- Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION update_pages_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS pages_update_timestamp ON pages;
CREATE TRIGGER pages_update_timestamp
    BEFORE UPDATE ON pages
    FOR EACH ROW
    EXECUTE FUNCTION update_pages_timestamp();
