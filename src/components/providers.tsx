'use client';

import { NeonAuthUIProvider } from '@neondatabase/auth/react/ui';
import { CopilotKit } from '@copilotkit/react-core';
import { authClient } from '@/lib/auth/client';
import '@copilotkit/react-ui/styles.css';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NeonAuthUIProvider
      authClient={authClient}
      redirectTo="/"
      social={{ providers: ['google'] }}
    >
      <CopilotKit runtimeUrl="/api/copilotkit" agent="miam_agent">
        {children}
      </CopilotKit>
    </NeonAuthUIProvider>
  );
}
