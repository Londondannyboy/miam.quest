# CLAUDE.md - Miam Certificate Quest Development Guide

## Project Overview

**Miam Certificate Quest** (formerly MIAM.quest) is an AI-powered mediation preparation and support platform for UK family disputes. It helps separating couples prepare for their legally-required MIAM (Mediation Information Assessment Meeting) through voice and chat conversations with "Miam" - an empathetic female AI mediator.

### Launch Status
- **Status**: Beta Product
- **Launch**: Q1 2026
- **Live URL**: https://miam.quest

### Core Value Proposition
- Free AI-powered MIAM certificate preparation
- Voice-first interaction with Miam (via Hume EVI)
- Document generation (parenting plans, financial summaries)
- Connection to accredited human mediators for legally-binding outcomes
- SEO content targeting "miam certificate" and related keywords (60k+ monthly searches)

### Legal Context
> A MIAM is legally required in England & Wales before applying to court for child arrangements (C100 form). Only FMC-accredited mediators can issue valid MIAM certificates. Miam (the AI) helps users **prepare** for mediation - she cannot issue certificates or provide legal advice.

---

## Branding

| Element | Value |
|---------|-------|
| Site Name | Miam Certificate Quest |
| Domain | miam.quest |
| Primary Keyword | "miam certificate" |
| Meta Title | Miam Certificate Quest \| Free MIAM Certificate Help UK |
| Tagline | Free AI-Powered MIAM Certificate Preparation |

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | Next.js 16 + TypeScript | App router, SSR, SEO |
| Styling | Tailwind CSS 4 | Utility-first CSS |
| Voice | Hume EVI | Emotional voice interface with Miam |
| Chat/Docs | CopilotKit | Sidebar chat, document collaboration |
| Backend | FastAPI + Pydantic AI | Agent logic, tool calling |
| Database | Neon PostgreSQL | Serverless DB + Auth |
| Memory | Zep Cloud | Conversation memory, user facts |
| LLM | Google Gemini 2.0 Flash | Primary model |
| Hosting | Vercel (frontend) + Railway (agent) | Production deployment |

---

## Live URLs

| Service | URL |
|---------|-----|
| Frontend | https://miam.quest |
| Agent API | https://miam-quest-agent-production.up.railway.app |
| CLM Endpoint (Hume) | https://miam-quest-agent-production.up.railway.app/chat/completions |
| AG-UI Endpoint (CopilotKit) | https://miam-quest-agent-production.up.railway.app/agui/ |

---

## Project Structure

```
miam.quest/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Landing page (SEO optimized)
│   │   ├── layout.tsx          # Root layout with JSON-LD
│   │   ├── api/
│   │   │   ├── copilotkit/     # CopilotKit runtime
│   │   │   ├── hume-token/     # Hume voice tokens
│   │   │   └── auth/           # Neon auth routes
│   │   ├── miam/               # MIAM content cluster
│   │   │   ├── what-is-a-miam/ # What is a MIAM
│   │   │   ├── certificate/    # MIAM certificate guide
│   │   │   └── exemptions/     # MIAM exemptions guide
│   │   ├── mediation/          # Mediation content cluster
│   │   │   ├── what-is-mediation/
│   │   │   ├── cost/
│   │   │   └── workplace/
│   │   ├── forms/
│   │   │   └── c100/           # C100 form guide
│   │   ├── privacy/            # Privacy policy
│   │   ├── terms/              # Terms of service
│   │   └── contact/            # Contact page
│   ├── components/
│   │   ├── Navigation.tsx      # Global nav with dropdowns
│   │   ├── Footer.tsx          # Global footer (black bg, high contrast)
│   │   ├── BetaBanner.tsx      # Beta + Q1 2026 launch banner
│   │   ├── CookieConsent.tsx   # Cookie consent
│   │   ├── VoiceInput.tsx      # Hume voice component
│   │   └── providers.tsx       # Context providers
│   └── lib/
│       ├── auth/               # Neon auth client/server
│       ├── types.ts            # TypeScript interfaces
│       ├── prompts.ts          # System prompts
│       └── seo.ts              # SEO utilities (SITE_NAME = "Miam Certificate Quest")
├── agent/                      # Python backend
│   ├── src/
│   │   └── agent.py            # Pydantic AI agent
│   ├── pyproject.toml
│   ├── requirements.txt
│   ├── nixpacks.toml           # Railway build config
│   └── Procfile                # Railway start command
├── migrations/                 # SQL migrations
└── public/                     # Static assets
```

---

## SEO Strategy

### Target Keyword: "miam certificate"
- Position 73.4 in Google (as of Jan 2026)
- 9 impressions, 1 click, 11.1% CTR
- Best performing keyword

### On-Page SEO Optimizations (Jan 2026)
- **Title**: "Miam Certificate Quest | Free MIAM Certificate Help UK" (55 chars)
- **H1**: "Get Your MIAM Certificate with Confidence"
- **Meta Description**: Includes "MIAM certificate" early
- **JSON-LD Schemas**: Website, Organization, SoftwareApplication, FAQ, Video, Breadcrumb
- **Keyword density**: 16+ mentions across headers and body

### Authoritative Sources Referenced
Homepage links to official sources for credibility:
1. [Family Mediation Council](https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam/) - Official MIAM info
2. [National Family Mediation](https://www.nfm.org.uk/about-family-mediation-services/what-is-a-miam/) - NFM guidance
3. [Gov.uk FM1 Form](https://assets.publishing.service.gov.uk/media/6628df55db4b9f0448a7e58e/FM1_0424.pdf) - Official form
4. [Burnetts Solicitors](https://www.burnetts.co.uk/legal-news/family-law-faqs-what-is-a-miam-do-i-need-to-attend-one/) - Legal FAQ

### SEO Content Pages (Live - 88 pages)

**MIAM Cluster:**
- `/what-is-a-miam` - What is a MIAM guide
- `/miam-certificate` - MIAM Certificate complete guide
- `/miam-certificate-cost` - MIAM certificate costs
- `/miam-exemptions` - MIAM exemptions
- `/online-miam`, `/urgent-miam`, `/miam-cost`, `/miam-near-me`, `/miam-meeting`
- `/is-miam-compulsory`, `/form-fm1`

**C100 Cluster:**
- `/what-is-c100-form` - What is a C100 form?
- `/c100-form` - C100 form complete guide
- `/c100-form-download` - C100 form download
- `/what-happens-after-c100` - After C100 process

**High-Volume Mediation Pages (NEW Jan 2026):**
- `/family-mediation-council` - FMC guide (5,400/mo search volume)
- `/mediation-services` - UK mediation services (2,400/mo)
- `/family-mediation-services` - Family mediation services (880/mo)
- `/family-law-mediation` - Family law mediation guide (880/mo)
- `/family-mediation-solicitors` - Mediation solicitors guide (480/mo)
- `/commercial-mediation-services` - Commercial/business mediation
- `/mediation-services-near-me` - Services locator page (880/mo)

**Location Pages (Local SEO - Verified Mediator Directories):**

*Major Cities - England:*
- `/family-mediation-london` - London mediators (9 verified providers)
- `/family-mediation-manchester` - Manchester/Greater Manchester (6 verified providers)
- `/family-mediation-birmingham` - Birmingham/West Midlands (8 verified providers)
- `/family-mediation-leeds` - Leeds/West Yorkshire (7 verified providers)
- `/family-mediation-sheffield` - Sheffield/South Yorkshire (6 verified providers) NEW
- `/family-mediation-nottingham` - Nottingham/Nottinghamshire (5 verified providers) NEW
- `/family-mediation-newcastle` - Newcastle/North East (7 verified providers)
- `/family-mediation-bristol` - Bristol/South West (8 verified providers)
- `/family-mediation-liverpool` - Liverpool/Merseyside (8 verified providers)
- `/family-mediation-southampton` - Southampton/Hampshire (7 verified providers)
- `/family-mediation-norwich` - Norwich/Norfolk (6 verified providers)
- `/family-mediation-colchester` - Colchester/Essex (7 verified providers)
- `/family-mediation-truro` - Truro/Cornwall (6 verified providers)

*Scotland (different legal system):*
- `/family-mediation-edinburgh` - Edinburgh (Law Society of Scotland accredited)
- `/family-mediation-glasgow` - Glasgow (Law Society of Scotland accredited)

*Wales:*
- `/family-mediation-cardiff` - Cardiff/South Wales (6 verified providers)
- `/family-mediation-swansea` - Swansea/West Wales (7 verified providers)

*Northern Ireland (different legal system):*
- `/family-mediation-belfast` - Belfast (FREE pre-court mediation via FMNI)

*Regional Pages:*
- `/family-mediation-guildford` - Guildford mediators (7 verified providers)
- `/surrey-family-mediation` - Surrey mediation services (optimized for KD 5 keyword)
- `/kent-family-mediation` - Kent mediation services (optimized for KD 1 keyword)
- `/mediation-london` - London overview

*Finder Pages:*
- `/family-mediation-near-me`, `/mediation-near-me`, `/find-a-mediator`

**Other Clusters:** Mediation, Guides, Rights, Support (50+ additional pages)

**Total pages:** 88 published | **Estimated search volume: ~135,000/month**

### Location Page Features

Each city page includes:
- Verified mediator directory with real addresses and contact details
- External source links (official websites, Companies House)
- FAQ schema markup for rich snippets
- BreadcrumbList schema
- Service schema for local SEO
- Cost comparison tables
- Local family court information
- Internal links to MIAM certificate, C100, legal aid pages
- Legal disclaimer

### Database Storage

Location pages are stored in the `pages` table with `cluster = 'find-mediator'`:
- Content stored as MDX in `content_mdx` column
- JSON-LD schemas in `schema_jsonld` column
- Related pages for internal linking
- All pages dynamically included in sitemap

**Verified mediators by city:**
- London: The Family Mediation Centre, London Mediation, FMACS, Calm Mediation, Osbornes Law, We Mediate, Argutia, Children 1st, Peaceful Solutions
- Manchester: Manchester Family Mediation Solutions, Family Mediation Practice, Forward Family Mediation, UK Family Mediation, Manchester & Cheshire Mediation
- Birmingham: Access Mediation Services, FMACS, Mediation Matters Midlands, NFM, Anthony Collins Solicitors, Marcia Mediation, Aspire
- Newcastle: Pax Mediation, Crowther Mediation, Marcia Mediation, Trusted Mediators, Compass Resolution, Trinity Chambers
- Leeds: Turning Point Mediation, Direct Mediation Services, Consilia Legal, FMACS, Crowther Mediation
- Bristol: Access Mediation Services, Children 1st, Lovegrove Mediation, Sharp Family Law, BLB Solicitors, Together Mediation, Clarke Willmott
- Liverpool: Family Mediation Service, Winstanley Mediation, Crowther Mediation, FMACS, NFM, Mediation Solutions UK
- Edinburgh: MFMac, Drummond Miller, Harper Macleod, Relationships Scotland, CALM Scotland, Scottish Mediation
- Glasgow: Family Mediation West, MSHB, MFMac, Relationships Scotland, Effective Dispute Solutions
- Cardiff: Family Mediation Cymru, UK Family Mediation Cardiff, FMACS, Grant Stephens, Family Matters Mediation, Passmores
- Belfast: Family Mediation NI (FREE), Pauline Knight Mediation, Mediation & Counselling NI, Francis Hanna & Co
- Southampton: Evolve Mediation, Hampshire Mediation, UK Family Mediation, Moore Barlow, Amity Mediation, Summit Family Mediation, Paris Smith
- Norwich: The Family Mediation Trust, Lighthouse Mediation, Amity Mediation, UK Family Mediation Norfolk, Patricia Brodie, FM Family Law
- Swansea: FMACS, Mediation West Wales, Family Matters Mediation, Marcia Mediation, Direct Mediation Services
- Truro: NFM, Accord Mediation, Children 1st Mediation, Cornwall Family Mediation, Marcia Mediation
- Colchester: Lauren Sadler (Gleamed), Barclay DeVere, Essex Mediation, VR Family Mediation, Marcia Mediation, Amity Mediation
- Guildford: SFMS, Mediate UK, Surrey Family Mediation, Relate West Surrey, Moore Barlow, FMACS

---

## Accessibility (WCAG 2.1)

### Fixes Applied (Jan 2026)
- **Contrast**: Footer uses black background with white text (AAA compliance)
- **Buttons**: Mobile hamburger has aria-label and aria-expanded
- **Links**: Underlined for distinguishability
- **Headings**: Proper semantic hierarchy (no skipped levels)
- **Images**: Alt text on all images, fetchpriority on LCP image

### Lighthouse Scores (Target)
- Performance: 70+
- Accessibility: 95+
- Best Practices: 100
- SEO: 100

---

## Miam - The AI Mediator

### Persona
- **Name**: Miam (pronounced "mee-am")
- **Role**: AI mediation preparation assistant
- **Gender**: Female
- **Tone**: Warm, compassionate, professional, non-judgmental
- **Approach**: Child-focused, solution-oriented, emotionally intelligent

### Hume Voice Configuration
- **Config ID**: 8351d978-f1a9-4263-89df-af62f45fccf6
- Calm, measured pace
- Empathetic inflection
- British English accent
- Supportive but professional

### Key Behaviors
1. **Always child-focused**: Frame everything around children's wellbeing
2. **Never take sides**: Remain strictly neutral
3. **Validate emotions**: Acknowledge feelings before moving to practicalities
4. **Clarify, don't advise**: Help users understand options, don't tell them what to do
5. **Know limitations**: Be clear that only human mediators can issue MIAM certificates
6. **Detect distress**: If domestic abuse or high conflict detected, handle sensitively

---

## Agent Tools (Pydantic AI)

```python
@agent.tool
async def capture_position(category, item, context) -> str:
    """Record a position item from the user's mediation preparation."""

@agent.tool
async def get_position_summary(user_id, case_id) -> dict:
    """Retrieve the user's current position summary."""

@agent.tool
async def get_miam_info(topic) -> str:
    """Retrieve information about MIAM process, exemptions, costs, etc."""

@agent.tool
async def check_exemption_eligibility(situation) -> dict:
    """Check if user might qualify for MIAM exemption."""

@agent.tool
async def search_mediators(location, specialization) -> list[dict]:
    """Search the mediator directory."""

@agent.tool
async def generate_preparation_summary(case_id, user_id) -> str:
    """Generate a preparation summary document for the user."""
```

---

## Environment Variables

### Frontend (Vercel)
```bash
DATABASE_URL=postgresql://...
NEON_AUTH_BASE_URL=https://...

HUME_API_KEY=...
HUME_SECRET_KEY=...
NEXT_PUBLIC_HUME_API_KEY=...
NEXT_PUBLIC_HUME_CONFIG_ID=8351d978-f1a9-4263-89df-af62f45fccf6

GOOGLE_API_KEY=...

AGENT_URL=https://miam-quest-agent-production.up.railway.app
NEXT_PUBLIC_AGENT_URL=https://miam-quest-agent-production.up.railway.app

ZEP_API_KEY=...
```

### Agent (Railway)
```bash
DATABASE_URL=postgresql://...
GOOGLE_API_KEY=...
ZEP_API_KEY=...
```

---

## Development Commands

```bash
# Frontend
npm install
npm run dev          # http://localhost:3000

# Agent (separate terminal)
cd agent
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn src.agent:app --reload   # http://localhost:8000
```

---

## Deployment

### Frontend (Vercel)
- Auto-deploys from `main` branch
- Environment variables in Vercel dashboard
- URL: https://miam.quest

### Agent (Railway)
- Deploy: `cd agent && railway up /Users/dankeegan/miam.quest/agent --path-as-root --detach`
- URL: https://miam-quest-agent-production.up.railway.app
- Environment variables in Railway dashboard

---

## Content Guidelines

### Legal Disclaimers (Required on all pages)
- "Miam is an AI assistant and cannot provide legal advice"
- "Only FMC-accredited mediators can issue valid MIAM certificates"
- "If you're experiencing domestic abuse, you may be exempt from MIAM requirements"
- "Beta product - Q1 2026 launch"

### Key Facts (Aligned with Authoritative Sources)
- MIAM duration: 45-60 minutes
- MIAM cost: £100-£150 (without legal aid)
- Certificate validity: 4 months
- Only FMC-accredited mediators can sign court forms

### Citation Policy (E-A-T for SEO)
When stating facts about MIAMs, mediation, or family law, **always cite authoritative sources** with links:

**Priority sources (in order):**
1. **UK Government** - Gov.uk, HMCTS, Legal Aid Agency
2. **Family Mediation Council (FMC)** - Official accreditation body
3. **National Family Mediation (NFM)** - Established charity
4. **Cafcass** - Children and Family Court Advisory Service
5. **Established UK solicitors** - Burnetts, Family Law Partners, etc.

**How to cite:**
- Inline links: "According to the [Family Mediation Council](https://www.familymediationcouncil.org.uk/...), a MIAM typically lasts 45-60 minutes."
- Reference sections: Group external links at end of relevant sections
- PDF footers: Include "Source: familymediationcouncil.org.uk" in footer

**Why this matters:**
- Demonstrates expertise and trustworthiness (E-A-T)
- Users can verify facts independently
- Protects against liability (we're citing, not advising)
- Improves SEO through authoritative outbound links

### Sensitive Topics
Handle with care:
- Domestic abuse → Provide exemption info, support resources
- Child safety concerns → Recommend professional help immediately
- High conflict → De-escalate, suggest human mediator
- Financial abuse → Acknowledge, provide resources

---

## Repository

GitHub: https://github.com/Londondannyboy/miam.quest

---

## Changelog

### January 2026
- Rebranded from "MIAM.quest" to "Miam Certificate Quest"
- SEO optimization for "miam certificate" keyword
- Added authoritative source links (FMC, NFM, Gov.uk, Burnetts)
- Accessibility improvements (contrast, aria labels, heading hierarchy)
- Performance optimizations (LCP image priority, image sizing)
- Updated beta banner with Q1 2026 launch
- Updated all metadata and JSON-LD schemas
- **Content expansion**: 19 pages live, 21 more planned (see CONTENT_CREATION_PLAN.md)

---

## Related Documents

| Document | Purpose |
|----------|---------|
| `CONTENT_CREATION_PLAN.md` | Prioritized content gap analysis and creation roadmap |
| `CONTENT_PLAN.md` | Original keyword research and site architecture |
| `PRD.md` | Product requirements document |
