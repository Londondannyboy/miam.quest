import {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { HttpAgent } from "@ag-ui/client";
import { NextRequest, NextResponse } from "next/server";

// Debug logging
const DEBUG = true;
function debugLog(...args: unknown[]) {
  if (DEBUG) {
    console.log("[CopilotKit API]", ...args);
  }
}

// Log configuration on startup
const agentUrl = process.env.AGENT_URL
  ? `${process.env.AGENT_URL}/agui/`
  : "http://localhost:8000/agui/";
debugLog("Agent URL configured:", agentUrl);
debugLog("AGENT_URL env var:", process.env.AGENT_URL || "(not set)");

// Use empty adapter since we're only using one agent
const serviceAdapter = new ExperimentalEmptyAdapter();

// Create CopilotRuntime with HttpAgent pointing to our Pydantic AI agent
const runtime = new CopilotRuntime({
  agents: {
    miam_agent: new HttpAgent({
      url: agentUrl,
    }),
  },
});

// Next.js API route handler
export const POST = async (req: NextRequest) => {
  debugLog("POST request received");

  try {
    // Clone the request to read body for logging
    const body = await req.clone().json().catch(() => ({}));
    debugLog("Request body (partial):", JSON.stringify(body).substring(0, 200));

    const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
      runtime,
      serviceAdapter,
      endpoint: "/api/copilotkit",
    });

    debugLog("Calling handleRequest...");
    const response = await handleRequest(req);
    debugLog("Response status:", response.status);

    return response;
  } catch (error) {
    debugLog("Error:", error);
    console.error("CopilotKit API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
};

// Also handle GET for debugging
export const GET = async () => {
  return NextResponse.json({
    status: "ok",
    agentUrl: agentUrl,
    hasAgentUrl: !!process.env.AGENT_URL,
    debug: DEBUG,
  });
};
