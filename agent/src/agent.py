"""
MIAM.quest Agent
Pydantic AI agent with AG-UI and CLM endpoints for CopilotKit and Hume Voice.
Helps users prepare for MIAM (Mediation Information Assessment Meeting).
Integrates with Zep for user memory and Neon PostgreSQL for data.
"""

import os
import sys
import json
import uuid
from typing import Optional, List
from dataclasses import dataclass
from datetime import datetime

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import StreamingResponse
from pydantic import BaseModel
from pydantic_ai import Agent
from pydantic_ai.models.google import GoogleModel
from pydantic_ai.result import RunContext
from pydantic_ai.ag_ui import StateDeps

# Zep for user memory
from zep_cloud.client import Zep
from zep_cloud import NotFoundError

# Neon PostgreSQL
import psycopg2

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Initialize Zep client
ZEP_API_KEY = os.environ.get("ZEP_API_KEY")
ZEP_GRAPH_ID = "miam_quest"
zep_client = Zep(api_key=ZEP_API_KEY) if ZEP_API_KEY else None

# Initialize Neon database
DATABASE_URL = os.environ.get("DATABASE_URL")
print(f"[INIT] Database URL configured: {bool(DATABASE_URL)}", file=sys.stderr)
print(f"[INIT] Zep configured: {bool(zep_client)}", file=sys.stderr)

# ============================================================================
# ZEP USER MEMORY HELPERS
# ============================================================================

async def get_or_create_zep_user(user_id: str, email: str = None, name: str = None):
    """Get or create a Zep user for memory tracking."""
    if not zep_client:
        return None

    try:
        user = zep_client.user.get(user_id)
        return user
    except NotFoundError:
        first_name = name.split()[0] if name else None
        last_name = " ".join(name.split()[1:]) if name and len(name.split()) > 1 else None
        zep_client.user.add(
            user_id=user_id,
            email=email,
            first_name=first_name,
            last_name=last_name
        )
        return zep_client.user.get(user_id)
    except Exception as e:
        print(f"Zep user error: {e}")
        return None


async def get_user_context(user_id: str) -> str:
    """Get relevant context about a user from Zep knowledge graph."""
    if not zep_client:
        return ""

    try:
        context = zep_client.user.get_context(user_id, min_score=0.5)
        if context and context.facts:
            facts = [f.fact for f in context.facts[:5]]
            return "Known about this user: " + "; ".join(facts)
        return ""
    except Exception as e:
        print(f"Zep context error: {e}")
        return ""


async def add_conversation_to_zep(user_id: str, user_msg: str, assistant_msg: str):
    """Store conversation in Zep for memory."""
    if not zep_client:
        return

    try:
        zep_client.graph.add(
            user_id=user_id,
            type="message",
            data=f"User shared: {user_msg}\nMiam responded: {assistant_msg}"
        )
        print(f"Zep: Stored conversation for user {user_id[:8]}...")
    except Exception as e:
        print(f"Zep add error: {e}")


# ============================================================================
# MIAM KNOWLEDGE & CONSTANTS
# ============================================================================

POSITION_CATEGORIES = ["must_have", "priority", "nice_to_have", "red_line"]

POSITION_TOPICS = [
    "living_arrangements", "school_education", "holidays_occasions",
    "communication", "decision_making", "financial_support",
    "handover_logistics", "extended_family", "health_medical",
    "activities_hobbies", "religious_cultural", "travel_relocation", "other"
]

MIAM_EXEMPTIONS = {
    "domestic_abuse": {
        "label": "Domestic Abuse",
        "description": "Evidence that you or the child are at risk of domestic abuse",
        "evidence_required": [
            "Police investigation, conviction, or caution",
            "Protective injunction (non-molestation/occupation order)",
            "Finding of fact in court proceedings",
            "Letter from GP, health visitor, or specialist service",
            "MARAC referral", "Refuge accommodation"
        ]
    },
    "child_protection": {
        "label": "Child Protection",
        "description": "Child protection concerns involving local authority or police"
    },
    "urgency": {
        "label": "Urgency",
        "description": "Risk of harm to child or applicant, risk of child abduction"
    },
    "previous_miam": {
        "label": "Previous MIAM",
        "description": "MIAM attended in the last 4 months for same or similar dispute"
    },
    "other_party_overseas": {
        "label": "Other Party Overseas",
        "description": "The other party lives outside England & Wales"
    },
    "other_party_prison": {
        "label": "Other Party in Prison",
        "description": "The other party is in prison or a secure hospital"
    },
    "disability": {
        "label": "Disability",
        "description": "You cannot attend due to disability and no reasonable adjustments can be made"
    },
    "no_mediator_available": {
        "label": "No Mediator Available",
        "description": "No authorised family mediator within 15 miles"
    }
}


# ============================================================================
# PYDANTIC AI AGENT - STATE & MODELS
# ============================================================================

class UserProfile(BaseModel):
    """User profile for personalization."""
    id: Optional[str] = None
    name: Optional[str] = None
    email: Optional[str] = None


class PositionItem(BaseModel):
    """Single position item captured from user."""
    id: str
    category: str  # must_have, priority, nice_to_have, red_line
    topic: str
    item: str
    context: Optional[str] = None


class AppState(BaseModel):
    """Shared state between frontend and agent."""
    case_id: Optional[str] = None
    case_type: str = "child_arrangements"  # child_arrangements, financial, both
    children_count: int = 0
    children_ages: List[int] = []
    current_arrangement: Optional[str] = None
    position_items: List[PositionItem] = []
    topics_discussed: List[str] = []
    user: Optional[UserProfile] = None
    zep_context: str = ""


# Create the agent
agent = Agent(
    model=GoogleModel('gemini-2.0-flash'),
    deps_type=StateDeps[AppState],
    name="miam_agent"
)


@agent.system_prompt
async def dynamic_system_prompt(ctx: RunContext[StateDeps[AppState]]) -> str:
    """Build system prompt with user context."""
    state = ctx.deps.state

    # Debug: Log what state we have
    print(f"[AGENT] System prompt building with state:", file=sys.stderr)
    print(f"[AGENT]   user: {state.user}", file=sys.stderr)
    print(f"[AGENT]   zep_context: {state.zep_context[:50] if state.zep_context else 'empty'}", file=sys.stderr)

    user_section = ""
    if state.user and state.user.name:
        user_section = f"""
## USER CONTEXT
- **Name**: {state.user.name}
- **User ID**: {state.user.id or 'Unknown'}
"""

    memory_section = ""
    if state.zep_context:
        memory_section = f"""
## MEMORY (What I know about this user)
{state.zep_context}
"""

    position_section = ""
    if state.position_items:
        by_category = {}
        for item in state.position_items:
            if item.category not in by_category:
                by_category[item.category] = []
            by_category[item.category].append(f"- {item.item} ({item.topic})")

        position_section = """
## CAPTURED POSITION
"""
        for cat, items in by_category.items():
            position_section += f"\n**{cat.replace('_', ' ').title()}:**\n"
            position_section += "\n".join(items) + "\n"

    greeting = ""
    if state.user and state.user.name:
        greeting = f"Address the user by name: {state.user.name}"
    else:
        greeting = "Greet the user warmly and invite them to share their situation."

    return f"""You are Miam (pronounced "mee-am"), a warm and compassionate AI mediation preparation assistant for MIAM.quest.

## YOUR IDENTITY
PERSONA:
- Female AI assistant, warm and empathetic
- Professional but accessible
- Child-focused and solution-oriented
- Emotionally intelligent and patient

## CRITICAL LIMITATIONS
- You CANNOT provide legal advice
- You CANNOT issue MIAM certificates (only FMC-accredited human mediators can)
- You CANNOT replace professional mediation
- You CAN help users prepare, organize thoughts, and understand the process

## CORE BEHAVIORS
1. ALWAYS CHILD-FOCUSED: Frame everything around children's wellbeing
2. NEVER TAKE SIDES: Remain strictly neutral, never criticize the other parent
3. VALIDATE EMOTIONS FIRST: Acknowledge feelings before moving to practicalities
4. CLARIFY, DON'T ADVISE: Help users understand options, don't tell them what to decide

## SENSITIVE TOPICS
If domestic abuse or child safety is mentioned:
- Be supportive, not probing
- Mention that MIAM exemptions may apply
- Suggest professional support resources
- Never pressure to continue if uncomfortable

{greeting}
{user_section}
{memory_section}
{position_section}

## CORE FACTS (Verified, Authoritative)

### MIAM Basics
- MIAM = Mediation Information Assessment Meeting
- Required before C100 family court applications in England & Wales
- Duration: 45-60 minutes
- Cost: £90-150 per person (free with legal aid)
- **Certificate validity: 4 months from issue date**
- Only FMC-accredited mediators can issue valid certificates (Form FM1)
- Both parties do NOT need to attend together - individual assessments

### MIAM Exemptions (Must have evidence)
- Domestic abuse (police report, court order, GP letter, MARAC referral)
- Child protection (local authority involvement)
- Urgency (risk of harm, child abduction risk)
- Previous MIAM in last 4 months for same dispute
- Other party overseas (outside England & Wales)
- Other party in prison or secure hospital
- Disability preventing attendance
- Cannot locate other party

### Court Forms
- **C100**: Application for child arrangements order
- **FM1**: MIAM certificate form (signed by mediator)
- Court fee: £232 (may be waived with legal aid)

### Legal Aid
- Available if on benefits, low income, or experiencing domestic abuse
- Covers MIAM cost and full mediation
- Check eligibility: gov.uk/check-legal-aid

### Family Mediation Voucher Scheme
- £500 government contribution toward mediation costs
- Available for child arrangement disputes
- Applied for by the mediator

### Position Categories (For Preparation)
Help users identify:
- **Must-Haves**: Non-negotiable items
- **Priorities**: Important but flexible
- **Nice-to-Haves**: Would be good but optional
- **Red Lines**: Absolute deal-breakers

### Key Topics to Cover
- Living arrangements
- School and education
- Holidays and special occasions
- Communication between households
- Decision-making responsibilities
- Financial support

## TOOLS AVAILABLE
- `load_user_memory`: **Call this FIRST** to load user context from memory
- `capture_position`: Record a position item from the user
- `get_position_summary`: Show current captured position
- `get_miam_info`: Get information about MIAM process
- `check_exemption_eligibility`: Check for potential MIAM exemptions
- `search_mediators`: Find FMC-accredited mediators
- `generate_preparation_summary`: Create a preparation document

## IMPORTANT - FIRST MESSAGE
When starting a new conversation, ALWAYS call `load_user_memory` first to check for previous context about this user.

## CONVERSATION STYLE
- Be concise but warm
- Ask one question at a time
- Validate feelings before moving on
- Confirm understanding before capturing positions
- Offer to generate a summary when appropriate

## SAMPLE RESPONSES
"I hear that this is really difficult for you. Let's take this one step at a time."
"What matters most here is what works best for your children."
"Would you say that's a must-have for you, or something you'd be flexible on?"
"I can help you prepare, but for a legally valid certificate you'll need an accredited mediator."
"""


# ============================================================================
# AGENT TOOLS - POSITION CAPTURE
# ============================================================================

@agent.tool
async def capture_position(
    ctx: RunContext[StateDeps[AppState]],
    category: str,
    topic: str,
    item: str,
    context: str = None
) -> dict:
    """
    Capture a position item from the user's conversation.

    Args:
        category: 'must_have', 'priority', 'nice_to_have', or 'red_line'
        topic: Topic area (e.g., 'living_arrangements', 'school_education')
        item: The actual position statement
        context: Optional additional context

    Returns:
        Confirmation of captured position
    """
    if category not in POSITION_CATEGORIES:
        return {"success": False, "error": f"Invalid category. Use: {POSITION_CATEGORIES}"}

    if topic not in POSITION_TOPICS:
        topic = "other"

    position = PositionItem(
        id=str(uuid.uuid4())[:8],
        category=category,
        topic=topic,
        item=item,
        context=context
    )

    ctx.deps.state.position_items.append(position)
    if topic not in ctx.deps.state.topics_discussed:
        ctx.deps.state.topics_discussed.append(topic)

    # Count by category
    counts = {}
    for cat in POSITION_CATEGORIES:
        counts[cat] = len([p for p in ctx.deps.state.position_items if p.category == cat])

    return {
        "success": True,
        "captured": {
            "id": position.id,
            "category": category,
            "topic": topic,
            "item": item
        },
        "total_items": len(ctx.deps.state.position_items),
        "counts": counts
    }


@agent.tool
async def get_position_summary(ctx: RunContext[StateDeps[AppState]]) -> dict:
    """
    Get a summary of the user's captured position.
    Call this to show users what's been captured so far.

    Returns:
        Summary of positions by category and topic
    """
    state = ctx.deps.state

    if not state.position_items:
        return {
            "has_positions": False,
            "message": "No positions captured yet. Let's start by discussing what matters most to you."
        }

    # Group by category
    by_category = {}
    for cat in POSITION_CATEGORIES:
        items = [p for p in state.position_items if p.category == cat]
        if items:
            by_category[cat] = [{"item": p.item, "topic": p.topic} for p in items]

    # Topics covered
    topics_covered = list(set([p.topic for p in state.position_items]))
    topics_remaining = [t for t in POSITION_TOPICS if t not in topics_covered and t != "other"]

    return {
        "has_positions": True,
        "total_items": len(state.position_items),
        "by_category": by_category,
        "topics_covered": topics_covered,
        "topics_remaining": topics_remaining[:5],  # Suggest next 5 topics
        "completeness_percent": min(100, int((len(topics_covered) / len(POSITION_TOPICS)) * 100))
    }


# ============================================================================
# AGENT TOOLS - MIAM INFORMATION
# ============================================================================

@agent.tool
async def get_miam_info(ctx: RunContext[StateDeps[AppState]], topic: str = "overview") -> dict:
    """
    Get information about the MIAM process.

    Args:
        topic: 'overview', 'cost', 'process', 'certificate', 'what_to_expect'

    Returns:
        Information about the requested topic
    """
    info = {
        "overview": {
            "title": "What is a MIAM?",
            "content": """A MIAM (Mediation Information Assessment Meeting) is a mandatory meeting you must attend before applying to family court in England and Wales.

Key points:
- Duration: Typically 45-60 minutes
- Cost: £90-150 per person (free with legal aid)
- Purpose: A mediator explains mediation and assesses suitability
- Outcome: You receive a certificate confirming attendance
- Requirement: Needed before submitting C100 form to court"""
        },
        "cost": {
            "title": "MIAM & Mediation Costs",
            "content": """MIAM Costs:
- Typical cost: £90-150 per person
- Free with legal aid if you qualify

Full Mediation Costs:
- Usually £100-200 per person per hour
- Average 3-5 sessions for child arrangements
- Total: typically £500-2,000 per person

Free/Reduced Options:
- Legal aid (income-based eligibility)
- Family Mediation Voucher Scheme (£500 government contribution)

Compared to Court:
- Court application fee: £232
- Full court process can cost £5,000-50,000+ with solicitors
- Mediation is typically 5-10x cheaper"""
        },
        "process": {
            "title": "The MIAM Process",
            "content": """What happens at a MIAM:

1. Initial Contact
   - You contact an FMC-accredited mediator
   - They may ask basic questions about your situation

2. The Meeting
   - Individual meeting (not with your ex initially)
   - Mediator explains how mediation works
   - Assesses whether mediation is suitable
   - Discusses any safety concerns

3. After the Meeting
   - You receive a certificate (Form FM1)
   - Certificate shows: proceed to mediation, mediation not suitable, or exemption

4. Next Steps
   - If suitable: book full mediation sessions
   - If not suitable: can proceed to court with certificate
   - Certificate valid for 4 months"""
        },
        "certificate": {
            "title": "MIAM Certificate",
            "content": """About the MIAM Certificate:

- Official document proving MIAM attendance (Form FM1)
- Required when submitting a C100 court application
- Valid for 4 months from issue date

Who can issue it:
- Only FMC (Family Mediation Council) accredited mediators
- AI assistants like me CANNOT issue certificates

What if other parent won't attend:
- You can still get a certificate
- It will note the other party didn't attend/respond
- This satisfies the court requirement"""
        },
        "what_to_expect": {
            "title": "What to Expect at Your MIAM",
            "content": """Preparing for Your MIAM:

Before:
- Think about what outcomes you want
- Consider your priorities and red lines
- Prepare questions you want to ask

During:
- Mediator will be neutral and non-judgmental
- You can speak freely about your concerns
- No decisions need to be made on the spot

After:
- You'll receive your certificate
- You can decide whether to proceed with mediation
- No obligation to continue if you don't want to

Tips:
- Being prepared (like working with me) helps
- The mediator wants to help, not judge
- It's okay to be emotional"""
        }
    }

    return info.get(topic, info["overview"])


@agent.tool
async def check_exemption_eligibility(
    ctx: RunContext[StateDeps[AppState]],
    circumstances: List[str]
) -> dict:
    """
    Check if user may qualify for MIAM exemption.
    Call this when user mentions circumstances that might exempt them.

    Args:
        circumstances: List of circumstances mentioned (e.g., ['domestic_abuse', 'urgency'])

    Returns:
        Information about potential exemptions
    """
    potential_exemptions = []

    for circ in circumstances:
        circ_lower = circ.lower().replace(" ", "_")
        if circ_lower in MIAM_EXEMPTIONS:
            exemption = MIAM_EXEMPTIONS[circ_lower]
            potential_exemptions.append({
                "exemption": circ_lower,
                "label": exemption["label"],
                "description": exemption["description"],
                "evidence_required": exemption.get("evidence_required", [])
            })

    return {
        "has_potential_exemption": len(potential_exemptions) > 0,
        "potential_exemptions": potential_exemptions,
        "important_note": "Exemptions must be declared on the C100 form. Some require evidence. If you're unsure, discuss with a solicitor or the mediator.",
        "disclaimer": "I can provide information about exemptions, but cannot determine eligibility. This is not legal advice."
    }


# ============================================================================
# AGENT TOOLS - MEDIATOR SEARCH
# ============================================================================

@agent.tool
async def search_mediators(
    ctx: RunContext[StateDeps[AppState]],
    location: str = None,
    remote_only: bool = False,
    legal_aid_only: bool = False
) -> dict:
    """
    Search for FMC-accredited mediators.

    Args:
        location: Location to search (postcode or city)
        remote_only: Only show mediators offering remote sessions
        legal_aid_only: Only show mediators offering legal aid

    Returns:
        List of matching mediators
    """
    if not DATABASE_URL:
        return {
            "success": False,
            "message": "Mediator directory not available. Visit familymediationcouncil.org.uk to find accredited mediators."
        }

    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()

        query = """
            SELECT id, name, fmc_number, specializations, location, postcode,
                   remote_available, in_person_available, miam_cost, legal_aid_available
            FROM mediators
            WHERE is_active = true AND fmc_accredited = true
        """
        params = []

        if remote_only:
            query += " AND remote_available = true"
        if legal_aid_only:
            query += " AND legal_aid_available = true"
        if location:
            query += " AND (location ILIKE %s OR postcode ILIKE %s)"
            params.extend([f"%{location}%", f"{location}%"])

        query += " ORDER BY name LIMIT 10"

        cur.execute(query, params)
        rows = cur.fetchall()
        cur.close()
        conn.close()

        mediators = []
        for row in rows:
            mediators.append({
                "id": str(row[0]),
                "name": row[1],
                "fmc_number": row[2],
                "specializations": row[3] or [],
                "location": row[4],
                "postcode": row[5],
                "remote_available": row[6],
                "in_person_available": row[7],
                "miam_cost_pence": row[8],
                "legal_aid_available": row[9]
            })

        return {
            "success": True,
            "mediators": mediators,
            "count": len(mediators),
            "search_criteria": {
                "location": location,
                "remote_only": remote_only,
                "legal_aid_only": legal_aid_only
            }
        }

    except Exception as e:
        print(f"[TOOL] search_mediators error: {e}", file=sys.stderr)
        return {
            "success": False,
            "error": str(e),
            "fallback": "Visit familymediationcouncil.org.uk to find accredited mediators."
        }


@agent.tool
async def generate_preparation_summary(ctx: RunContext[StateDeps[AppState]]) -> dict:
    """
    Generate a preparation summary document from captured positions.
    Call this when user is ready to summarize their preparation.

    Returns:
        Formatted preparation summary
    """
    state = ctx.deps.state

    if not state.position_items:
        return {
            "success": False,
            "message": "No positions captured yet. Let's discuss your situation first."
        }

    # Build summary
    summary = {
        "generated_at": datetime.now().isoformat(),
        "case_overview": {
            "case_type": state.case_type,
            "children_count": state.children_count,
            "children_ages": state.children_ages,
            "current_arrangement": state.current_arrangement
        },
        "positions": {},
        "topics_covered": state.topics_discussed,
        "suggested_discussion_points": []
    }

    # Group positions by category
    for cat in POSITION_CATEGORIES:
        items = [p for p in state.position_items if p.category == cat]
        if items:
            summary["positions"][cat.replace("_", " ").title()] = [
                {"item": p.item, "topic": p.topic.replace("_", " ").title(), "context": p.context}
                for p in items
            ]

    # Suggest discussion points
    topics_remaining = [t for t in POSITION_TOPICS if t not in state.topics_discussed and t != "other"]
    if topics_remaining:
        summary["suggested_discussion_points"] = [
            f"Consider discussing: {t.replace('_', ' ').title()}"
            for t in topics_remaining[:3]
        ]

    return {
        "success": True,
        "summary": summary,
        "disclaimer": "This summary is for preparation purposes only. It is not legal advice and cannot replace professional mediation."
    }


# ============================================================================
# AGENT TOOLS - USER MEMORY
# ============================================================================

@agent.tool
async def load_user_memory(ctx: RunContext[StateDeps[AppState]]) -> dict:
    """
    Load user memory and context from Zep.
    Call this at the start of a conversation to personalize responses.

    Returns:
        User context and known facts from previous conversations
    """
    state = ctx.deps.state

    if not state.user or not state.user.id:
        return {
            "success": False,
            "message": "No user identified. Cannot load memory."
        }

    if not zep_client:
        return {
            "success": False,
            "message": "Memory service not configured."
        }

    user_id = state.user.id

    try:
        # Ensure user exists in Zep
        await get_or_create_zep_user(
            user_id,
            state.user.email if state.user else None,
            state.user.name if state.user else None
        )

        # Get user context
        zep_context = await get_user_context(user_id)

        # Update state with context
        ctx.deps.state.zep_context = zep_context

        return {
            "success": True,
            "user_id": user_id[:8] + "...",
            "context_loaded": bool(zep_context),
            "context": zep_context if zep_context else "No previous context found for this user."
        }
    except Exception as e:
        print(f"[TOOL] load_user_memory error: {e}", file=sys.stderr)
        return {
            "success": False,
            "error": str(e)
        }


# ============================================================================
# FASTAPI APP WITH AG-UI AND CLM ENDPOINTS
# ============================================================================

main_app = FastAPI(title="MIAM.quest Agent")

main_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ag_ui_app = agent.to_ag_ui(deps=StateDeps(AppState()))

_last_clm_request = {}


@main_app.get("/")
async def health():
    return {
        "status": "ok",
        "service": "miam-quest-agent",
        "endpoints": ["/agui/", "/chat/completions", "/user", "/debug"],
        "zep_enabled": zep_client is not None,
        "database_enabled": DATABASE_URL is not None
    }


@main_app.get("/debug")
async def debug_endpoint():
    return _last_clm_request


@main_app.post("/user")
async def register_user(request: Request):
    """Register or update a user in Zep."""
    if not zep_client:
        return {"status": "zep_not_configured"}

    try:
        body = await request.json()
        user_id = body.get("user_id")
        email = body.get("email")
        name = body.get("name")

        if not user_id:
            return {"error": "user_id required"}, 400

        user = await get_or_create_zep_user(user_id, email, name)
        return {"status": "ok", "user_id": user_id, "zep_user": user is not None}
    except Exception as e:
        return {"error": str(e)}


# ============================================================================
# CLM ENDPOINT FOR HUME VOICE
# ============================================================================

def extract_session_id(request: Request, body: dict) -> Optional[str]:
    session_id = request.query_params.get("custom_session_id")
    if session_id:
        return session_id

    session_id = body.get("custom_session_id") or body.get("customSessionId") or body.get("session_id")
    if session_id:
        return session_id

    metadata = body.get("metadata", {})
    session_id = metadata.get("custom_session_id") or metadata.get("session_id")
    if session_id:
        return session_id

    for header in ["x-hume-session-id", "x-custom-session-id", "x-session-id"]:
        session_id = request.headers.get(header)
        if session_id:
            return session_id

    return None


def parse_session_id(session_id: Optional[str]) -> dict:
    if not session_id:
        return {"user_name": "", "user_id": ""}

    if session_id.startswith("miam_anon_"):
        return {"user_name": "", "user_id": ""}

    # Format: miam_username|user_id
    if session_id.startswith("miam_"):
        session_id = session_id[5:]  # Remove "miam_" prefix

    parts = session_id.split("|")
    user_name = parts[0] if len(parts) > 0 else ""
    user_id = parts[1] if len(parts) > 1 else ""

    return {"user_name": user_name, "user_id": user_id}


async def stream_sse_response(content: str, msg_id: str):
    import asyncio
    words = content.split(' ')
    for i, word in enumerate(words):
        chunk = {
            "id": msg_id,
            "object": "chat.completion.chunk",
            "choices": [{
                "index": 0,
                "delta": {"content": word + (' ' if i < len(words) - 1 else '')},
                "finish_reason": None
            }]
        }
        yield f"data: {json.dumps(chunk)}\n\n"
        await asyncio.sleep(0.01)

    yield f"data: {json.dumps({'id': msg_id, 'choices': [{'delta': {}, 'finish_reason': 'stop'}]})}\n\n"
    yield "data: [DONE]\n\n"


async def run_agent_for_clm(user_message: str, state: AppState, conversation_history: list = None) -> str:
    try:
        from pydantic_ai.messages import ModelRequest, UserPromptPart, ModelResponse, TextPart

        deps = StateDeps(state)
        message_history = []

        if conversation_history:
            for msg in conversation_history[:-1]:
                role = msg.get("role", "user")
                content = msg.get("content", "")
                if isinstance(content, str) and content.strip():
                    if role == "user":
                        message_history.append(ModelRequest(parts=[UserPromptPart(content=content)]))
                    elif role == "assistant":
                        message_history.append(ModelResponse(parts=[TextPart(content=content)]))

        result = await agent.run(
            user_message,
            deps=deps,
            message_history=message_history if message_history else None
        )

        if hasattr(result, 'data') and result.data:
            return str(result.data)
        elif hasattr(result, 'output'):
            return str(result.output)
        else:
            return str(result)

    except Exception as e:
        print(f"[CLM] Agent error: {e}", file=sys.stderr)
        return ""


@main_app.post("/chat/completions")
async def clm_endpoint(request: Request):
    """OpenAI-compatible CLM endpoint for Hume EVI voice."""
    import asyncio
    import time

    global _last_clm_request

    try:
        body = await request.json()
        messages = body.get("messages", [])

        _last_clm_request = {
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "body_keys": list(body.keys()),
            "messages": [{"role": m.get("role"), "content_preview": str(m.get("content", ""))[:200]} for m in messages]
        }

        session_id = extract_session_id(request, body)
        parsed = parse_session_id(session_id)
        user_name = parsed["user_name"]
        user_id = parsed["user_id"]

        print(f"[CLM] Session: name={user_name}, id={user_id[:8] if user_id else 'anon'}", file=sys.stderr)

        user_msg = ""
        for msg in reversed(messages):
            if msg.get("role") == "user":
                user_msg = msg.get("content", "")
                break

        if not user_msg:
            user_msg = "Hello"

        print(f"[CLM] User message: {user_msg[:80]}", file=sys.stderr)

        zep_context = ""
        if user_id and zep_client:
            try:
                await get_or_create_zep_user(user_id, None, user_name)
                zep_context = await get_user_context(user_id)
            except Exception as e:
                print(f"[CLM] Zep error: {e}", file=sys.stderr)

        user_profile = UserProfile(
            id=user_id if user_id else None,
            name=user_name if user_name else None,
        ) if user_id or user_name else None

        state = AppState(
            user=user_profile,
            zep_context=zep_context
        )

        response_text = await run_agent_for_clm(user_msg, state, conversation_history=messages)

        if not response_text:
            if user_name:
                response_text = f"Hello {user_name}. I'm Miam, your mediation preparation assistant. I'm here to help you prepare for your MIAM meeting. How are you feeling today?"
            else:
                response_text = "Hello. I'm Miam, your mediation preparation assistant. I'm here to help you understand the mediation process and prepare for your MIAM meeting. How can I help you today?"

        print(f"[CLM] Response: {response_text[:80]}", file=sys.stderr)

        if user_id and zep_client and user_msg:
            asyncio.create_task(add_conversation_to_zep(user_id, user_msg, response_text))

        msg_id = f"clm-{hash(user_msg) % 100000}"
        return StreamingResponse(
            stream_sse_response(response_text, msg_id),
            media_type="text/event-stream"
        )

    except Exception as e:
        print(f"[CLM] ERROR: {e}", file=sys.stderr)
        error_response = "I'm sorry, I encountered an issue. Can you please try again?"
        return StreamingResponse(
            stream_sse_response(error_response, "error"),
            media_type="text/event-stream"
        )


main_app.mount("/agui", ag_ui_app)
app = main_app
