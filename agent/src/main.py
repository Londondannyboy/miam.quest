"""
MIAM.quest Agent - FastAPI Entrypoint

Exposes:
- AG-UI endpoint for CopilotKit integration (/)
- CLM endpoint for Hume EVI voice (/chat/completions)
"""

import os
import sys
import json
import asyncio
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import StreamingResponse
import uvicorn

from ag_ui_langgraph import add_langgraph_fastapi_endpoint
from copilotkit import LangGraphAGUIAgent

from .agent import build_agent

# Zep for CLM memory
from zep_cloud.client import Zep
from zep_cloud import NotFoundError


# =============================================================================
# FastAPI App
# =============================================================================

app = FastAPI(
    title="MIAM.quest Agent",
    description="Deep Agents backend for MIAM preparation assistance",
    version="2.0.0",
)

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =============================================================================
# Zep Client for CLM endpoint
# =============================================================================

ZEP_API_KEY = os.environ.get("ZEP_API_KEY")
zep_client = Zep(api_key=ZEP_API_KEY) if ZEP_API_KEY else None


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
        print(f"[MAIN] Zep user error: {e}", file=sys.stderr)
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
        print(f"[MAIN] Zep context error: {e}", file=sys.stderr)
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
        print(f"[MAIN] Zep: Stored conversation for user {user_id[:8]}...", file=sys.stderr)
    except Exception as e:
        print(f"[MAIN] Zep add error: {e}", file=sys.stderr)


# =============================================================================
# Build and Register Agent
# =============================================================================

try:
    agent_graph = build_agent()

    add_langgraph_fastapi_endpoint(
        app=app,
        agent=LangGraphAGUIAgent(
            name="miam_agent",
            description="AI assistant for MIAM preparation",
            graph=agent_graph,
        ),
        path="/",
    )

    print("[MAIN] Agent registered at /", file=sys.stderr)

except Exception as e:
    print(f"[ERROR] Failed to build agent: {e}", file=sys.stderr)
    raise


# =============================================================================
# Health & Debug Endpoints
# =============================================================================

@app.get("/healthz")
async def health_check():
    """Health check for orchestration."""
    return {
        "status": "healthy",
        "service": "miam-quest-agent",
        "version": "2.0.0",
        "framework": "langchain-deep-agents",
    }


_last_clm_request = {}


@app.get("/debug")
async def debug_info():
    """Debug information."""
    return {
        "agent_name": "miam_agent",
        "google_model": os.environ.get("GOOGLE_MODEL", "gemini-2.0-flash"),
        "has_api_key": bool(os.environ.get("GOOGLE_API_KEY")),
        "has_zep": bool(zep_client),
        "has_database": bool(os.environ.get("DATABASE_URL")),
        "last_clm_request": _last_clm_request,
    }


# =============================================================================
# CLM Endpoint for Hume Voice
# =============================================================================

def extract_session_id(request: Request, body: dict) -> Optional[str]:
    """Extract session ID from request (for user identification)."""
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
    """Parse session ID to extract user info."""
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
    """Stream response in SSE format for OpenAI compatibility."""
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


async def run_agent_for_clm(user_message: str, user_name: str, user_id: str, zep_context: str, conversation_history: list = None) -> str:
    """Run the LangChain agent for CLM requests."""
    try:
        # Build context message
        context_parts = []
        if user_name:
            context_parts.append(f"User's name is {user_name}.")
        if zep_context:
            context_parts.append(zep_context)

        context_msg = " ".join(context_parts) if context_parts else ""

        # Format messages for the agent
        messages = []

        # Add conversation history if available
        if conversation_history:
            for msg in conversation_history[:-1]:  # Exclude last (current) message
                role = msg.get("role", "user")
                content = msg.get("content", "")
                if isinstance(content, str) and content.strip():
                    messages.append({
                        "role": role,
                        "content": content
                    })

        # Add current user message with context
        current_message = user_message
        if context_msg and not messages:  # Only add context on first message
            current_message = f"{context_msg}\n\nUser message: {user_message}"

        messages.append({
            "role": "user",
            "content": current_message
        })

        # Invoke the agent graph
        config = {
            "configurable": {
                "thread_id": user_id or "anonymous",
            }
        }

        result = await agent_graph.ainvoke(
            {"messages": messages},
            config=config,
        )

        # Extract response
        if result and "messages" in result:
            for msg in reversed(result["messages"]):
                if hasattr(msg, "content") and msg.content:
                    return msg.content

        return ""

    except Exception as e:
        print(f"[CLM] Agent error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        return ""


@app.post("/chat/completions")
async def clm_endpoint(request: Request):
    """OpenAI-compatible CLM endpoint for Hume EVI voice."""
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

        response_text = await run_agent_for_clm(user_msg, user_name, user_id, zep_context, conversation_history=messages)

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
        import traceback
        traceback.print_exc()
        error_response = "I'm sorry, I encountered an issue. Can you please try again?"
        return StreamingResponse(
            stream_sse_response(error_response, "error"),
            media_type="text/event-stream"
        )


# =============================================================================
# Run Server
# =============================================================================

def main():
    """Run the uvicorn server."""
    host = os.getenv("SERVER_HOST", "0.0.0.0")
    # Railway uses PORT, locally we use SERVER_PORT
    port = int(os.getenv("PORT", os.getenv("SERVER_PORT", "8000")))

    print(f"[MAIN] Starting server on {host}:{port}", file=sys.stderr)

    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=os.getenv("RELOAD", "false").lower() == "true",
        log_level="info",
    )


if __name__ == "__main__":
    main()
