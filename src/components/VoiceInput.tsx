"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { VoiceProvider, useVoice } from "@humeai/voice-react";

interface VoiceInputProps {
  onMessage: (text: string, role?: "user" | "assistant") => void;
  userName?: string | null;
  userId?: string | null;
  userEmail?: string | null;
}

// Inner component that uses the voice hook
function VoiceButton({ onMessage, userName }: { onMessage: (text: string, role?: "user" | "assistant") => void; userName?: string | null }) {
  const { connect, disconnect, status, messages } = useVoice();
  const lastSentMsgId = useRef<string | null>(null);

  // Forward conversation messages to parent
  useEffect(() => {
    const conversationMsgs = messages.filter(
      (m: any) => (m.type === "user_message" || m.type === "assistant_message") && m.message?.content
    );

    if (conversationMsgs.length > 0) {
      const lastMsg = conversationMsgs[conversationMsgs.length - 1] as any;
      const msgId = lastMsg?.id || `${conversationMsgs.length}-${lastMsg?.message?.content?.slice(0, 20)}`;

      if (lastMsg?.message?.content && msgId !== lastSentMsgId.current) {
        const isUser = lastMsg.type === "user_message";
        console.log(`🎤 ${isUser ? 'User' : 'Assistant'}:`, lastMsg.message.content.slice(0, 80));
        lastSentMsgId.current = msgId;
        onMessage(lastMsg.message.content, isUser ? "user" : "assistant");
      }
    }
  }, [messages, onMessage]);

  const handleToggle = useCallback(async () => {
    if (status.value === "connected") {
      console.log("🎤 Disconnecting...");
      disconnect();
    } else {
      console.log("🎤 Connecting...");
      await connect();
      console.log("🎤 Connected!");
    }
  }, [connect, disconnect, status.value]);

  const isConnected = status.value === "connected";

  return (
    <button
      onClick={handleToggle}
      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg ${
        isConnected
          ? "bg-red-500 hover:bg-red-600 animate-pulse"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
      title={isConnected ? "Stop listening" : "Start voice input"}
      aria-label={isConnected ? "Stop listening" : "Start voice input"}
    >
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {isConnected ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10h6v4H9z"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        )}
      </svg>
    </button>
  );
}

// Main component - fetches token first, then renders VoiceProvider with auth
export function VoiceInput({ onMessage, userName, userId, userEmail }: VoiceInputProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch token on mount
  useEffect(() => {
    console.log("🎤 Fetching Hume token...");
    fetch("/api/hume-token")
      .then(res => res.json())
      .then(data => {
        if (data.accessToken) {
          console.log("🎤 Got access token");
          setAccessToken(data.accessToken);
        } else {
          console.error("🔴 No token received:", data);
          setError(data.error || "No token");
        }
      })
      .catch(err => {
        console.error("🔴 Token fetch error:", err);
        setError(err.message);
      });
  }, []);

  // Build system prompt
  const systemPrompt = `You are a friendly UK stamp duty calculator assistant.
Help users understand stamp duty for England, Scotland, and Wales.

USER: ${userName || 'Guest'} (ID: ${userId || 'anonymous'})

KEY KNOWLEDGE:
- England & Northern Ireland: SDLT (Stamp Duty Land Tax)
- Scotland: LBTT (Land and Buildings Transaction Tax)
- Wales: LTT (Land Transaction Tax)
- First-time buyers: Relief in England (up to £625k) and Scotland
- Wales has NO first-time buyer relief
- Additional properties: +5% England, +6% Scotland, +4% Wales

RULES:
- Keep responses SHORT for voice (1-2 sentences)
- Ask about property price, location, buyer type
- Be helpful and accurate
- Greet the user by name if known`;

  const configId = process.env.NEXT_PUBLIC_HUME_CONFIG_ID || "6b8b3912-ce29-45c6-ab6a-0902d7278a68";

  if (error) {
    console.error("🔴 Voice error:", error);
    return null; // Don't show button if token failed
  }

  if (!accessToken) {
    return (
      <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-400">
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <VoiceProvider
      auth={{ type: "accessToken", value: accessToken }}
      configId={configId}
      sessionSettings={{
        type: "session_settings",
        systemPrompt,
        customSessionId: userId || `anon_${Date.now()}`,
      }}
      onError={(err) => console.error("🔴 Hume Error:", err)}
      onOpen={() => console.log("🟢 Hume WebSocket connected")}
      onClose={(e) => console.log("🟡 Hume closed:", e?.code, e?.reason)}
    >
      <VoiceButton onMessage={onMessage} userName={userName} />
    </VoiceProvider>
  );
}
