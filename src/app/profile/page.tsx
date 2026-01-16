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
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Signed Out - Redirect to sign in */}
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>

        {/* Signed In State */}
        <SignedIn>
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <div className="flex items-center justify-between">
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
                <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                  ← Back to Calculator
                </Link>
                <button
                  onClick={() => authClient.signOut()}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
            <AccountSettingsCards />
          </div>

          {/* Profile Section */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Profile</h2>

            <div className="space-y-6">
              {/* Property Preferences */}
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🏠</span> Property Preferences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Region</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select region...</option>
                      <option value="england">England</option>
                      <option value="scotland">Scotland</option>
                      <option value="wales">Wales</option>
                      <option value="northern-ireland">Northern Ireland</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Buyer Type</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select type...</option>
                      <option value="first-time">First-Time Buyer</option>
                      <option value="standard">Standard Buyer</option>
                      <option value="additional">Additional Property</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Budget Range */}
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>💰</span> Budget Range
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Budget</label>
                    <input
                      type="text"
                      placeholder="£200,000"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Budget</label>
                    <input
                      type="text"
                      placeholder="£500,000"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Save Preferences
                </button>
              </div>
            </div>
          </div>

          {/* Calculation History */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Calculations</h2>

            <div className="text-center py-12">
              <span className="text-4xl mb-4 block">📊</span>
              <p className="text-gray-500 mb-2">No calculations saved yet</p>
              <p className="text-gray-400 text-sm mb-4">
                Your stamp duty calculations will appear here
              </p>
              <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                Calculate stamp duty →
              </Link>
            </div>
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
