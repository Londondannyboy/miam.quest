'use client';

import { NeonAuthUIProvider } from '@neondatabase/auth/react/ui';
import { authClient } from '@/lib/auth/client';

// CopilotKit is now lazy-loaded via LazyChat component for better performance

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NeonAuthUIProvider
      authClient={authClient}
      redirectTo="/"
      social={{ providers: ['google'] }}
    >
      {children}
    </NeonAuthUIProvider>
  );
}
