import { AuthView } from '@neondatabase/auth/react/ui';
import Link from 'next/link';

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { path: 'sign-in' },
    { path: 'sign-up' },
    { path: 'sign-out' },
    { path: 'forgot-password' },
    { path: 'reset-password' },
    { path: 'verify-email' },
  ];
}

export default async function AuthPage({ params }: { params: Promise<{ path: string }> }) {
  const { path } = await params;

  const titles: Record<string, string> = {
    'sign-in': 'Welcome back',
    'sign-up': 'Create your free account',
    'sign-out': 'Signing out...',
    'forgot-password': 'Reset your password',
    'reset-password': 'Set new password',
    'verify-email': 'Verify your email',
  };

  const subtitles: Record<string, string> = {
    'sign-in': 'Sign in to continue your mediation preparation',
    'sign-up': 'Start preparing for your MIAM meeting',
    'sign-out': 'You are being signed out...',
    'forgot-password': 'We\'ll send you a reset link',
    'reset-password': 'Choose a new password',
    'verify-email': 'Check your inbox',
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#fecdd3_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />

      {/* Modal card */}
      <div className="relative w-full max-w-md">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-3 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-200 group-hover:shadow-rose-300 transition-shadow">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <div>
              <span className="text-xl font-semibold text-gray-900">Miam Certificate Quest</span>
              <p className="text-sm text-gray-500 mt-1">Free MIAM Preparation</p>
            </div>
          </Link>
        </div>

        {/* Beta badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
            Beta Testing
          </span>
        </div>

        {/* Auth card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-rose-100/50 border border-rose-100 p-8 auth-modal">
          <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">
            {titles[path] || 'Authentication'}
          </h1>
          <p className="text-gray-500 text-center text-sm mb-6">
            {subtitles[path] || ''}
          </p>

          <AuthView path={path} />
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="text-rose-600 hover:text-rose-700 underline">Terms</Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-rose-600 hover:text-rose-700 underline">Privacy Policy</Link>
        </p>
      </div>
    </main>
  );
}
