/**
 * PDF Generation Script for Miam Certificate Quest
 *
 * Generates professional PDF guides with:
 * - Miam Certificate Quest branding header
 * - Disclaimer section at top
 * - Version/date information
 * - Sources/references list at bottom
 *
 * Run with: npm run generate-pdfs
 */

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

interface PDFConfig {
  slug: string;
  filename: string;
  title: string;
}

// Authoritative sources we cite
const AUTHORITATIVE_SOURCES = [
  { name: 'Family Mediation Council (FMC)', url: 'https://www.familymediationcouncil.org.uk/', description: 'Official accreditation body for family mediators' },
  { name: 'Gov.uk - Family Mediation', url: 'https://www.gov.uk/looking-after-children-divorce/mediation', description: 'UK Government guidance on family mediation' },
  { name: 'National Family Mediation (NFM)', url: 'https://www.nfm.org.uk/', description: 'Established family mediation charity' },
  { name: 'Cafcass', url: 'https://www.cafcass.gov.uk/', description: 'Children and Family Court Advisory Service' },
  { name: 'HMCTS', url: 'https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service', description: 'HM Courts & Tribunals Service' },
  { name: 'Legal Aid Agency', url: 'https://www.gov.uk/government/organisations/legal-aid-agency', description: 'Government legal aid information' },
];

const PDFS_TO_GENERATE: PDFConfig[] = [
  {
    slug: 'what-is-a-miam',
    filename: 'what-is-a-miam-guide.pdf',
    title: 'What is a MIAM? - Complete Guide',
  },
  {
    slug: 'miam-certificate',
    filename: 'miam-certificate-guide.pdf',
    title: 'MIAM Certificate Guide',
  },
  {
    slug: 'family-mediation',
    filename: 'family-mediation-guide.pdf',
    title: 'Family Mediation UK - Complete Guide',
  },
  {
    slug: 'c100-form',
    filename: 'c100-form-guide.pdf',
    title: 'C100 Form Guide',
  },
  {
    slug: 'mediation-preparation-checklist',
    filename: 'mediation-preparation-checklist.pdf',
    title: 'Mediation Preparation Checklist',
  },
];

const BASE_URL = process.env.BASE_URL || 'https://miam.quest';
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'downloads');
const VERSION_DATE = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

async function generatePDF(browser: puppeteer.Browser, config: PDFConfig): Promise<void> {
  const page = await browser.newPage();

  try {
    console.log(`Generating: ${config.filename}...`);

    // Navigate to the page
    const url = `${BASE_URL}/${config.slug}`;
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });

    // Wait for React to hydrate
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Inject PDF-specific content and hide unwanted elements
    await page.evaluate((sources: typeof AUTHORITATIVE_SOURCES, versionDate: string, title: string) => {
      // ========== HIDE UNWANTED ELEMENTS ==========

      // Navigation, footer, beta banner
      const elementsToHide = [
        'nav',
        'footer',
        '[class*="BetaBanner"]',
        '[class*="beta"]',
        '.fixed.bottom-0',
        '[class*="copilot"]',
        '[class*="Copilot"]',
        '[data-copilot]',
        '[class*="hume"]',
        '[class*="Hume"]',
        '[class*="voice"]',
        'button.fixed',
        '[class*="float"]',
        'details', // FAQ accordions
        '[class*="FAQ"]',
        '[class*="faq"]',
        '[class*="CookieConsent"]',
        '[class*="cookie"]',
      ];

      elementsToHide.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          (el as HTMLElement).style.display = 'none';
        });
      });

      // Hide all fixed position elements except main content
      document.querySelectorAll('.fixed, [style*="position: fixed"]').forEach(el => {
        const element = el as HTMLElement;
        if (!element.closest('main') && !element.closest('article')) {
          element.style.display = 'none';
        }
      });

      // Hide CTA sections (buttons don't work in PDFs)
      document.querySelectorAll('[class*="cta"], [class*="CTA"], section:has(button), .bg-rose-50:has(a[href="/"])').forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });

      // Remove [ ] checkbox brackets from list items
      document.querySelectorAll('li').forEach(li => {
        const walker = document.createTreeWalker(li, NodeFilter.SHOW_TEXT);
        let node;
        while (node = walker.nextNode()) {
          if (node.textContent) {
            node.textContent = node.textContent.replace(/\[\s*\]\s*/g, '');
          }
        }
      });

      // Add page-break-inside: avoid to key elements
      const preventBreakElements = [
        'h1', 'h2', 'h3', 'h4',
        'section',
        '[class*="rounded"]',
        '[class*="border"]',
        '[class*="bg-"]',
        'ul', 'ol',
        'table',
        'blockquote',
      ];
      preventBreakElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          (el as HTMLElement).style.pageBreakInside = 'avoid';
          (el as HTMLElement).style.breakInside = 'avoid';
        });
      });

      // Keep headings with their following content
      document.querySelectorAll('h1, h2, h3, h4').forEach(heading => {
        (heading as HTMLElement).style.pageBreakAfter = 'avoid';
        (heading as HTMLElement).style.breakAfter = 'avoid';
      });

      // ========== ADD DISCLAIMER SECTION AT TOP ==========

      const disclaimerHTML = `
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin-bottom: 24px; page-break-inside: avoid;">
          <div style="display: flex; align-items: flex-start; gap: 16px;">
            <div style="font-size: 32px; flex-shrink: 0;">⚠️</div>
            <div>
              <h3 style="margin: 0 0 8px 0; color: #92400e; font-size: 16px; font-weight: bold;">Important Disclaimer</h3>
              <p style="margin: 0 0 8px 0; color: #78350f; font-size: 13px; line-height: 1.5;">
                This guide is provided by <strong>Miam Certificate Quest</strong>, an AI-powered preparation tool.
                We help you understand the MIAM process but <strong>cannot provide legal advice</strong> and
                <strong>cannot issue MIAM certificates</strong>.
              </p>
              <p style="margin: 0; color: #78350f; font-size: 13px; line-height: 1.5;">
                Only <strong>FMC-accredited mediators</strong> can issue valid MIAM certificates required for court applications.
                Find an accredited mediator at: <strong>familymediationcouncil.org.uk/find-local-mediator</strong>
              </p>
            </div>
          </div>
          <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #fbbf24; font-size: 11px; color: #92400e;">
            <strong>Version:</strong> ${versionDate} | <strong>Source:</strong> miam.quest/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}
          </div>
        </div>
      `;

      // Find the main content area and prepend disclaimer
      const article = document.querySelector('article');
      const mainContent = article?.querySelector('.prose-content') || article?.firstElementChild;
      if (mainContent) {
        const disclaimerDiv = document.createElement('div');
        disclaimerDiv.innerHTML = disclaimerHTML;
        mainContent.insertBefore(disclaimerDiv, mainContent.firstChild);
      }

      // ========== ADD SOURCES SECTION AT BOTTOM ==========

      // Collect all external links from the page
      const externalLinks: {text: string; href: string}[] = [];
      document.querySelectorAll('a[href^="http"]').forEach(link => {
        const href = link.getAttribute('href');
        const text = link.textContent?.trim();
        if (href && text && !href.includes('miam.quest') && !href.includes('localhost')) {
          // Deduplicate by href
          if (!externalLinks.some(l => l.href === href)) {
            externalLinks.push({ text, href });
          }
        }
      });

      const sourcesHTML = `
        <div style="margin-top: 40px; padding-top: 24px; border-top: 2px solid #e5e7eb; page-break-inside: avoid;">
          <h2 style="color: #1f2937; font-size: 18px; font-weight: bold; margin-bottom: 16px;">📚 Sources & References</h2>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <h3 style="color: #374151; font-size: 14px; font-weight: bold; margin: 0 0 12px 0;">Authoritative Sources</h3>
            <p style="color: #6b7280; font-size: 12px; margin: 0 0 12px 0;">
              The information in this guide is sourced from official UK government bodies, regulatory organisations, and established family law resources:
            </p>
            <ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 12px; line-height: 1.8;">
              ${sources.map(s => `<li><strong>${s.name}</strong> - ${s.description}<br/><span style="color: #6b7280;">${s.url}</span></li>`).join('')}
            </ul>
          </div>

          ${externalLinks.length > 0 ? `
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
            <h3 style="color: #374151; font-size: 14px; font-weight: bold; margin: 0 0 12px 0;">Links Referenced in This Guide</h3>
            <ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 11px; line-height: 1.6;">
              ${externalLinks.slice(0, 15).map(l => `<li>${l.text} - <span style="color: #6b7280;">${l.href}</span></li>`).join('')}
            </ul>
          </div>
          ` : ''}

          <div style="margin-top: 16px; padding: 12px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px;">
            <p style="margin: 0; color: #991b1b; font-size: 11px; line-height: 1.5;">
              <strong>Legal Notice:</strong> This document is for informational purposes only and does not constitute legal advice.
              For specific legal guidance about your situation, please consult a qualified family law solicitor or an FMC-accredited mediator.
            </p>
          </div>
        </div>
      `;

      // Append sources to the article
      if (article) {
        const sourcesDiv = document.createElement('div');
        sourcesDiv.innerHTML = sourcesHTML;
        article.appendChild(sourcesDiv);
      }

      // ========== UPDATE INTERNAL LINKS ==========

      document.querySelectorAll('a[href^="/"]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('/')) {
          link.setAttribute('href', 'https://miam.quest' + href);
        }
      });

    }, AUTHORITATIVE_SOURCES, VERSION_DATE, config.title);

    // PDF Header with branding
    const headerTemplate = `
      <div style="font-size: 10px; width: 100%; padding: 12px 40px; border-bottom: 2px solid #e11d48; background: white; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="width: 24px; height: 24px; background: linear-gradient(135deg, #e11d48 0%, #be185d 100%); border-radius: 6px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-weight: bold; font-size: 12px;">M</span>
          </div>
          <span style="font-weight: bold; color: #1f2937;">Miam Certificate Quest</span>
        </div>
        <div style="color: #6b7280; font-size: 9px;">
          ${config.title}
        </div>
      </div>
    `;

    // PDF Footer
    const footerTemplate = `
      <div style="font-size: 8px; width: 100%; padding: 10px 40px; border-top: 1px solid #e5e7eb; background: #f9fafb;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="color: #6b7280;">
            <strong>miam.quest</strong> | Version: ${VERSION_DATE}
          </div>
          <div style="color: #6b7280;">
            Page <span class="pageNumber"></span> of <span class="totalPages"></span>
          </div>
        </div>
        <div style="color: #9ca3af; font-size: 7px; margin-top: 4px; text-align: center;">
          Sources: Gov.uk • Family Mediation Council • National Family Mediation • Cafcass • HMCTS
        </div>
      </div>
    `;

    // Generate PDF
    const outputPath = path.join(OUTPUT_DIR, config.filename);
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '80px',
        bottom: '80px',
        left: '40px',
        right: '40px',
      },
      displayHeaderFooter: true,
      headerTemplate,
      footerTemplate,
    });

    console.log(`  ✓ Saved: ${outputPath}`);
  } catch (error) {
    console.error(`  ✗ Error generating ${config.filename}:`, error);
    throw error;
  } finally {
    await page.close();
  }
}

async function main(): Promise<void> {
  console.log('='.repeat(50));
  console.log('Miam Certificate Quest - PDF Generator');
  console.log('='.repeat(50));
  console.log(`\nBase URL: ${BASE_URL}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Version: ${VERSION_DATE}\n`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Launch browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    // Generate each PDF
    for (const config of PDFS_TO_GENERATE) {
      await generatePDF(browser, config);
    }

    console.log('\n' + '='.repeat(50));
    console.log(`Successfully generated ${PDFS_TO_GENERATE.length} PDFs!`);
    console.log('='.repeat(50));
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
