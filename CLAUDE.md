# CLAUDE.md - MIAM.quest Development Guide

## Project Overview

**MIAM.quest** is an AI-powered mediation preparation and support platform for UK family disputes. It helps separating couples prepare for their legally-required MIAM (Mediation Information Assessment Meeting) through voice and chat conversations with "Miam" - an empathetic female AI mediator.

### Core Value Proposition
- Free AI-powered mediation preparation
- Voice-first interaction with Miam
- Document generation (parenting plans, financial summaries)
- Connection to accredited human mediators for legally-binding outcomes

### Legal Context
> A MIAM is legally required in England & Wales before applying to court for child arrangements (C100 form). Only FMC-accredited mediators can issue valid MIAM certificates. Miam (the AI) helps users **prepare** for mediation - she cannot issue certificates.

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

## Project Structure

```
miam.quest/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Landing page (SEO optimized)
│   │   ├── layout.tsx          # Root layout
│   │   ├── api/
│   │   │   ├── copilotkit/     # CopilotKit runtime
│   │   │   ├── hume-token/     # Hume voice tokens
│   │   │   └── auth/           # Neon auth routes
│   │   ├── prepare/            # Preparation flow pages
│   │   ├── case/[id]/          # Case management
│   │   └── mediators/          # Mediator directory
│   ├── components/
│   │   ├── VoiceInput.tsx      # Hume voice component
│   │   ├── MiamChat.tsx        # CopilotKit sidebar
│   │   ├── PositionSummary.tsx # Position display
│   │   ├── DocumentEditor.tsx  # CopilotKit document editing
│   │   └── ...
│   └── lib/
│       ├── auth/               # Neon auth client/server
│       ├── types.ts            # TypeScript interfaces
│       └── prompts.ts          # System prompts
├── agent/                      # Python backend
│   ├── src/
│   │   ├── main.py             # FastAPI entry
│   │   └── agent.py            # Pydantic AI agent
│   ├── pyproject.toml
│   └── Procfile                # Railway deployment
├── migrations/                 # SQL migrations
└── public/                     # Static assets
```

---

## Miam - The AI Mediator

### Persona
- **Name**: Miam (pronounced "mee-am")
- **Role**: AI mediation preparation assistant
- **Gender**: Female
- **Tone**: Warm, compassionate, professional, non-judgmental
- **Approach**: Child-focused, solution-oriented, emotionally intelligent

### Voice Characteristics (Hume Config)
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

### Sample Miam Responses
```
"I hear that this is really difficult for you. Let's take this one step at a time."

"What matters most here is what works best for your children. Can you tell me about their routine?"

"Both of you wanting the best for your children is actually common ground - that's a good starting point."

"I can help you prepare for mediation, but for a legally valid MIAM certificate, you'll need to meet with an accredited mediator. Would you like me to help you find one?"
```

---

## Core User Flows

### Flow 1: Solo Preparation
```
Landing → Start Voice/Chat → Miam explains MIAM →
Capture situation → Identify priorities → Generate summary →
Offer: Invite other party OR Find mediator
```

### Flow 2: Position Capture
```
User starts session → Miam asks structured questions →
Extract: Must-haves, Priorities, Nice-to-haves, Red lines →
Store in database → Generate position summary document
```

### Flow 3: Mediator Connection
```
User requests mediator → Show directory →
User selects mediator → Provide contact/booking link →
(Future: In-app booking)
```

---

## Database Schema

### Core Tables
```sql
-- Users (via Neon Auth)
-- Extended with profile data

-- Cases
CREATE TABLE cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  party_a_id UUID REFERENCES auth.users(id),
  party_b_id UUID REFERENCES auth.users(id),
  case_type TEXT, -- 'child_arrangements', 'financial', 'both'
  status TEXT DEFAULT 'preparation',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Positions
CREATE TABLE positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES cases(id),
  user_id UUID REFERENCES auth.users(id),
  must_haves JSONB,
  priorities JSONB,
  nice_to_haves JSONB,
  red_lines JSONB,
  raw_transcript TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documents
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES cases(id),
  doc_type TEXT, -- 'preparation_summary', 'parenting_plan', 'financial_summary'
  content TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mediators (directory)
CREATE TABLE mediators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  fmc_accredited BOOLEAN DEFAULT true,
  specializations TEXT[],
  location TEXT,
  remote_available BOOLEAN DEFAULT true,
  contact_email TEXT,
  website TEXT,
  bio TEXT
);
```

---

## Agent Tools (Pydantic AI)

```python
@agent.tool
async def capture_position(
    user_id: str,
    case_id: str,
    category: Literal["must_have", "priority", "nice_to_have", "red_line"],
    item: str,
    context: str
) -> str:
    """Record a position item from the user's mediation preparation."""

@agent.tool
async def get_position_summary(user_id: str, case_id: str) -> dict:
    """Retrieve the user's current position summary."""

@agent.tool
async def generate_preparation_document(case_id: str, user_id: str) -> str:
    """Generate a preparation summary document for the user."""

@agent.tool
async def search_mediators(
    location: str = None,
    specialization: str = None,
    remote_only: bool = False
) -> list[dict]:
    """Search the mediator directory."""

@agent.tool
async def get_miam_info(topic: str) -> str:
    """Retrieve information about MIAM process, exemptions, costs, etc."""

@agent.tool
async def detect_exemption_eligibility(situation: str) -> dict:
    """Check if user might qualify for MIAM exemption (domestic abuse, urgency, etc.)."""
```

---

## Environment Variables

```bash
# Neon Database + Auth
DATABASE_URL=postgresql://...
NEON_AUTH_BASE_URL=https://...

# Hume Voice
HUME_API_KEY=...
HUME_SECRET_KEY=...
NEXT_PUBLIC_HUME_API_KEY=...
NEXT_PUBLIC_HUME_CONFIG_ID=...  # Miam voice config

# LLM
GOOGLE_API_KEY=...

# Agent
AGENT_URL=https://miam-quest-agent.up.railway.app
NEXT_PUBLIC_AGENT_URL=...

# Zep Memory
ZEP_API_KEY=...
```

---

## Development Commands

```bash
# Frontend
cd miam.quest
npm install
npm run dev          # http://localhost:3000

# Agent (separate terminal)
cd agent
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python src/main.py   # http://localhost:8000

# Database migrations
psql $DATABASE_URL -f migrations/001_create_cases.sql
```

---

## SEO Target Keywords

| Keyword | Volume | Difficulty | Priority |
|---------|--------|------------|----------|
| miam | 2,900 | 20 | HIGH |
| miam certificate | 480 | 9 | HIGH |
| what is a miam | 210 | 16 | HIGH |
| miam mediation | 880 | 40 | MEDIUM |
| miam exemption | 210 | — | MEDIUM |
| miam form | 170 | 17 | MEDIUM |
| c100 form | 12,100 | 25 | HIGH (related) |

---

## Content Guidelines

### Tone
- Compassionate and supportive
- Professional but accessible
- Non-legal jargon where possible
- Always child-focused

### Legal Disclaimers
Always include:
- "Miam is an AI assistant and cannot provide legal advice"
- "Only FMC-accredited mediators can issue valid MIAM certificates"
- "If you're experiencing domestic abuse, you may be exempt from MIAM requirements"

### Sensitive Topics
Handle with care:
- Domestic abuse → Provide exemption info, support resources
- Child safety concerns → Recommend professional help immediately
- High conflict → De-escalate, suggest human mediator
- Financial abuse → Acknowledge, provide resources

---

## Testing Checklist

- [ ] Voice conversation flows naturally
- [ ] Position capture stores correctly
- [ ] Document generation works
- [ ] Auth flow (sign up, sign in, profile)
- [ ] Mediator directory displays
- [ ] Mobile responsive
- [ ] SEO meta tags correct
- [ ] Accessibility (screen readers, keyboard nav)

---

## Deployment

### Frontend (Vercel)
- Auto-deploys from `main` branch
- Environment variables in Vercel dashboard

### Agent (Railway)
- Deploys via Procfile
- `web: uvicorn src.agent:app --host 0.0.0.0 --port $PORT`
- Environment variables in Railway dashboard

---

## Future Roadmap

### Phase 2
- [ ] Invite other party flow
- [ ] Async position capture for Party B
- [ ] Common ground analysis
- [ ] Draft parenting plan generator

### Phase 3
- [ ] Live two-party session with AI
- [ ] CopilotKit document collaboration
- [ ] Mediator marketplace with booking
- [ ] In-app video calls

### Phase 4
- [ ] Integration with FMC mediator systems
- [ ] MIAM certificate workflow (human-issued through platform)
- [ ] Analytics dashboard for mediators
