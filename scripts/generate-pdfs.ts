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

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'downloads');

async function generatePDF(browser: puppeteer.Browser, config: PDFConfig): Promise<void> {
  const page = await browser.newPage();

  try {
    console.log(`Generating: ${config.filename}...`);

    // Navigate to the page
    const url = `${BASE_URL}/${config.slug}`;
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

    // Wait for content to load
    await page.waitForSelector('main', { timeout: 10000 });

    // Hide navigation and footer for cleaner PDF
    await page.evaluate(() => {
      const nav = document.querySelector('nav');
      const footer = document.querySelector('footer');
      const betaBanner = document.querySelector('[class*="BetaBanner"]');

      if (nav) (nav as HTMLElement).style.display = 'none';
      if (footer) (footer as HTMLElement).style.display = 'none';
      if (betaBanner) (betaBanner as HTMLElement).style.display = 'none';
    });

    // Add PDF-specific header and footer
    const headerTemplate = `
      <div style="font-size: 10px; width: 100%; text-align: center; color: #666; padding: 10px 20px;">
        <span style="font-weight: bold;">Miam Certificate Quest</span> | ${config.title}
      </div>
    `;

    const footerTemplate = `
      <div style="font-size: 9px; width: 100%; text-align: center; color: #666; padding: 10px 20px;">
        <div>Downloaded from miam.quest | Generated: ${new Date().toLocaleDateString('en-GB')}</div>
        <div style="margin-top: 2px; font-size: 8px;">
          Beta AI Tool - Q1 2026 | For MIAM certificates, use FMC-accredited mediators
        </div>
        <div style="margin-top: 5px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>
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
        bottom: '100px',
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
