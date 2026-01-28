'use client';

import { UserButton, RedirectToSignIn, SignedIn, SignedOut, AccountSettingsCards } from '@neondatabase/auth/react/ui';
import { authClient } from '@/lib/auth/client';
import Link from 'next/link';

export default function ProfilePage() {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;
  const firstName = user?.name?.split(' ')[0] || user?.email?.split('@')[0] || 'User';

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-600 to-pink-700 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-600 to-pink-700 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Signed Out - Redirect to sign in */}
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>

        {/* Signed In State */}
        <SignedIn>
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <UserButton />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Welcome, {firstName}
                  </h1>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/" className="text-rose-600 hover:text-rose-800 font-medium">
                  ← Back to Home
                </Link>
                <button
                  onClick={async () => {
                    await authClient.signOut();
                    window.location.href = '/';
                  }}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Beta Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚧</span>
              <div>
                <h3 className="font-semibold text-amber-900">Beta Testing</h3>
                <p className="text-amber-800 text-sm mt-1">
                  Miam Certificate Quest is currently in beta. We&apos;re continuously improving based on your feedback.
                  For official guidance, please consult an{' '}
                  <a href="https://www.familymediationcouncil.org.uk/find-local-mediator/" target="_blank" rel="noopener noreferrer" className="underline">
                    FMC-accredited mediator
                  </a>{' '}
                  or visit{' '}
                  <a href="https://www.gov.uk/looking-after-children-divorce" target="_blank" rel="noopener noreferrer" className="underline">
                    GOV.UK
                  </a>.
                </p>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
            <AccountSettingsCards />
          </div>

          {/* Mediation Preparation */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Preparation Journey</h2>

            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/"
                  className="border border-rose-200 rounded-xl p-6 hover:border-rose-400 hover:bg-rose-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💬</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-rose-700">Chat with Miam</h3>
                      <p className="text-sm text-gray-500">Start or continue your preparation conversation</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/what-is-a-miam"
                  className="border border-gray-200 rounded-xl p-6 hover:border-rose-400 hover:bg-rose-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📚</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-rose-700">Learn About MIAMs</h3>
                      <p className="text-sm text-gray-500">Understand the MIAM process</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Resources */}
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📋</span> Helpful Resources
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Link href="/miam-certificate" className="text-rose-600 hover:text-rose-800 text-sm">
                    → MIAM Certificate Guide
                  </Link>
                  <Link href="/miam-exemptions" className="text-rose-600 hover:text-rose-800 text-sm">
                    → MIAM Exemptions
                  </Link>
                  <Link href="/find-a-mediator" className="text-rose-600 hover:text-rose-800 text-sm">
                    → Find a Mediator
                  </Link>
                  <Link href="/c100-form" className="text-rose-600 hover:text-rose-800 text-sm">
                    → C100 Form Guide
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Conversation History (placeholder for future) */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Conversation History</h2>

            <div className="text-center py-12">
              <span className="text-4xl mb-4 block">💬</span>
              <p className="text-gray-500 mb-2">No saved conversations yet</p>
              <p className="text-gray-400 text-sm mb-4">
                Your chat history with Miam will appear here
              </p>
              <Link href="/" className="text-rose-600 hover:text-rose-800 font-medium">
                Start chatting with Miam →
              </Link>
            </div>
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
