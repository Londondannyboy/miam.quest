"""
MIAM preparation tools for miam.quest.

Uses LangChain @tool decorator with Pydantic schemas for input validation.
Integrates with Zep for user memory and Neon for mediator search.
"""

import os
import uuid
from datetime import datetime
from typing import Dict, Any, List, Optional
from langchain.tools import tool
from pydantic import BaseModel, Field

# Zep for user memory
from zep_cloud.client import Zep
from zep_cloud import NotFoundError

# Neon PostgreSQL
import psycopg2

# Import state constants
from state import POSITION_CATEGORIES, POSITION_TOPICS, MIAM_EXEMPTIONS


# =============================================================================
# External Service Clients
# =============================================================================

_zep_client = None
_database_url = None


def get_zep_client():
    """Lazy load Zep client."""
    global _zep_client
    if _zep_client is None:
        api_key = os.environ.get("ZEP_API_KEY")
        if api_key:
            _zep_client = Zep(api_key=api_key)
    return _zep_client


def get_database_url():
    """Get database URL."""
    global _database_url
    if _database_url is None:
        _database_url = os.environ.get("DATABASE_URL")
    return _database_url


# =============================================================================
# Zep Memory Helpers
# =============================================================================

async def get_or_create_zep_user(user_id: str, email: str = None, name: str = None):
    """Get or create a Zep user for memory tracking."""
    client = get_zep_client()
    if not client:
        return None

    try:
        user = client.user.get(user_id)
        return user
    except NotFoundError:
        first_name = name.split()[0] if name else None
        last_name = " ".join(name.split()[1:]) if name and len(name.split()) > 1 else None
        client.user.add(
            user_id=user_id,
            email=email,
            first_name=first_name,
            last_name=last_name
        )
        return client.user.get(user_id)
    except Exception as e:
        print(f"[TOOLS] Zep user error: {e}")
        return None


async def get_user_context(user_id: str) -> str:
    """Get relevant context about a user from Zep knowledge graph."""
    client = get_zep_client()
    if not client:
        return ""

    try:
        context = client.user.get_context(user_id, min_score=0.5)
        if context and context.facts:
            facts = [f.fact for f in context.facts[:5]]
            return "Known about this user: " + "; ".join(facts)
        return ""
    except Exception as e:
        print(f"[TOOLS] Zep context error: {e}")
        return ""


async def add_conversation_to_zep(user_id: str, user_msg: str, assistant_msg: str):
    """Store conversation in Zep for memory."""
    client = get_zep_client()
    if not client:
        return

    try:
        client.graph.add(
            user_id=user_id,
            type="message",
            data=f"User shared: {user_msg}\nMiam responded: {assistant_msg}"
        )
        print(f"[TOOLS] Zep: Stored conversation for user {user_id[:8]}...")
    except Exception as e:
        print(f"[TOOLS] Zep add error: {e}")


# =============================================================================
# Pydantic Input Schemas
# =============================================================================

class PositionInput(BaseModel):
    """Input schema for capture_position tool."""
    category: str = Field(
        description="Position category: must_have, priority, nice_to_have, or red_line"
    )
    topic: str = Field(
        description="Topic area like living_arrangements, school_education, holidays_occasions"
    )
    item: str = Field(
        description="The actual position statement from the user"
    )
    context: Optional[str] = Field(
        default=None,
        description="Optional additional context"
    )


class MIAMInfoInput(BaseModel):
    """Input schema for get_miam_info tool."""
    topic: str = Field(
        default="overview",
        description="Topic: overview, cost, process, certificate, what_to_expect"
    )


class ExemptionInput(BaseModel):
    """Input schema for check_exemption_eligibility tool."""
    circumstances: str = Field(
        description="Comma-separated list of circumstances (e.g., 'domestic_abuse, urgency')"
    )


class MediatorSearchInput(BaseModel):
    """Input schema for search_mediators tool."""
    location: Optional[str] = Field(
        default=None,
        description="Location to search (postcode or city)"
    )
    remote_only: bool = Field(
        default=False,
        description="Only show mediators offering remote sessions"
    )
    legal_aid_only: bool = Field(
        default=False,
        description="Only show mediators offering legal aid"
    )


class LoadMemoryInput(BaseModel):
    """Input schema for load_user_memory tool."""
    user_id: str = Field(
        description="User ID to load memory for"
    )
    user_name: Optional[str] = Field(
        default=None,
        description="User's name for context"
    )
    user_email: Optional[str] = Field(
        default=None,
        description="User's email for context"
    )


# =============================================================================
# MIAM Tools
# =============================================================================

@tool(args_schema=PositionInput)
def capture_position(category: str, topic: str, item: str, context: Optional[str] = None) -> Dict[str, Any]:
    """
    Capture a position item from the user's conversation.

    Use this to record what the user wants from their mediation - their priorities,
    must-haves, nice-to-haves, and red lines.

    Args:
        category: Position category (must_have, priority, nice_to_have, red_line)
        topic: Topic area (living_arrangements, school_education, etc.)
        item: The actual position statement
        context: Optional additional context

    Returns:
        Confirmation of captured position
    """
    if category not in POSITION_CATEGORIES:
        return {
            "success": False,
            "error": f"Invalid category. Use: {', '.join(POSITION_CATEGORIES)}"
        }

    if topic not in POSITION_TOPICS:
        topic = "other"

    position_id = str(uuid.uuid4())[:8]

    return {
        "success": True,
        "captured": {
            "id": position_id,
            "category": category,
            "topic": topic,
            "item": item,
            "context": context
        },
        "message": f"I've captured that as a {category.replace('_', ' ')} item about {topic.replace('_', ' ')}."
    }


@tool
def get_position_summary() -> Dict[str, Any]:
    """
    Get a summary of position topics available.

    Use this to show the user what topics they should consider discussing
    when preparing for their MIAM.

    Returns:
        List of topics to discuss
    """
    return {
        "position_categories": POSITION_CATEGORIES,
        "available_topics": POSITION_TOPICS,
        "suggested_discussion": [
            "What are your absolute must-haves for living arrangements?",
            "What are your priorities for school and education decisions?",
            "How would you like holidays and special occasions handled?",
            "What communication style works best between households?",
            "Are there any red lines you won't compromise on?"
        ],
        "tip": "Help the user explore each topic, asking if items are must-haves, priorities, nice-to-haves, or red lines."
    }


@tool(args_schema=MIAMInfoInput)
def get_miam_info(topic: str = "overview") -> Dict[str, Any]:
    """
    Get information about the MIAM process.

    Use this to answer user questions about MIAMs, certificates, costs,
    and what to expect.

    Args:
        topic: overview, cost, process, certificate, or what_to_expect

    Returns:
        Information about the requested topic
    """
    info = {
        "overview": {
            "title": "What is a MIAM?",
            "content": """A MIAM (Mediation Information Assessment Meeting) is a mandatory meeting before applying to family court in England and Wales.

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


@tool(args_schema=ExemptionInput)
def check_exemption_eligibility(circumstances: str) -> Dict[str, Any]:
    """
    Check if user may qualify for MIAM exemption.

    Use this when user mentions circumstances that might exempt them
    from attending a MIAM.

    Args:
        circumstances: Comma-separated circumstances (e.g., 'domestic_abuse, urgency')

    Returns:
        Information about potential exemptions
    """
    circumstances_list = [c.strip().lower().replace(" ", "_") for c in circumstances.split(",")]
    potential_exemptions = []

    for circ in circumstances_list:
        if circ in MIAM_EXEMPTIONS:
            exemption = MIAM_EXEMPTIONS[circ]
            potential_exemptions.append({
                "exemption": circ,
                "label": exemption["label"],
                "description": exemption["description"],
                "evidence_required": exemption.get("evidence_required", [])
            })

    return {
        "has_potential_exemption": len(potential_exemptions) > 0,
        "potential_exemptions": potential_exemptions,
        "all_exemptions": list(MIAM_EXEMPTIONS.keys()),
        "important_note": "Exemptions must be declared on the C100 form. Some require evidence. If you're unsure, discuss with a solicitor or the mediator.",
        "disclaimer": "I can provide information about exemptions, but cannot determine eligibility. This is not legal advice."
    }


@tool(args_schema=MediatorSearchInput)
def search_mediators(location: Optional[str] = None, remote_only: bool = False, legal_aid_only: bool = False) -> Dict[str, Any]:
    """
    Search for FMC-accredited mediators.

    Use this to help users find a mediator in their area.

    Args:
        location: Location to search (postcode or city)
        remote_only: Only show mediators offering remote sessions
        legal_aid_only: Only show mediators offering legal aid

    Returns:
        List of matching mediators
    """
    database_url = get_database_url()
    if not database_url:
        return {
            "success": False,
            "message": "Mediator directory not available. Visit familymediationcouncil.org.uk to find accredited mediators.",
            "fmc_url": "https://www.familymediationcouncil.org.uk/find-local-mediator/"
        }

    try:
        conn = psycopg2.connect(database_url)
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
            },
            "fmc_url": "https://www.familymediationcouncil.org.uk/find-local-mediator/"
        }

    except Exception as e:
        print(f"[TOOLS] search_mediators error: {e}")
        return {
            "success": False,
            "error": str(e),
            "fallback": "Visit familymediationcouncil.org.uk to find accredited mediators.",
            "fmc_url": "https://www.familymediationcouncil.org.uk/find-local-mediator/"
        }


@tool
def generate_preparation_summary() -> Dict[str, Any]:
    """
    Generate information about what a preparation summary includes.

    Use this when the user wants to know what they should prepare
    before their MIAM.

    Returns:
        Information about preparation summary contents
    """
    return {
        "summary_sections": [
            {
                "title": "Must-Haves",
                "description": "Non-negotiable items - things you absolutely need in any agreement"
            },
            {
                "title": "Priorities",
                "description": "Important items you'd like but could be flexible on"
            },
            {
                "title": "Nice-to-Haves",
                "description": "Items that would be good but aren't essential"
            },
            {
                "title": "Red Lines",
                "description": "Absolute deal-breakers you won't compromise on"
            }
        ],
        "key_topics": [
            "Living arrangements - where children will live primarily",
            "School & education decisions",
            "Holidays and special occasions",
            "Communication between households",
            "Decision-making responsibilities",
            "Financial support"
        ],
        "tip": "The more prepared you are, the more productive your MIAM will be.",
        "disclaimer": "This summary is for preparation purposes only. It is not legal advice and cannot replace professional mediation."
    }


@tool(args_schema=LoadMemoryInput)
def load_user_memory(user_id: str, user_name: Optional[str] = None, user_email: Optional[str] = None) -> Dict[str, Any]:
    """
    Load user memory and context from Zep.

    Call this at the start of a conversation to personalize responses
    based on previous conversations with this user.

    Args:
        user_id: User ID to load memory for
        user_name: User's name for context
        user_email: User's email for context

    Returns:
        User context and known facts from previous conversations
    """
    import asyncio

    client = get_zep_client()
    if not client:
        return {
            "success": False,
            "message": "Memory service not configured.",
            "user_id": user_id
        }

    try:
        # Run async in sync context
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

        try:
            loop.run_until_complete(get_or_create_zep_user(user_id, user_email, user_name))
            zep_context = loop.run_until_complete(get_user_context(user_id))
        finally:
            loop.close()

        return {
            "success": True,
            "user_id": user_id[:8] + "...",
            "user_name": user_name,
            "context_loaded": bool(zep_context),
            "context": zep_context if zep_context else "No previous context found for this user."
        }
    except Exception as e:
        print(f"[TOOLS] load_user_memory error: {e}")
        return {
            "success": False,
            "error": str(e),
            "user_id": user_id[:8] + "..."
        }


# Export all tools as a list
MIAM_TOOLS = [
    capture_position,
    get_position_summary,
    get_miam_info,
    check_exemption_eligibility,
    search_mediators,
    generate_preparation_summary,
    load_user_memory,
]
