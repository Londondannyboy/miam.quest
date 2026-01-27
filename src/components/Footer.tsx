import Link from "next/link";

const MIAM_LINKS = [
  { href: "/miam/what-is-a-miam", label: "What is a MIAM?" },
  { href: "/miam/certificate", label: "MIAM Certificate" },
  { href: "/miam/exemptions", label: "MIAM Exemptions" },
  { href: "/miam/form-fm1", label: "FM1 Form Guide" },
];

const MEDIATION_LINKS = [
  { href: "/mediation/what-is-mediation", label: "What is Mediation?" },
  { href: "/mediation/cost", label: "Mediation Costs" },
  { href: "/mediation/divorce-mediation", label: "Divorce Mediation" },
  { href: "/mediation/family-mediation-voucher-scheme", label: "Voucher Scheme" },
  { href: "/mediation/shuttle-mediation", label: "Shuttle Mediation" },
  { href: "/mediation/how-long-does-mediation-take", label: "How Long Does It Take?" },
  { href: "/mediation/benefits-of-mediation", label: "Benefits of Mediation" },
];

const COURT_ORDERS_LINKS = [
  { href: "/forms/c100", label: "C100 Form Guide" },
  { href: "/court-orders/prohibited-steps-order", label: "Prohibited Steps Order" },
  { href: "/court-orders/specific-issue-order", label: "Specific Issue Order" },
  { href: "/court-orders/consent-order", label: "Consent Order" },
];

const GUIDES_LINKS = [
  { href: "/guides/parenting-plan", label: "Parenting Plan" },
  { href: "/guides/parallel-parenting", label: "Parallel Parenting" },
  { href: "/guides/supervised-contact", label: "Supervised Contact" },
];

const SUPPORT_LINKS = [
  { href: "https://www.familymediationcouncil.org.uk/", label: "Family Mediation Council", external: true },
  { href: "https://www.nationaldahelpline.org.uk/", label: "National DA Helpline", external: true },
  { href: "https://www.citizensadvice.org.uk/family/", label: "Citizens Advice", external: true },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-zinc-300 mt-auto">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* About */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">M</span>
              </div>
              <span className="font-bold text-white">Miam Certificate Quest</span>
            </div>
            <p className="text-sm mb-4 text-white">
              Free AI-powered MIAM certificate preparation for UK family disputes.
            </p>
            <p className="text-sm text-zinc-300">
              Miam is an AI assistant and cannot provide legal advice.
              Only FMC-accredited mediators can issue valid MIAM certificates.
            </p>
          </div>

          {/* MIAM */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">MIAM</h3>
            <ul className="space-y-2">
              {MIAM_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mediation */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Mediation</h3>
            <ul className="space-y-2">
              {MEDIATION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Court Orders */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Court Orders</h3>
            <ul className="space-y-2">
              {COURT_ORDERS_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides & Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Guides</h3>
            <ul className="space-y-2">
              {GUIDES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-white font-semibold mb-4 mt-6 text-sm">Support</h3>
            <ul className="space-y-2">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-8 border-t border-zinc-800">
          <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4 mb-6">
            <p className="text-amber-300/90 text-xs">
              <strong className="text-amber-400">Important:</strong> MIAM.quest is a beta service providing AI-powered mediation preparation guidance.
              We do not provide mediation services or legal advice. Always consult a qualified professional before making decisions.
              Only FMC-accredited mediators can conduct MIAMs and issue certificates.
            </p>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white mb-8">
          <span>Free AI MIAM certificate preparation</span>
          <span className="text-zinc-500">|</span>
          <span>Connects you to FMC-accredited mediators</span>
          <span className="text-zinc-500">|</span>
          <span>Child-focused approach</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white">
              © {currentYear} Miam Certificate Quest. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-300 hover:text-white transition-colors underline underline-offset-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
