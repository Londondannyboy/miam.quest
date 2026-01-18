import Link from "next/link";

const SUPPORT_RESOURCES = [
  { href: "https://www.familymediationcouncil.org.uk/", label: "Family Mediation Council", description: "Find accredited mediators" },
  { href: "https://www.nationaldahelpline.org.uk/", label: "National DA Helpline", description: "24hr support: 0808 2000 247" },
  { href: "https://www.citizensadvice.org.uk/family/", label: "Citizens Advice", description: "Free family law guidance" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 text-zinc-400 mt-auto">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-semibold mb-4">MIAM.quest</h3>
            <p className="text-sm mb-4">
              Free AI-powered mediation preparation for UK family disputes.
              Helping separating couples prepare for their MIAM meeting.
            </p>
            <p className="text-xs text-zinc-500">
              Miam is an AI assistant and cannot provide legal advice.
              Only FMC-accredited mediators can issue valid MIAM certificates.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support Resources</h3>
            <ul className="space-y-3">
              {SUPPORT_RESOURCES.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors text-sm flex items-start gap-2"
                  >
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <div>
                      <span className="block">{link.label}</span>
                      <span className="text-xs text-zinc-500">{link.description}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Important Information</h3>
            <div className="space-y-3 text-sm">
              <p>
                <span className="text-emerald-400 font-medium">What is a MIAM?</span> - A Mediation
                Information Assessment Meeting is required before most family court applications.
              </p>
              <p>
                <span className="text-blue-400 font-medium">Child-Focused</span> - Mediation helps
                parents focus on what&apos;s best for their children.
              </p>
              <p>
                <span className="text-amber-400 font-medium">Exemptions Apply</span> - If you&apos;re
                experiencing domestic abuse, you may be exempt from MIAM requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-8 pt-8 border-t border-zinc-800">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500">
            <span>Free AI mediation preparation</span>
            <span>-</span>
            <span>Connects you to FMC-accredited mediators</span>
            <span>-</span>
            <span>Child-focused approach</span>
          </div>
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
