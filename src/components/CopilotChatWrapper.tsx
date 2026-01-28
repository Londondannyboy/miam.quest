'use client';

import { useEffect } from 'react';
import { CopilotKit } from '@copilotkit/react-core';
import { CopilotPopup } from '@copilotkit/react-ui';
import '@copilotkit/react-ui/styles.css';

interface CopilotChatWrapperProps {
  prompt: string;
  onClose: () => void;
}

// Debug mode - set to true to see console logs
const DEBUG = true;

function debugLog(...args: unknown[]) {
  if (DEBUG) {
    console.log('[CopilotKit Debug]', ...args);
  }
}

export default function CopilotChatWrapper({ prompt, onClose }: CopilotChatWrapperProps) {
  useEffect(() => {
    debugLog('CopilotChatWrapper mounted');
    debugLog('Runtime URL: /api/copilotkit');
    debugLog('Agent: miam_agent');

    // Test the API endpoint
    fetch('/api/copilotkit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'test' }],
        agent: 'miam_agent'
      })
    })
      .then(res => {
        debugLog('API response status:', res.status);
        return res.text();
      })
      .then(text => {
        debugLog('API response (first 500 chars):', text.substring(0, 500));
      })
      .catch(err => {
        debugLog('API error:', err);
      });

    return () => {
      debugLog('CopilotChatWrapper unmounted');
    };
  }, []);

  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit"
      agent="miam_agent"
      onError={(error) => {
        debugLog('CopilotKit error:', error);
        console.error('CopilotKit error:', error);
      }}
    >
      <CopilotPopup
        instructions={prompt}
        labels={{
          title: "Chat with Miam",
          initial: "Hello! I'm Miam, your MIAM preparation assistant.\n\n**Beta Service:** For official guidance, consult an FMC-accredited mediator or GOV.UK.\n\nHow can I help you today?",
          placeholder: "Ask about MIAMs, certificates, exemptions...",
        }}
        defaultOpen={true}
        onSetOpen={(open) => {
          debugLog('CopilotPopup open state changed:', open);
          if (!open) onClose();
        }}
        clickOutsideToClose={true}
      />
    </CopilotKit>
  );
}
