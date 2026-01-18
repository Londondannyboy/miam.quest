# Product Requirements Document: MIAM.quest

**Last Updated:** 18 January 2026
**Status:** Phase 1 MVP - LIVE
**Live URL:** https://miam.quest

## Executive Summary

MIAM.quest is an AI-powered mediation preparation platform that helps separating couples in the UK prepare for their legally-required Mediation Information Assessment Meeting (MIAM). Through voice and chat conversations with "Miam" - a compassionate AI mediator - users can organize their thoughts, understand the process, capture their position, and connect with accredited human mediators.

### Current Deployment

| Service | URL | Status |
|---------|-----|--------|
| Frontend | https://miam.quest | LIVE |
| Agent API | https://miam-quest-agent-production.up.railway.app | LIVE |
| CLM Endpoint | https://miam-quest-agent-production.up.railway.app/chat/completions | LIVE |
| GitHub | https://github.com/Londondannyboy/miam.quest | Active |

---

## Problem Statement

### The Current MIAM Experience

1. **Costly**: £100-300+ per person for a MIAM session
2. **Stressful**: Entering mediation unprepared increases anxiety
3. **Confusing**: Most people don't understand what a MIAM is or why it's required
4. **Inaccessible**: Limited availability, especially outside major cities
5. **Cold Start**: People arrive at mediation without having organized their thoughts

### The Opportunity

- 2,900+ monthly UK searches for "miam" alone
- MIAM is legally required before court (C100 form = 12,100 searches/month)
- No current AI-powered preparation tools exist
- Human mediators would benefit from better-prepared clients

---

## Solution

### Miam - Your AI Mediation Preparation Assistant

A voice-first AI assistant that:
- Explains the MIAM process in plain English
- Helps users organize their priorities and concerns
- Generates preparation documents
- Connects users with accredited human mediators

### Key Differentiators

1. **Voice-First**: Natural conversation, not forms
2. **Emotionally Intelligent**: Hume EVI detects and responds to emotional state
3. **Child-Focused**: Always frames discussions around children's wellbeing
4. **Legally Informed**: Knows UK family law context (without giving legal advice)
5. **Preparation, Not Replacement**: Complements human mediators, doesn't replace them

---

## User Personas

### Primary: Sarah (Party Initiating)
- **Age**: 35
- **Situation**: Separating from partner, two children (ages 6 and 9)
- **Goal**: Arrange fair child custody without expensive court battle
- **Pain Points**:
  - Overwhelmed by the process
  - Doesn't know where to start
  - Worried about costs
  - Anxious about confrontation
- **Tech Comfort**: Uses smartphone daily, comfortable with voice assistants

### Secondary: Mark (Other Party)
- **Age**: 38
- **Situation**: Sarah's ex-partner, received invitation to mediate
- **Goal**: Maintain relationship with children, fair financial settlement
- **Pain Points**:
  - Feels defensive/blamed
  - Skeptical of mediation
  - Worried about being disadvantaged
- **Tech Comfort**: Moderate

### Tertiary: Helen (Mediator)
- **Age**: 52
- **Situation**: FMC-accredited mediator with private practice
- **Goal**: More clients, better-prepared clients
- **Pain Points**:
  - Marketing is hard
  - Clients arrive unprepared
  - First sessions spent on basics
- **Tech Comfort**: Low-moderate

---

## Features

### MVP (Phase 1)

#### F1: Voice Conversation with Miam
**Priority**: P0 (Must Have)

Users can have a natural voice conversation with Miam about their situation.

**Acceptance Criteria**:
- [ ] User clicks "Talk to Miam" to start voice session
- [ ] Miam introduces herself and explains how she can help
- [ ] Miam asks about user's situation (children, current arrangement, concerns)
- [ ] Miam explains what a MIAM is and why it's needed
- [ ] Session persists in memory via Zep
- [ ] Works on mobile and desktop

**Technical**: Hume EVI, custom config for Miam persona

---

#### F2: Chat Interface with Miam
**Priority**: P0 (Must Have)

Users can chat with Miam via text as alternative to voice.

**Acceptance Criteria**:
- [ ] CopilotKit sidebar available on all pages
- [ ] Same Miam persona and knowledge as voice
- [ ] Can share links and resources in chat
- [ ] History persists across sessions

**Technical**: CopilotKit with Pydantic AI backend

---

#### F3: MIAM Education Content
**Priority**: P0 (Must Have)
**Status**: ✅ COMPLETE

SEO-optimized content explaining MIAM process.

**Pages (LIVE)**:
- `/` - Landing page with MIAM overview ✅
- `/miam/what-is-a-miam` - Detailed explanation ✅
- `/miam/certificate` - Certificate information ✅
- `/miam/exemptions` - Who is exempt and why ✅
- `/mediation/cost` - Cost information and free options ✅
- `/mediation/what-is-mediation` - What is mediation ✅
- `/mediation/workplace` - Workplace mediation ✅
- `/forms/c100` - C100 form guide ✅

**Est. Total Search Volume**: ~43,000/month

**Acceptance Criteria**:
- [x] Each page targets specific keyword
- [x] Proper meta tags and structured data (FAQ schema, breadcrumbs)
- [x] Clear CTAs to start conversation with Miam
- [x] Mobile responsive
- [x] Global navigation with dropdown menus
- [x] Footer with all topic clusters
- [x] Legal disclaimers on all pages

---

#### F4: Position Capture
**Priority**: P1 (Should Have)

Miam helps users articulate and record their position.

**Categories**:
- Must-Haves (non-negotiable)
- Priorities (important but flexible)
- Nice-to-Haves (would be good)
- Red Lines (deal-breakers)

**Topics**:
- Living arrangements
- School and education
- Holidays and special occasions
- Communication between households
- Decision-making responsibilities

**Acceptance Criteria**:
- [ ] Miam asks structured questions to extract position
- [ ] Items stored in database with case association
- [ ] User can review and edit captured items
- [ ] Position summary viewable

**Technical**: Agent tools for CRUD operations on positions table

---

#### F5: Preparation Summary Document
**Priority**: P1 (Should Have)

Generate a document summarizing user's preparation.

**Contents**:
- Situation overview
- Children's details and needs
- Current arrangements
- Desired outcomes
- Key concerns
- Questions for mediator

**Acceptance Criteria**:
- [ ] Generated from captured position data
- [ ] Downloadable as PDF
- [ ] Shareable link option
- [ ] Editable via CopilotKit

**Technical**: CopilotKit document editing, PDF generation

---

#### F6: Mediator Directory
**Priority**: P1 (Should Have)

Searchable directory of accredited mediators.

**Acceptance Criteria**:
- [ ] List of FMC-accredited mediators
- [ ] Filter by location, specialization
- [ ] Remote/in-person filter
- [ ] Contact information and website links
- [ ] Basic profiles with bio

**Initial**: Manual curation of 20-50 mediators
**Future**: Self-service mediator sign-up

---

#### F7: User Authentication
**Priority**: P0 (Must Have)

Users can create accounts to save progress.

**Acceptance Criteria**:
- [ ] Sign up with email
- [ ] Sign in / sign out
- [ ] Profile page with basic info
- [ ] Session data associated with account
- [ ] Guest mode with limited sessions (2 free)

**Technical**: Neon Auth (already configured)

---

### Phase 2 (Post-MVP)

#### F8: Invite Other Party
Users can invite their ex-partner to the platform.

#### F9: Async Position Capture (Party B)
Other party completes their own preparation separately.

#### F10: Common Ground Analysis
AI analyzes both positions to find overlap.

#### F11: Draft Parenting Plan
Generate template parenting plan based on captured positions.

---

### Phase 3 (Future)

#### F12: Live Two-Party Session
Both parties join voice/video session with AI facilitation.

#### F13: CopilotKit Document Collaboration
Real-time collaborative editing of agreements.

#### F14: Mediator Marketplace
Booking system with calendar integration.

---

## User Flows

### Flow 1: New Visitor

```
1. User searches "what is a miam" on Google
2. Lands on miam.quest/what-is-a-miam
3. Reads content, sees CTA "Talk to Miam"
4. Clicks to start voice conversation
5. Miam greets user, asks about situation
6. After 5 minutes, prompts to sign up
7. User creates account
8. Continues conversation with full history saved
```

### Flow 2: Preparation Session

```
1. Logged-in user starts session with Miam
2. Miam: "Last time we talked about your concerns about school pickup. Would you like to continue from there?"
3. User continues conversation
4. Miam: "It sounds like having the children on school nights is really important to you. Would you call that a must-have or a priority?"
5. User: "A must-have"
6. Miam captures and confirms
7. After 30 mins, Miam: "We've covered a lot. Would you like me to generate a summary document?"
8. User views/downloads summary
```

### Flow 3: Find Mediator

```
1. User: "I think I'm ready for actual mediation"
2. Miam: "That's great progress. I can help you find an accredited mediator. Are you looking for someone local or would remote mediation work?"
3. User: "Remote is fine"
4. Miam shows directory filtered to remote
5. User selects mediator
6. Miam: "Would you like to share your preparation summary with them?"
7. User approves
8. Miam provides contact info / booking link
```

---

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│                     (Next.js + Vercel)                       │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Voice     │  │   Chat      │  │   Content   │         │
│  │   (Hume)    │  │ (CopilotKit)│  │   (Pages)   │         │
│  └──────┬──────┘  └──────┬──────┘  └─────────────┘         │
│         │                │                                   │
│         └────────┬───────┘                                   │
│                  ▼                                           │
│         ┌─────────────────┐                                  │
│         │   API Routes    │                                  │
│         │  /api/hume-token│                                  │
│         │  /api/copilotkit│                                  │
│         └────────┬────────┘                                  │
└──────────────────┼──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                    Agent Backend                             │
│                  (FastAPI + Railway)                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │                  Pydantic AI Agent                   │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │    │
│  │  │ Intake  │ │Position │ │Document │ │Mediator │   │    │
│  │  │ Tools   │ │ Tools   │ │ Tools   │ │ Tools   │   │    │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│         ┌────────────────┼────────────────┐                 │
│         ▼                ▼                ▼                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │    Neon     │  │     Zep     │  │   Gemini    │         │
│  │  (Postgres) │  │  (Memory)   │  │   (LLM)     │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

---

## Success Metrics

### Phase 1 (Month 1-3)

| Metric | Target |
|--------|--------|
| Monthly organic visitors | 1,000 |
| Conversations started | 300 |
| Accounts created | 150 |
| Preparation summaries generated | 50 |
| Mediator directory clicks | 30 |

### Phase 2 (Month 4-6)

| Metric | Target |
|--------|--------|
| Monthly organic visitors | 5,000 |
| Conversations started | 1,500 |
| Accounts created | 750 |
| Party B invitations sent | 200 |
| Mediator referrals | 100 |

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Users expect AI to issue MIAM certificate | HIGH | HIGH | Clear messaging throughout, disclaimers |
| Domestic abuse disclosure | HIGH | MEDIUM | Sensitive handling flow, resources, exemption info |
| Legal liability for advice | HIGH | LOW | Explicit "not legal advice" disclaimers, no outcome recommendations |
| Low conversion to human mediators | MEDIUM | MEDIUM | Strong CTA design, value demonstration |
| Voice quality issues | MEDIUM | MEDIUM | Fallback to chat, good error handling |

---

## Competitive Landscape

| Competitor | Offering | Gap |
|------------|----------|-----|
| Family Mediation Council | Mediator directory | No preparation tools |
| Direct Gov | MIAM information | Dry, no interactivity |
| Private mediators | Full service | Expensive, no prep support |
| **MIAM.quest** | AI preparation + directory | Unique positioning |

---

## Legal & Compliance

### Required Disclaimers
- "Miam is an AI assistant and cannot provide legal advice"
- "Only FMC-accredited mediators can issue valid MIAM certificates"
- "This service is for information and preparation purposes only"

### Data Protection (GDPR)
- Clear privacy policy
- Data processing consent
- Right to deletion
- Secure storage (Neon EU region)

### Sensitive Data Handling
- Domestic abuse disclosures handled carefully
- Child safeguarding awareness
- Signposting to professional help

---

## Timeline

### Week 1-2: Foundation
- [ ] Update branding (MIAM.quest, Miam persona)
- [ ] Create Hume config for Miam voice
- [ ] Write core system prompts
- [ ] Create database migrations for new schema

### Week 3-4: Core Features
- [ ] Implement position capture flow
- [ ] Build preparation summary generation
- [ ] Create mediator directory (static initially)
- [ ] Update landing page content

### Week 5-6: Content & SEO
- [ ] Write pillar content pages
- [ ] Implement structured data
- [ ] Set up analytics
- [ ] Create sitemap

### Week 7-8: Polish & Launch
- [ ] User testing
- [ ] Bug fixes
- [ ] Performance optimization
- [ ] Soft launch

---

## Appendix: MIAM Exemptions

Users may be exempt from MIAM if:
- Domestic abuse (with evidence)
- Child protection concerns
- Urgency (risk of harm)
- Previous MIAM within 4 months
- Other party overseas/in prison
- Unable to attend due to disability

Miam should detect these situations and provide appropriate guidance.
