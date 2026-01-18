# CLAUDE.md - MIAM.quest Development Guide

## Project Overview

**MIAM.quest** is an AI-powered mediation preparation and support platform for UK family disputes. It helps separating couples prepare for their legally-required MIAM (Mediation Information Assessment Meeting) through voice and chat conversations with "Miam" - an empathetic female AI mediator.

### Core Value Proposition
- Free AI-powered mediation preparation
- Voice-first interaction with Miam (via Hume EVI)
- Document generation (parenting plans, financial summaries)
- Connection to accredited human mediators for legally-binding outcomes
- SEO content targeting 60k+ monthly searches

### Legal Context
> A MIAM is legally required in England & Wales before applying to court for child arrangements (C100 form). Only FMC-accredited mediators can issue valid MIAM certificates. Miam (the AI) helps users **prepare** for mediation - she cannot issue certificates or provide legal advice.

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
│   │   ├── Footer.tsx          # Global footer with clusters
│   │   ├── BetaBanner.tsx      # Beta disclaimer banner
│   │   ├── CookieConsent.tsx   # Cookie consent
│   │   ├── VoiceInput.tsx      # Hume voice component
│   │   └── providers.tsx       # Context providers
│   └── lib/
│       ├── auth/               # Neon auth client/server
│       ├── types.ts            # TypeScript interfaces
│       ├── prompts.ts          # System prompts
│       └── seo.ts              # SEO utilities
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

## SEO Content Pages (Live)

| Page | URL | Target Keywords | Est. Volume |
|------|-----|-----------------|-------------|
| Homepage | / | mediation, miam | 17,700 |
| What is a MIAM | /miam/what-is-a-miam | what is a miam | 210 |
| MIAM Certificate | /miam/certificate | miam certificate | 480 |
| MIAM Exemptions | /miam/exemptions | miam exemption | 210 |
| What is Mediation | /mediation/what-is-mediation | mediation meaning, definition | 11,000 |
| Mediation Costs | /mediation/cost | mediation costs uk | 390 |
| Workplace Mediation | /mediation/workplace | workplace mediation | 880 |
| C100 Form | /forms/c100 | c100 form | 12,100 |

**Total estimated search volume: ~43,000/month**

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
- "This is a beta service - always consult a qualified professional"

### Sensitive Topics
Handle with care:
- Domestic abuse → Provide exemption info, support resources
- Child safety concerns → Recommend professional help immediately
- High conflict → De-escalate, suggest human mediator
- Financial abuse → Acknowledge, provide resources

---

## Repository

GitHub: https://github.com/Londondannyboy/miam.quest
