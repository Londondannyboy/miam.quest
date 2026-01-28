/**
 * PDF Generation Script for Miam Certificate Quest
 *
 * This script generates static PDF guides from key pages.
 * Run with: npx ts-node scripts/generate-pdfs.ts
 *
 * Prerequisites:
 *   npm install puppeteer --save-dev
 *
 * The site must be running locally at http://localhost:3000
 */

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

interface PDFConfig {
  slug: string;
  filename: string;
  title: string;
}

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

async function generatePDF(browser: puppeteer.Browser, config: PDFConfig): Promise<void> {
  const page = await browser.newPage();

  try {
    console.log(`Generating: ${config.filename}...`);

    // Navigate to the page - use load event and then wait for React hydration
    const url = `${BASE_URL}/${config.slug}`;
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });

    // Wait for React to hydrate and content to render
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Hide navigation, footer, and all UI widgets for cleaner PDF
    await page.evaluate(() => {
      // Navigation and footer
      const nav = document.querySelector('nav');
      const footer = document.querySelector('footer');
      if (nav) (nav as HTMLElement).style.display = 'none';
      if (footer) (footer as HTMLElement).style.display = 'none';

      // Beta banner
      const betaBanner = document.querySelector('[class*="BetaBanner"]');
      if (betaBanner) (betaBanner as HTMLElement).style.display = 'none';

      // Cookie consent (fixed bottom element)
      const cookieConsent = document.querySelector('.fixed.bottom-0');
      if (cookieConsent) (cookieConsent as HTMLElement).style.display = 'none';

      // CopilotKit sidebar and any copilot elements
      const copilotElements = document.querySelectorAll('[class*="copilot"], [class*="Copilot"], [data-copilot]');
      copilotElements.forEach((el) => ((el as HTMLElement).style.display = 'none'));

      // Any fixed position elements (chat widgets, etc.)
      const fixedElements = document.querySelectorAll('.fixed, [style*="position: fixed"]');
      fixedElements.forEach((el) => {
        const element = el as HTMLElement;
        // Don't hide the main content
        if (!element.closest('main') && !element.closest('article')) {
          element.style.display = 'none';
        }
      });

      // Hume voice widget
      const humeWidget = document.querySelector('[class*="hume"], [class*="Hume"], [class*="voice"]');
      if (humeWidget) (humeWidget as HTMLElement).style.display = 'none';

      // Any buttons that look like chat/voice triggers
      const floatingButtons = document.querySelectorAll('button.fixed, button[class*="float"]');
      floatingButtons.forEach((el) => ((el as HTMLElement).style.display = 'none'));

      // Hide interactive FAQ accordions (they don't work in static PDFs)
      const faqElements = document.querySelectorAll('details, [class*="FAQ"], [class*="faq"]');
      faqElements.forEach((el) => ((el as HTMLElement).style.display = 'none'));

      // Ensure all internal links use absolute production URLs
      const links = document.querySelectorAll('a[href^="/"]');
      links.forEach((link) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('/')) {
          link.setAttribute('href', 'https://miam.quest' + href);
        }
      });
    });

    // Add PDF-specific header and footer with full disclaimer
    const headerTemplate = `
      <div style="font-size: 9px; width: 100%; text-align: center; color: #666; padding: 8px 40px; border-bottom: 1px solid #ddd; background: #fafafa;">
        <div style="font-weight: bold; margin-bottom: 2px;">Miam Certificate Quest | ${config.title}</div>
        <div style="font-size: 8px; color: #888;">
          DISCLAIMER: This is an AI preparation tool. We cannot provide legal advice or issue MIAM certificates.
        </div>
      </div>
    `;

    const footerTemplate = `
      <div style="font-size: 8px; width: 100%; text-align: center; color: #666; padding: 10px 40px; border-top: 1px solid #ddd; background: #fafafa;">
        <div style="margin-bottom: 4px; font-weight: bold;">
          IMPORTANT: Only FMC-accredited mediators can issue valid MIAM certificates.
        </div>
        <div style="margin-bottom: 4px;">
          For mediation services: familymediationcouncil.org.uk/find-local-mediator
        </div>
        <div style="color: #888; font-size: 7px;">
          Downloaded from miam.quest | Generated: ${new Date().toLocaleDateString('en-GB')} | Beta AI Tool - Q1 2026
        </div>
        <div style="margin-top: 4px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>
      </div>
    `;

    // Generate PDF
    const outputPath = path.join(OUTPUT_DIR, config.filename);
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '100px',
        bottom: '120px',
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
  console.log(`Output: ${OUTPUT_DIR}\n`);

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
