"""
State schemas for MIAM.quest agent.

Uses TypedDict for CopilotKit compatibility.
State is automatically synced with frontend via CopilotKitMiddleware.
"""

from typing import TypedDict, Optional, List


class UserState(TypedDict, total=False):
    """User identity from Neon Auth."""
    id: str
    name: str
    email: str


class PositionItem(TypedDict, total=False):
    """Single position item captured from user."""
    id: str
    category: str  # must_have, priority, nice_to_have, red_line
    topic: str
    item: str
    context: Optional[str]


class CaseState(TypedDict, total=False):
    """Case/session information."""
    case_id: str
    case_type: str  # child_arrangements, financial, both
    children_count: int
    children_ages: List[int]
    current_arrangement: str


class MIAMState(TypedDict, total=False):
    """
    Main agent state for MIAM.quest.

    Extends with CopilotKit state fields automatically
    via CopilotKitMiddleware.
    """
    # User identity
    user: UserState

    # Case information
    case: CaseState

    # Position tracking
    position_items: List[PositionItem]
    topics_discussed: List[str]

    # Zep memory context
    zep_context: str

    # Current subagent handling request
    active_agent: Optional[str]


# Valid values for validation
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
