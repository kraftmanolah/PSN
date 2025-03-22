"use client";

import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return null; // Or redirect to /signin if unauthenticated (handled by layout.tsx)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">Welcome, {user.full_name || user.email}!</h2>
            <p className="text-gray-600">User Type: {user.user_type}</p>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Phone Number: {user.phone_number}</p>
            {user.user_type === "organization" && (
              <>
                <p className="text-gray-600">Organization: {user.organization_name}</p>
                <p className="text-gray-600">Address: {user.company_address}</p>
                <p className="text-gray-600">Admin: {user.account_administrator_name} ({user.account_administrator_role})</p>
              </>
            )}
          </div>
          <div className="flex space-x-4">
            <Link
              href="/cart"
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Go to Cart
            </Link>
            <Link
              href="/order/summary"
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              View Order Summary
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}