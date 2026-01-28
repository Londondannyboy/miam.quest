import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPageBySlug, getRelatedPages } from "@/lib/db";
import { Disclaimer } from "@/components/Disclaimer";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const fullSlug = slug.join("/");
  const page = await getPageBySlug(fullSlug);

  if (!page) return {};

  return {
    title: `${page.title} | MIAM.quest`,
    description: page.meta_description,
    keywords: page.keywords,
    alternates: {
      canonical: page.canonical_url || `https://miam.quest/${page.slug}`,
    },
    openGraph: {
      type: "article",
      title: page.og_title || page.title,
      description: page.og_description || page.meta_description,
      url: page.canonical_url || `https://miam.quest/${page.slug}`,
      images: [
        {
          url: "https://miam.quest/og-image.png",
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
  };
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 mt-10" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3 mt-6" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-zinc-600 dark:text-zinc-400 mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 mb-6 ml-1" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="space-y-2 text-zinc-600 dark:text-zinc-400 mb-6 ml-1 list-decimal list-inside" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="flex items-start gap-2" {...props}>
      <svg className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      <span>{props.children}</span>
    </li>
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href || "";
    if (href.startsWith("/")) {
      return <Link href={href} className="text-rose-600 hover:underline">{props.children}</Link>;
    }
    return <a className="text-rose-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />;
  },
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-zinc-900 dark:text-white" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-rose-300 dark:border-rose-700 pl-4 py-2 my-4 bg-rose-50 dark:bg-rose-900/20 rounded-r-lg" {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-left" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-zinc-100 dark:bg-zinc-800" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-white" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-700" {...props} />
  ),
  hr: () => <hr className="my-8 border-zinc-200 dark:border-zinc-800" />,
  Callout: ({ type = "info", title, children }: { type?: "info" | "warning" | "success"; title?: string; children: React.ReactNode }) => {
    const styles = {
      info: "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200",
      warning: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200",
      success: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200",
    };
    return (
      <div className={`border rounded-xl p-6 mb-6 ${styles[type]}`}>
        {title && <p className="font-bold mb-2">{title}</p>}
        <div>{children}</div>
      </div>
    );
  },
  Steps: ({ children }: { children: React.ReactNode }) => (
    <div className="space-y-4 mb-6">{children}</div>
  ),
  Step: ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => (
    <div className="flex gap-4">
      <div className="w-10 h-10 bg-rose-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
        {number}
      </div>
      <div className="pt-1">
        <h4 className="font-semibold text-zinc-900 dark:text-white">{title}</h4>
        <p className="text-zinc-600 dark:text-zinc-400">{children}</p>
      </div>
    </div>
  ),
  FAQ: ({ question, children }: { question: string; children: React.ReactNode }) => (
    <details className="group border border-zinc-200 dark:border-zinc-700 rounded-lg mb-3">
      <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg">
        <span className="font-medium text-zinc-900 dark:text-white pr-4">{question}</span>
        <svg className="w-5 h-5 text-zinc-400 flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="px-4 pb-4 text-zinc-600 dark:text-zinc-400">{children}</div>
    </details>
  ),
  DownloadPDF: ({ href, title }: { href: string; title?: string }) => (
    <a
      href={href}
      download
      className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition-colors mb-4"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      {title || "Download PDF Guide"}
    </a>
  ),
};

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params;
  const fullSlug = slug.join("/");
  const page = await getPageBySlug(fullSlug);

  if (!page) {
    notFound();
  }

  const relatedPages = page.related_pages.length > 0
    ? await getRelatedPages(page.related_pages)
    : [];

  return (
    <>
      {page.schema_jsonld.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="min-h-screen bg-white dark:bg-zinc-950">
        {/* Hero */}
        <section className="bg-gradient-to-b from-rose-50 to-white dark:from-zinc-900 dark:to-zinc-950 py-16">
          <div className="max-w-4xl mx-auto px-4">
            {/* Breadcrumbs */}
            {page.breadcrumbs.length > 0 && (
              <nav className="text-sm text-zinc-500 mb-6">
                {page.breadcrumbs.map((crumb, i) => (
                  <span key={i}>
                    {i > 0 && <span className="mx-2">/</span>}
                    {i < page.breadcrumbs.length - 1 ? (
                      <Link href={crumb.url} className="hover:text-rose-600">{crumb.name}</Link>
                    ) : (
                      <span className="text-zinc-900 dark:text-white">{crumb.name}</span>
                    )}
                  </span>
                ))}
              </nav>
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              {page.title}
            </h1>

            {page.hero_subtitle && (
              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
                {page.hero_subtitle}
              </p>
            )}
          </div>
        </section>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Key Facts Grid */}
          {page.key_facts.length > 0 && (
            <div className={`grid grid-cols-2 md:grid-cols-${Math.min(page.key_facts.length, 4)} gap-4 mb-12`}>
              {page.key_facts.map((fact, i) => (
                <div key={i} className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6 text-center">
                  <p className="text-2xl font-bold text-rose-600">{fact.value}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{fact.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* MDX Content */}
          <div className="prose-content">
            <MDXRemote source={page.content_mdx} components={mdxComponents} />
          </div>

          {/* CTA */}
          {page.cta_title && (
            <section className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl p-8 text-center mt-12">
              <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 mb-4">
                {page.cta_title}
              </h2>
              {page.cta_description && (
                <p className="text-rose-800 dark:text-rose-200 mb-6">
                  {page.cta_description}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition-colors"
                >
                  Prepare with Miam (Free)
                </Link>
                <Link
                  href="/what-is-a-miam"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 rounded-lg font-medium transition-colors"
                >
                  Learn About MIAMs
                </Link>
              </div>
            </section>
          )}

          {/* Disclaimer */}
          <Disclaimer variant="compact" className="mt-12" />

          {/* Related Pages */}
          {relatedPages.length > 0 && (
            <section className="border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-8">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Related Guides</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {relatedPages.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/${related.slug}`}
                    className="block p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <h3 className="font-medium text-zinc-900 dark:text-white">{related.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{related.meta_description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </>
  );
}
