"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { VoiceProvider, useVoice } from "@humeai/voice-react";

interface VoiceInputProps {
  onMessage: (text: string, role?: "user" | "assistant") => void;
  userName?: string | null;
  userId?: string | null;
  userEmail?: string | null;
}

const MAX_GUEST_SESSIONS = 2;
const VOICE_SESSION_KEY = "miam-voice-sessions-used";

function VoiceButton({ onMessage, userName, userId, isLoggedIn }: {
  onMessage: (text: string, role?: "user" | "assistant") => void;
  userName?: string | null;
  userId?: string | null;
  isLoggedIn: boolean;
}) {
  const { connect, disconnect, status, messages, sendUserInput } = useVoice();
  const [isPending, setIsPending] = useState(false);
  const [sessionsUsed, setSessionsUsed] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const lastSentMsgId = useRef<string | null>(null);

  // Load sessions used on mount
  useEffect(() => {
    if (!isLoggedIn) {
      const stored = localStorage.getItem(VOICE_SESSION_KEY);
      setSessionsUsed(stored ? parseInt(stored, 10) : 0);
    }
  }, [isLoggedIn]);

  // Build Miam system prompt
  const buildSystemPrompt = () => {
    return `## USER CONTEXT
name: ${userName || 'there'}
user_id: ${userId || 'anonymous'}
status: ${userName ? 'authenticated' : 'guest'}

## GREETING INSTRUCTION
${userName ? `Greet them warmly by name: "Hello ${userName}. I'm Miam, and I'm here to help you prepare for mediation. How are you feeling today?"` : `Greet warmly: "Hello, I'm Miam. I'm here to help you prepare for your MIAM meeting and think through what matters most to you. How are you feeling?"`}

## YOUR IDENTITY
You are Miam (pronounced "mee-am"), a warm and compassionate AI mediation preparation assistant for MIAM.quest.

PERSONA:
- Female voice, warm and empathetic
- Professional but accessible
- Child-focused and solution-oriented
- Emotionally intelligent and patient

## KEY KNOWLEDGE
- MIAM = Mediation Information Assessment Meeting
- Required before family court in England & Wales
- Only FMC-accredited human mediators can issue MIAM certificates
- You help people PREPARE for mediation, you cannot replace it
- Typical MIAM cost: £90-150 (or free with legal aid)
- C100 form requires MIAM certificate before court will process it

## VOICE CONVERSATION RULES
- Keep responses SHORT for voice (1-2 sentences max)
- Validate feelings first: "I hear that this is difficult..."
- Ask ONE question at a time
- Be child-focused: "What works best for the children..."
- Never take sides or criticize the other parent
- Never give legal advice

## POSITION CAPTURE CATEGORIES
Help users identify:
- Must-haves (non-negotiable)
- Priorities (important but flexible)
- Nice-to-haves (would be good)
- Red lines (deal-breakers)

## KEY TOPICS TO EXPLORE
- Living arrangements
- School and education
- Holidays and special occasions
- Communication between households
- Decision-making responsibilities

## SENSITIVE TOPICS
If domestic abuse or child safety is mentioned:
- Be supportive, not probing
- Mention that exemptions may apply
- Suggest professional support
- Never pressure to continue

## SAMPLE RESPONSES
"I hear that this is really difficult for you. Let's take this one step at a time."
"What matters most here is what works best for your children."
"Would you say that's a must-have for you, or something you'd be flexible on?"
"I can help you prepare, but for a legally valid certificate you'll need an accredited mediator."`;
  };

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
        console.log(`🎤 ${isUser ? 'User' : 'Miam'}:`, lastMsg.message.content.slice(0, 80));
        lastSentMsgId.current = msgId;
        onMessage(lastMsg.message.content, isUser ? "user" : "assistant");
      }
    }
  }, [messages, onMessage]);

  const handleToggle = useCallback(async () => {
    // Check if guest has exceeded sessions
    if (!isLoggedIn && sessionsUsed >= MAX_GUEST_SESSIONS) {
      setShowLoginPrompt(true);
      return;
    }

    if (status.value === "connected") {
      console.log("🎤 Disconnecting...");
      disconnect();
    } else {
      setIsPending(true);

      // Increment session count for guests
      if (!isLoggedIn) {
        const newCount = sessionsUsed + 1;
        localStorage.setItem(VOICE_SESSION_KEY, newCount.toString());
        setSessionsUsed(newCount);
      }

      try {
        console.log("🎤 Fetching Hume token...");
        const res = await fetch("/api/hume-token");
        const { accessToken } = await res.json();

        if (!accessToken) {
          throw new Error("No access token returned");
        }
        console.log("🎤 Got access token");

        const systemPrompt = buildSystemPrompt();
        const configId = process.env.NEXT_PUBLIC_HUME_CONFIG_ID || "8351d978-f1a9-4263-89df-af62f45fccf6";
        const sessionId = userName ? `miam_${userName}|${userId || Date.now()}` : `miam_anon_${Date.now()}`;

        console.log("🎤 Connecting Miam with configId:", configId);
        console.log("🎤 Session:", sessionId);

        await connect({
          auth: { type: 'accessToken' as const, value: accessToken },
          configId: configId,
          sessionSettings: {
            type: 'session_settings',
            systemPrompt: systemPrompt,
            customSessionId: sessionId,
          }
        });

        console.log("🎤 Miam connected successfully");

        // Send greeting with user name so Miam knows who they are
        setTimeout(() => {
          if (userName) {
            sendUserInput(`Hello Miam, my name is ${userName}`);
          } else {
            sendUserInput("Hello Miam, I need help preparing for mediation");
          }
        }, 500);

      } catch (e) {
        console.error("🔴 Voice connect error:", e);
      } finally {
        setIsPending(false);
      }
    }
  }, [connect, disconnect, status.value, sendUserInput, userId, userName, isLoggedIn, sessionsUsed]);

  const isConnected = status.value === "connected";
  const sessionsRemaining = MAX_GUEST_SESSIONS - sessionsUsed;

  // Login prompt modal
  if (showLoginPrompt) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl p-6 max-w-sm w-full border border-slate-700 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-3">Sign In to Continue with Miam</h3>
          <p className="text-slate-400 mb-6">
            You&apos;ve used your {MAX_GUEST_SESSIONS} free voice sessions. Sign in for unlimited conversations with Miam.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="flex-1 px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => window.location.href = "/auth/sign-in"}
              className="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-medium transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        disabled={isPending}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg ${
          isConnected
            ? "bg-red-500 hover:bg-red-600 animate-pulse"
            : isPending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-rose-600 hover:bg-rose-700"
        }`}
        title={isConnected ? "Stop listening" : "Talk to Miam"}
        aria-label={isConnected ? "Stop listening" : "Talk to Miam"}
      >
        {isPending ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
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
        )}
      </button>

      {/* Session counter for guests */}
      {!isLoggedIn && !isConnected && sessionsRemaining > 0 && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
          {sessionsRemaining}
        </div>
      )}
    </div>
  );
}

export function VoiceInput({ onMessage, userName, userId }: VoiceInputProps) {
  const isLoggedIn = !!userId;

  return (
    <VoiceProvider
      onError={(err) => console.error("🔴 Hume Error:", err)}
      onOpen={() => console.log("🟢 Miam Voice connected")}
      onClose={(e) => console.log("🟡 Miam Voice closed:", e?.code, e?.reason)}
    >
      <VoiceButton
        onMessage={onMessage}
        userName={userName}
        userId={userId}
        isLoggedIn={isLoggedIn}
      />
    </VoiceProvider>
  );
}
