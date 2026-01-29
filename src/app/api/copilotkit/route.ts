import {
  CopilotRuntime,
  GoogleGenerativeAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { NextRequest, NextResponse } from "next/server";

// Debug logging
const DEBUG = true;
function debugLog(...args: unknown[]) {
  if (DEBUG) {
    console.log("[CopilotKit API]", ...args);
  }
}

// Use Gemini adapter - this interprets instructions and calls actions
// This is the pattern that WORKS in relocation.quest
const serviceAdapter = new GoogleGenerativeAIAdapter({
  model: "gemini-2.0-flash",
});

debugLog("Using GoogleGenerativeAIAdapter with gemini-2.0-flash");

// Create CopilotRuntime - no external agent needed, Gemini handles it
const runtime = new CopilotRuntime();

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
    adapter: "GoogleGenerativeAIAdapter",
    model: "gemini-2.0-flash",
    debug: DEBUG,
  });
};
