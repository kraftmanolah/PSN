"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmail() {
  const [message, setMessage] = useState("Verifying your email...");
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setMessage("Invalid verification link.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/accounts/verify-email/`, {
          params: { token },
        });
        setMessage(response.data.detail);
        setIsVerified(true);
        setTimeout(() => router.push("/signin"), 5000);
      } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Failed to verify email.";
        setMessage(errorMessage);
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Email Verification</h1>
          <p className={`mb-4 ${isVerified ? "text-green-500" : "text-gray-600"}`}>
            {message}
          </p>
          {isVerified && (
            <Link
              href="/signin"
              className="inline-block px-6 py-2 font-medium rounded bg-yellow-500 text-white hover:bg-yellow-600"
            >
              Go to Sign In
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}