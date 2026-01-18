import Link from "next/link";

const MIAM_LINKS = [
  { href: "/miam/what-is-a-miam", label: "What is a MIAM?" },
  { href: "/miam/certificate", label: "MIAM Certificate" },
  { href: "/miam/exemptions", label: "MIAM Exemptions" },
];

const MEDIATION_LINKS = [
  { href: "/mediation/what-is-mediation", label: "What is Mediation?" },
  { href: "/mediation/cost", label: "Mediation Costs" },
  { href: "/mediation/workplace", label: "Workplace Mediation" },
];

const FORMS_LINKS = [
  { href: "/forms/c100", label: "C100 Form Guide" },
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
    <footer className="bg-zinc-900 text-zinc-400 mt-auto">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* About */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">M</span>
              </div>
              <span className="font-bold text-white">MIAM.quest</span>
            </div>
            <p className="text-sm mb-4">
              Free AI-powered mediation preparation for UK family disputes.
            </p>
            <p className="text-xs text-zinc-500">
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

          {/* Forms & Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Forms</h3>
            <ul className="space-y-2">
              {FORMS_LINKS.map((link) => (
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
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 mb-8">
          <span>Free AI mediation preparation</span>
          <span>-</span>
          <span>Connects you to FMC-accredited mediators</span>
          <span>-</span>
          <span>Child-focused approach</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs">
              © {currentYear} MIAM.quest. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs hover:text-white transition-colors"
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
