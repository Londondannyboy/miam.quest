"use client";

export function BetaBanner() {
  return (
    <div className="bg-amber-500/10 border-b border-amber-500/30">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <p className="text-center text-sm text-amber-200">
          <span className="inline-flex items-center gap-2 flex-wrap justify-center">
            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-bold rounded">
              BETA
            </span>
            <span className="text-amber-300/90">
              This site is in beta and content is being verified. We do not provide mediation or legal advice.
              Always refer to{" "}
              <a
                href="https://www.gov.uk/looking-after-children-divorce"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 underline"
              >
                GOV.UK
              </a>
              {" "}or an{" "}
              <a
                href="https://www.familymediationcouncil.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 underline"
              >
                FMC-accredited mediator
              </a>
              {" "}for authoritative guidance.
            </span>
          </span>
        </p>
      </div>
    </div>
  );
}

export default BetaBanner;
