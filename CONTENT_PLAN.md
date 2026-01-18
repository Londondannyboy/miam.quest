# MIAM.quest - Comprehensive Content Plan

**Generated:** 18 January 2026
**Target Market:** UK Family Mediation
**Total Addressable Search Volume:** ~60,000/month

---

## Content Standards

### Quality Requirements

| Requirement | Standard |
|-------------|----------|
| **Length** | Minimum 2,500 words for pillar pages, 1,500 for supporting |
| **Authority** | Cite official sources (Gov.uk, FMC, HMCTS) |
| **External Links** | Minimum 3 authoritative external links per page |
| **Internal Links** | Minimum 5 internal links per page |
| **Keyword Density** | Target keyword in H1, all H2s, and minimum 5x in body |
| **Keyword Bold** | Target keyword bolded once (first meaningful occurrence) |
| **Images** | Hero image + 2-3 body images via Unsplash API |
| **Schema** | FAQPage, HowTo, or Article markup on every page |
| **Update Frequency** | Review quarterly, update for legal changes |

### Image Strategy (Unsplash API)

```typescript
// Hero image query patterns
const unsplashQueries = {
  miam: "family mediation conversation",
  mediation: "peaceful discussion meeting",
  divorce: "separation support family",
  children: "happy children family",
  legal: "legal documents court",
  workplace: "office meeting professional",
  cost: "calculator money planning",
  forms: "paperwork documents official"
};

// Implementation
const heroImage = await fetch(
  `https://api.unsplash.com/photos/random?query=${query}&orientation=landscape`,
  { headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` }}
);
```

### Content Template Structure

```markdown
# [H1 with Primary Keyword]

![Hero Image Alt Text with Keyword](unsplash-url)

**[Opening paragraph with keyword bolded] establishes topic and user intent.**

## Table of Contents
- [Section 1 with Keyword](#)
- [Section 2 with Keyword](#)
...

## [H2 with Primary Keyword] - Section 1

[Content with keyword appearing naturally, internal links to related pages]

![Supporting Image](unsplash-url)

## [H2 with Secondary Keyword] - Section 2

[Content with external links to authoritative sources]

## Frequently Asked Questions About [Keyword]

<FAQSchema>
Q: [Question with keyword]?
A: [Answer]
</FAQSchema>

## Summary: [Keyword] Key Takeaways

[Bullet points summarizing key information]

---

**Disclaimer:** [Legal disclaimer]

**Sources:**
- [External Link 1]
- [External Link 2]
- [External Link 3]

**Related Pages:**
- [Internal Link 1]
- [Internal Link 2]
- [Internal Link 3]
```

---

## Keyword Universe

### Tier 1: High Volume Keywords (Priority)

| Keyword | Volume | Difficulty | CPC | Page |
|---------|--------|------------|-----|------|
| mediation | 14,800 | 52 | £4.67 | Homepage |
| c100 form | 12,100 | 25 | £3.50 | /forms/c100 |
| mediation meaning | 6,600 | 42 | £1.20 | /mediation/what-is-mediation |
| family mediation | 4,400 | 56 | £7.50 | /mediation/family |
| miam | 2,900 | 20 | £3.46 | /miam |
| mediation services | 2,400 | 58 | £7.78 | /mediation |
| what is mediation | 2,400 | 45 | £1.84 | /mediation/what-is-mediation |
| divorce mediation | 1,900 | 49 | £9.25 | /mediation/divorce |
| family mediation near me | 1,600 | 42 | £9.18 | /mediation/family/near-me |
| mediation definition | 1,000 | 24 | £0.51 | /mediation/what-is-mediation |
| mediation near me | 1,000 | 58 | £9.32 | /mediation/near-me |
| define mediation | 1,000 | 22 | £0.51 | /mediation/what-is-mediation |

### Tier 2: MIAM-Specific Keywords

| Keyword | Volume | Difficulty | CPC | Page |
|---------|--------|------------|-----|------|
| miam mediation | 880 | 40 | £5.13 | /miam/mediation |
| workplace mediation | 880 | 8 | £4.49 | /mediation/workplace |
| miam certificate | 480 | 9 | £3.14 | /miam/certificate |
| mediation costs uk | 390 | 2 | £3.48 | /mediation/cost |
| fm1 form | 320 | Low | £1.30 | /forms/fm1 |
| miam exemption | 210 | Low | £11.16 | /miam/exemptions |
| what is a miam | 210 | 16 | £1.72 | /miam/what-is-a-miam |
| miam form | 170 | 17 | £1.95 | /miam/form |
| miam meeting | 170 | 31 | £3.86 | /miam/meeting |
| free mediation | 170 | 58 | £4.77 | /mediation/free |
| miam mediation near me | 170 | 41 | £8.08 | /miam/near-me |
| what is a miam certificate | 140 | Low | £1.28 | /miam/certificate |
| miam near me | 110 | 58 | £6.89 | /miam/near-me |

### Tier 3: Long-Tail & Supporting Keywords

| Keyword | Volume | Page |
|---------|--------|------|
| c100 form online | 500+ | /forms/c100 |
| c100 form download | 300+ | /forms/c100 |
| family mediation council | 200+ | /mediators/fmc |
| how much is mediation for child access | 100+ | /mediation/child-arrangements/cost |
| is miam compulsory | 30 | /miam/compulsory |
| miam exemption domestic abuse | 30+ | /miam/exemptions |
| who pays for mediation cost uk | 50+ | /mediation/cost |
| acas mediation | 100+ | /mediation/workplace |
| how to prepare for mediation at work | 50+ | /mediation/workplace/prepare |
| legal aid mediation | 90 | /mediation/legal-aid |
| family mediation voucher scheme | 200+ | /resources/voucher-scheme |
| what happens after c100 form | 100+ | /forms/c100/after |

---

## Site Architecture

```
miam.quest/
│
├── / (Homepage)
│   Target: mediation, miam
│   Volume: 17,700 combined
│
├── /miam/ (MIAM Hub - 8 pages)
│   ├── index                    [miam, miam mediation]
│   ├── /what-is-a-miam         [what is a miam]
│   ├── /certificate            [miam certificate]
│   ├── /exemptions             [miam exemptions, miam exemption domestic abuse]
│   ├── /form                   [miam form, fm1 form]
│   ├── /meeting                [miam meeting, miam appointment]
│   ├── /cost                   [miam cost]
│   ├── /compulsory             [is miam compulsory]
│   └── /near-me                [miam near me, miam mediation near me]
│
├── /mediation/ (Mediation Hub - 15 pages)
│   ├── index                   [mediation services]
│   ├── /what-is-mediation      [what is mediation, mediation meaning, mediation definition]
│   ├── /family/                [family mediation]
│   │   ├── /near-me            [family mediation near me]
│   │   ├── /free               [free family mediation]
│   │   └── /cost               [family mediation costs uk]
│   ├── /divorce/               [divorce mediation]
│   │   ├── /cost               [divorce mediation cost uk]
│   │   └── /vs-court           [mediation vs court]
│   ├── /child-arrangements/    [mediation for children, child custody mediation]
│   │   └── /cost               [how much is mediation for child access]
│   ├── /workplace/             [workplace mediation]
│   │   ├── /acas               [acas mediation]
│   │   └── /prepare            [how to prepare for mediation at work]
│   ├── /cost                   [mediation costs uk, who pays for mediation]
│   ├── /free                   [free mediation services uk]
│   ├── /legal-aid              [legal aid mediation]
│   └── /near-me                [mediation near me, mediation services near me]
│
├── /forms/ (Legal Forms Hub - 4 pages)
│   ├── /c100                   [c100 form]
│   │   ├── /download           [c100 form download, c100 form pdf]
│   │   ├── /online             [c100 form online]
│   │   └── /after              [what happens after c100 form]
│   └── /fm1                    [fm1 form]
│
├── /mediators/ (Directory - 10+ pages)
│   ├── /find                   [find a mediator]
│   ├── /fmc                    [family mediation council]
│   ├── /london                 [mediation london]
│   ├── /manchester             [mediation manchester]
│   ├── /birmingham             [mediation birmingham]
│   ├── /scotland               [family mediation scotland]
│   └── /[other-cities]         [mediation {city}]
│
├── /prepare/ (Preparation Hub - 3 pages)
│   ├── /checklist              [mediation preparation checklist]
│   ├── /questions              [what to expect at mediation]
│   └── /tips                   [how to prepare for family mediation]
│
└── /resources/ (Resources - 4 pages)
    ├── /glossary               [mediation terms]
    ├── /voucher-scheme         [family mediation voucher scheme 2025]
    ├── /domestic-abuse         [domestic abuse support]
    └── /comparison             [mediation vs solicitor]

TOTAL: 45+ pages targeting 100+ keywords
```

---

## Page-by-Page Content Specifications

### PILLAR 1: Homepage `/`

**Target Keywords:** mediation (14,800), miam (2,900)
**Word Count:** 3,000+
**Difficulty:** Medium

#### Content Outline

```markdown
# Mediation Made Simple: Meet Miam, Your AI Mediation Preparation Assistant

![Hero: Peaceful family conversation](unsplash: family mediation conversation)

**Mediation** is how thousands of UK families resolve disputes without going
to court. Whether you need a MIAM certificate or full family mediation,
Miam is here to help you prepare.

## What is Mediation and Why Does It Matter?

[300 words explaining mediation, link to /mediation/what-is-mediation]

![Image: People in discussion](unsplash: peaceful discussion meeting)

## Understanding MIAM: Your First Step to Mediation

[400 words on MIAM requirement, link to /miam/what-is-a-miam]

## How Miam Helps You Prepare for Mediation

[300 words on the AI assistant, CTA to start conversation]

## Types of Mediation We Help With

### Family Mediation
[150 words, link to /mediation/family]

### Divorce Mediation
[150 words, link to /mediation/divorce]

### Child Arrangements Mediation
[150 words, link to /mediation/child-arrangements]

### Workplace Mediation
[150 words, link to /mediation/workplace]

## The Mediation Process: Step by Step

[500 words with numbered steps, HowTo schema]

![Image: Step by step process](unsplash: planning steps journey)

## Mediation Costs and Funding Options

[300 words, link to /mediation/cost, /mediation/free, /mediation/legal-aid]

## Find an Accredited Mediator

[200 words, link to /mediators/find]

## Frequently Asked Questions About Mediation

<FAQSchema>
Q: What is mediation?
Q: Is mediation legally binding?
Q: How much does mediation cost in the UK?
Q: Do I need a MIAM before going to court?
Q: Can I get free mediation?
</FAQSchema>

## Start Your Mediation Journey Today

[CTA section with voice/chat options]

---

**External Links:**
- [Gov.uk - Family Mediation](https://www.gov.uk/looking-after-children-divorce/mediation)
- [Family Mediation Council](https://www.familymediationcouncil.org.uk/)
- [HMCTS - Family Court](https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service)

**Internal Links:**
- /miam/what-is-a-miam
- /mediation/what-is-mediation
- /mediation/family
- /mediation/cost
- /mediators/find
- /forms/c100
```

---

### PILLAR 2: `/miam/what-is-a-miam`

**Target Keywords:** what is a miam (210), miam meaning
**Word Count:** 2,500+
**Difficulty:** 16 (Easy)

#### Content Outline

```markdown
# What is a MIAM? Complete Guide to Mediation Information Assessment Meetings

![Hero: Professional mediation meeting](unsplash: professional meeting office)

A **MIAM** (Mediation Information Assessment Meeting) is a mandatory meeting
you must attend before applying to court for most family-related disputes
in England and Wales. This comprehensive guide explains everything you need
to know about what a MIAM involves.

## Table of Contents
- What Does MIAM Stand For?
- Why is a MIAM Required by Law?
- What Happens at a MIAM?
- Who Needs to Attend a MIAM?
- MIAM Exemptions
- How to Book a MIAM
- MIAM vs Full Mediation

## What Does MIAM Stand For?

**MIAM** stands for **Mediation Information Assessment Meeting**. It is a
preliminary meeting with an accredited family mediator...

[400 words explaining the acronym and purpose]

## Why is a MIAM Required by Law?

The Children and Families Act 2014 made MIAM attendance compulsory...

[500 words on legal requirement, external link to legislation]

![Image: Legal documents](unsplash: legal documents court)

## What Happens at a MIAM? Step-by-Step Guide

During your MIAM, the mediator will:

1. **Explain the mediation process**
2. **Assess whether mediation is suitable**
3. **Discuss your specific situation**
4. **Check for exemptions**
5. **Provide a MIAM certificate**

[600 words with HowTo schema]

## Who Needs to Attend a MIAM?

You must attend a MIAM if you're applying to court for:
- Child arrangements orders
- Financial orders on divorce
- Enforcement of existing orders

[400 words, link to /forms/c100]

## MIAM Exemptions: When You Don't Need to Attend

Not everyone needs a MIAM. Exemptions include:
- Domestic abuse (with evidence)
- Child protection concerns
- Urgency...

[300 words, link to /miam/exemptions]

## How to Book Your MIAM

[300 words on booking process, link to /miam/near-me and /mediators/find]

## MIAM vs Full Mediation: What's the Difference?

| Aspect | MIAM | Full Mediation |
|--------|------|----------------|
| Duration | 45-60 minutes | Multiple sessions |
| Purpose | Information & assessment | Dispute resolution |
| Outcome | Certificate | Agreement |

[300 words explaining difference]

## How Much Does a MIAM Cost?

[200 words, link to /miam/cost]

## Frequently Asked Questions About MIAM

<FAQSchema>
Q: What is a MIAM?
A: A MIAM (Mediation Information Assessment Meeting) is a mandatory meeting...

Q: How long does a MIAM take?
A: A typical MIAM lasts 45-60 minutes...

Q: Can I do a MIAM online?
A: Yes, many mediators offer remote MIAM sessions...

Q: What if my ex won't attend the MIAM?
A: You can still get a MIAM certificate showing you attended...

Q: Is a MIAM legally binding?
A: No, a MIAM is an assessment meeting, not a binding agreement...
</FAQSchema>

## Next Steps After Understanding What a MIAM Is

[CTA to speak with Miam AI or find a mediator]

---

**External Links:**
- [Gov.uk - Mediation](https://www.gov.uk/looking-after-children-divorce/mediation)
- [Family Mediation Council - MIAM Information](https://www.familymediationcouncil.org.uk/)
- [Children and Families Act 2014](https://www.legislation.gov.uk/ukpga/2014/6/contents)

**Internal Links:**
- /miam/certificate
- /miam/exemptions
- /miam/cost
- /miam/near-me
- /forms/c100
- /mediation/family
```

---

### PILLAR 3: `/miam/certificate`

**Target Keywords:** miam certificate (480), miam certificate for court
**Word Count:** 2,000+
**Difficulty:** 9 (Very Easy)

#### Content Outline

```markdown
# MIAM Certificate: What It Is, How to Get One, and Why You Need It

![Hero: Certificate document](unsplash: certificate official document)

A **MIAM certificate** is the official document proving you've attended a
Mediation Information Assessment Meeting. Without a valid MIAM certificate,
the court cannot process most family applications.

## What is a MIAM Certificate?

A **MIAM certificate** (formally called Form FM1) is issued by an accredited
mediator after you attend your MIAM...

[500 words]

## Why You Need a MIAM Certificate for Court

When submitting a C100 application, you must include either:
- A signed MIAM certificate, OR
- Evidence of exemption

[400 words, link to /forms/c100]

![Image: Court paperwork](unsplash: paperwork forms)

## How to Get a MIAM Certificate

1. Find an FMC-accredited mediator
2. Book your MIAM appointment
3. Attend the meeting
4. Receive your certificate

[500 words with HowTo schema]

## What Does a MIAM Certificate Look Like?

The FM1 form contains:
- Your details
- Mediator's details and accreditation
- Outcome of assessment
- Signature and date

[300 words]

## How Long is a MIAM Certificate Valid?

A MIAM certificate is valid for **4 months** from the date of issue...

[200 words]

## MIAM Exemption Certificate

If you qualify for exemption, you'll receive a different certificate...

[200 words, link to /miam/exemptions]

## FAQ: MIAM Certificate

<FAQSchema>
Q: What is a MIAM certificate?
Q: How do I get a MIAM certificate?
Q: How long is a MIAM certificate valid for?
Q: What if my MIAM certificate expires?
Q: Can I get a MIAM certificate online?
</FAQSchema>

---

**External Links:**
- [Gov.uk - Get a MIAM Certificate](https://www.gov.uk/looking-after-children-divorce/mediation)
- [Family Mediation Council](https://www.familymediationcouncil.org.uk/)
- [Form FM1 Information](https://www.gov.uk/government/publications/form-fm1-family-mediation-information-and-assessment-form)

**Internal Links:**
- /miam/what-is-a-miam
- /forms/c100
- /miam/exemptions
- /mediators/find
```

---

### PILLAR 4: `/forms/c100`

**Target Keywords:** c100 form (12,100), c100 form online, c100 form download
**Word Count:** 3,500+
**Difficulty:** 25 (Easy-Medium)

**NOTE:** This is a MAJOR traffic opportunity - 12,100 monthly searches

#### Content Outline

```markdown
# C100 Form: Complete Guide to Child Arrangements Applications (2025)

![Hero: Family legal forms](unsplash: legal forms family)

The **C100 form** is the application you submit to the family court when you
need a legal order about your children. This comprehensive guide covers
everything you need to know about completing and submitting your C100 form.

## What is a C100 Form?

The **C100 form**, officially titled "Application under the Children Act 1989
for a child arrangements, prohibited steps, or specific issue order"...

[600 words]

## When Do You Need a C100 Form?

You need a C100 form when you want the court to decide:
- Where your children live
- When they spend time with each parent
- Specific decisions about education, health, religion

[400 words]

![Image: Parent and child](unsplash: parent child family)

## MIAM Requirement Before Submitting C100

**Important:** Before submitting a C100 form, you must attend a MIAM...

[500 words, heavy linking to /miam/ section]

## How to Complete a C100 Form: Step-by-Step

### Section 1: Your Details
### Section 2: The Children
### Section 3: The Other Party
### Section 4: What You're Asking For
### Section 5: MIAM Information
...

[1000 words with detailed guidance]

## C100 Form Download and Online Submission

### Download C100 Form (PDF)
You can download the C100 form from [Gov.uk]...

### Complete C100 Online
The C100 can now be completed online through...

[400 words]

## C100 Court Fees and Fee Remission

The current C100 court fee is **£232**...

[300 words]

## What Happens After You Submit Your C100?

1. Court receives application
2. Safeguarding checks (Cafcass)
3. First hearing date set
4. Directions given
...

[500 words]

## C100 and MIAM Exemptions

On the C100 form, you must indicate:
- ✓ I have attended a MIAM
- ✓ I am exempt from MIAM (tick which exemption)

[300 words, link to /miam/exemptions]

## Common C100 Mistakes to Avoid

1. Forgetting MIAM certificate
2. Incomplete information
3. Wrong court selected
...

[300 words]

## FAQ: C100 Form

<FAQSchema>
Q: What is a C100 form?
Q: How do I fill in a C100 form?
Q: How much does a C100 cost?
Q: Do I need a MIAM before C100?
Q: How long does C100 take to process?
Q: Can I complete C100 online?
</FAQSchema>

---

**External Links:**
- [Gov.uk - C100 Form](https://www.gov.uk/government/publications/form-c100-application-under-the-children-act-1989-for-a-child-arrangements-prohibited-steps-specific-issue-section-8-order-or-to-vary-or-discharge)
- [HMCTS Online Services](https://www.gov.uk/apply-for-child-arrangement-order)
- [Cafcass](https://www.cafcass.gov.uk/)

**Internal Links:**
- /miam/what-is-a-miam
- /miam/certificate
- /miam/exemptions
- /mediation/family
- /prepare/checklist
```

---

### PILLAR 5: `/mediation/what-is-mediation`

**Target Keywords:** what is mediation (2,400), mediation meaning (6,600), mediation definition (1,000), define mediation (1,000)
**Word Count:** 4,000+
**Difficulty:** 42-45 (Medium)

**Combined Volume:** ~11,000 monthly searches

#### Content Outline

```markdown
# What is Mediation? Definition, Meaning, and Complete UK Guide

![Hero: Mediation meeting](unsplash: mediation meeting professional)

**Mediation** is a voluntary process where a neutral third party helps
people in dispute reach an agreement. This guide provides a complete
**mediation definition** and explains how mediation works in the UK.

## Mediation Definition: What Does Mediation Mean?

The **mediation meaning** in a legal context is: a structured negotiation
process facilitated by an impartial mediator who helps parties communicate
and explore solutions without imposing decisions.

To **define mediation** simply: it's assisted negotiation.

[600 words covering definition from multiple angles]

## How Does Mediation Work?

[800 words explaining the process with HowTo schema]

![Image: Discussion meeting](unsplash: discussion meeting office)

## Types of Mediation in the UK

### Family Mediation
[300 words, link to /mediation/family]

### Workplace Mediation
[300 words, link to /mediation/workplace]

### Civil and Commercial Mediation
[200 words]

### Community Mediation
[200 words]

## Mediation vs Arbitration vs Court

| Method | Who Decides? | Binding? | Cost |
|--------|--------------|----------|------|
| Mediation | You (jointly) | By choice | £ |
| Arbitration | Arbitrator | Yes | ££ |
| Court | Judge | Yes | £££ |

[500 words comparing options]

## Benefits of Mediation

1. Cost-effective
2. Faster than court
3. Confidential
4. You control the outcome
5. Preserves relationships
...

[400 words]

## When Mediation Isn't Appropriate

[300 words on limitations, domestic abuse, etc.]

## Is Mediation Legally Binding?

[300 words explaining when agreements become binding]

## The Role of a Mediator

[300 words]

## FAQ: Mediation Definition and Meaning

<FAQSchema>
Q: What is mediation?
Q: What does mediation mean in law?
Q: What is the definition of mediation?
Q: Is mediation the same as arbitration?
Q: Do I need a lawyer for mediation?
Q: Is mediation legally binding?
</FAQSchema>

---

**External Links:**
- [Civil Mediation Council](https://civilmediation.org/)
- [Family Mediation Council](https://www.familymediationcouncil.org.uk/)
- [ACAS Mediation](https://www.acas.org.uk/mediation)

**Internal Links:**
- /mediation/family
- /mediation/workplace
- /mediation/cost
- /miam/what-is-a-miam
- /prepare/tips
```

---

### PILLAR 6: `/mediation/workplace`

**Target Keywords:** workplace mediation (880)
**Word Count:** 2,500+
**Difficulty:** 8 (VERY Easy)

**Note:** This is a quick win - low difficulty, decent volume

#### Content Outline

```markdown
# Workplace Mediation: Complete Guide to Resolving Conflicts at Work

![Hero: Office meeting](unsplash: office meeting professional)

**Workplace mediation** is a confidential process that helps employees and
employers resolve conflicts without formal grievance procedures. This guide
explains how workplace mediation works and when to use it.

## What is Workplace Mediation?

**Workplace mediation** involves a trained mediator helping colleagues or
employee-employer disputes reach a resolution...

[500 words]

## When is Workplace Mediation Used?

Common workplace mediation scenarios:
- Colleague relationship breakdown
- Bullying allegations
- Management style concerns
- Team conflicts
- Return to work after absence

[400 words]

![Image: Workplace discussion](unsplash: workplace discussion team)

## ACAS Mediation Services

[500 words on ACAS, external link to ACAS]

## How Workplace Mediation Works

1. Initial contact
2. Individual meetings
3. Joint session
4. Agreement

[500 words with HowTo schema]

## Preparing for Workplace Mediation

[400 words, link to /mediation/workplace/prepare]

## Benefits of Workplace Mediation

[300 words]

## Workplace Mediation vs Grievance Procedure

[300 words comparison table]

## FAQ: Workplace Mediation

<FAQSchema>
Q: What is workplace mediation?
Q: How does workplace mediation work?
Q: Is workplace mediation confidential?
Q: Can I refuse workplace mediation?
Q: How much does workplace mediation cost?
</FAQSchema>

---

**External Links:**
- [ACAS Mediation](https://www.acas.org.uk/mediation)
- [CIPD - Workplace Mediation](https://www.cipd.co.uk/knowledge/fundamentals/relations/disputes/mediation-factsheet)
- [Civil Mediation Council](https://civilmediation.org/)

**Internal Links:**
- /mediation/what-is-mediation
- /mediation/workplace/prepare
- /mediation/cost
```

---

### PILLAR 7: `/mediation/cost`

**Target Keywords:** mediation costs uk (390), who pays for mediation
**Word Count:** 2,500+
**Difficulty:** 2 (VERY Easy - quick win!)

#### Content Outline

```markdown
# Mediation Costs UK: How Much Does Mediation Cost in 2025?

![Hero: Calculator and money](unsplash: calculator money planning)

Understanding **mediation costs UK** helps you plan your budget. This guide
breaks down how much different types of mediation cost and who typically
pays for mediation.

## How Much Does Mediation Cost in the UK?

**Mediation costs** in the UK vary depending on the type:

| Type | Typical Cost |
|------|--------------|
| MIAM | £90-£150 |
| Family mediation (per session) | £100-£200 per person |
| Full divorce mediation | £500-£2,000 total |
| Workplace mediation | £1,000-£3,000 per day |

[600 words breaking down costs]

## MIAM Costs

[400 words, link to /miam/cost]

## Family Mediation Costs

[400 words, link to /mediation/family/cost]

![Image: Financial planning](unsplash: financial planning budget)

## Who Pays for Mediation?

Usually each party pays their own costs, but...

[400 words]

## Free Mediation Options

### Legal Aid for Mediation
[300 words, link to /mediation/legal-aid]

### Family Mediation Voucher Scheme
[300 words, link to /resources/voucher-scheme]

## Mediation vs Court Costs: Comparison

| | Mediation | Court |
|---|-----------|-------|
| Average total cost | £1,000 | £5,000+ |
| Time | 6-8 weeks | 6-12 months |
| Stress | Lower | Higher |

[300 words]

## FAQ: Mediation Costs UK

<FAQSchema>
Q: How much does mediation cost in the UK?
Q: Who pays for mediation?
Q: Can I get free mediation?
Q: Is mediation cheaper than court?
Q: How much does a MIAM cost?
</FAQSchema>

---

**External Links:**
- [Gov.uk - Help with Mediation Costs](https://www.gov.uk/check-legal-aid)
- [Family Mediation Council - Costs](https://www.familymediationcouncil.org.uk/)
- [Legal Aid Agency](https://www.gov.uk/government/organisations/legal-aid-agency)

**Internal Links:**
- /mediation/free
- /mediation/legal-aid
- /resources/voucher-scheme
- /miam/cost
- /mediation/family/cost
```

---

## Content Calendar

### Month 1: Foundation (Weeks 1-4)

| Week | Page | Keywords | Words | Priority |
|------|------|----------|-------|----------|
| 1 | Homepage `/` | mediation, miam | 3,000 | P0 |
| 1 | `/miam/what-is-a-miam` | what is a miam | 2,500 | P0 |
| 2 | `/miam/certificate` | miam certificate | 2,000 | P0 |
| 2 | `/miam/exemptions` | miam exemptions | 2,500 | P0 |
| 3 | `/forms/c100` | c100 form | 3,500 | P0 |
| 3 | `/mediation/what-is-mediation` | what is mediation | 4,000 | P0 |
| 4 | `/mediation/cost` | mediation costs uk | 2,500 | P1 |
| 4 | `/mediation/workplace` | workplace mediation | 2,500 | P1 |

**Month 1 Total:** 8 pages, ~22,500 words

### Month 2: Expansion (Weeks 5-8)

| Week | Page | Keywords | Words | Priority |
|------|------|----------|-------|----------|
| 5 | `/mediation/family` | family mediation | 3,000 | P1 |
| 5 | `/mediation/divorce` | divorce mediation | 2,500 | P1 |
| 6 | `/miam/form` | miam form | 1,500 | P2 |
| 6 | `/miam/cost` | miam cost | 1,500 | P2 |
| 7 | `/mediation/family/near-me` | family mediation near me | 2,000 | P2 |
| 7 | `/mediation/free` | free mediation | 2,000 | P2 |
| 8 | `/resources/voucher-scheme` | family mediation voucher scheme | 2,000 | P2 |
| 8 | `/mediation/legal-aid` | legal aid mediation | 2,000 | P2 |

**Month 2 Total:** 8 pages, ~16,500 words

### Month 3: Depth (Weeks 9-12)

| Week | Page | Keywords | Words | Priority |
|------|------|----------|-------|----------|
| 9 | `/mediation/child-arrangements` | child custody mediation | 2,500 | P2 |
| 9 | `/prepare/checklist` | mediation preparation | 2,000 | P2 |
| 10 | `/mediators/find` | find a mediator | 1,500 | P2 |
| 10 | `/mediators/fmc` | family mediation council | 1,500 | P2 |
| 11 | `/miam/near-me` | miam near me | 1,500 | P3 |
| 11 | `/mediators/london` | mediation london | 1,500 | P3 |
| 12 | `/forms/c100/after` | what happens after c100 | 2,000 | P3 |
| 12 | `/miam/compulsory` | is miam compulsory | 1,500 | P3 |

**Month 3 Total:** 8 pages, ~14,000 words

---

## Success Metrics

### Traffic Targets

| Metric | Month 1 | Month 3 | Month 6 |
|--------|---------|---------|---------|
| Pages Published | 8 | 24 | 40 |
| Organic Sessions | 500 | 3,000 | 10,000 |
| Keywords Top 10 | 5 | 25 | 75 |
| Keywords Top 3 | 2 | 10 | 30 |
| Backlinks | 10 | 50 | 150 |

### Conversion Targets

| Metric | Month 1 | Month 3 | Month 6 |
|--------|---------|---------|---------|
| Voice Sessions Started | 50 | 300 | 1,000 |
| Chat Sessions | 100 | 500 | 2,000 |
| Accounts Created | 30 | 200 | 800 |
| Mediator Clicks | 10 | 100 | 500 |

---

## Technical SEO Checklist

### Per Page

- [ ] Unique title tag (50-60 chars) with primary keyword
- [ ] Meta description (150-160 chars) with keyword and CTA
- [ ] H1 with primary keyword
- [ ] H2s with secondary keywords
- [ ] Keyword bolded once in first 100 words
- [ ] Keyword appears 5+ times naturally
- [ ] 3+ external links to authoritative sources
- [ ] 5+ internal links to related pages
- [ ] Hero image from Unsplash with alt text containing keyword
- [ ] 2-3 body images with descriptive alt text
- [ ] Schema markup (FAQPage, HowTo, or Article)
- [ ] Canonical tag
- [ ] Open Graph tags for social sharing

### Site-Wide

- [ ] XML sitemap updated with all new pages
- [ ] Internal linking structure reviewed monthly
- [ ] Core Web Vitals monitored
- [ ] Mobile responsiveness verified
- [ ] Page speed under 3 seconds
- [ ] SSL certificate active
- [ ] Robots.txt allowing all content pages
