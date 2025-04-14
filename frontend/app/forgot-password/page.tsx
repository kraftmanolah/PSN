// app/forgot-password/page.tsx
'use client';

import { useState } from "react";
import Link from "next/link";
import axios, { AxiosError } from "axios";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState(false);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/api/accounts/password/reset/`, { email });
            setSuccess(true);
        } catch (err: AxiosError | any) {
            let errorMessage = 'Failed to send password reset email. Please try again.';
            if (axios.isAxiosError(err)) {
                errorMessage = err.response?.data?.detail || errorMessage;
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setSuccess(false);
        setEmail("");
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 h-48 md:h-auto bg-cover bg-center" style={{ backgroundImage: 'url("/images/forgot.png")' }} />
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white relative">
                <div className="mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">Forgot Password?</h1>
                    <p className="text-sm text-gray-600">
                        Don’t worry! Enter your email or phone number, and we’ll send you a link to reset your password.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            E-mail Address<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your E-mail address"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        />
                    </div>
                    {loading && <p className="text-gray-600 mt-4">Loading...</p>}
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                    <button
                        type="submit"
                        className={`w-full py-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                        disabled={loading}
                    >
                        Continue
                    </button>
                </form>
                <p className="text-sm text-gray-600 mt-4">
                    <Link href="/signin" className="text-yellow-500 hover:underline">
                        Go back to Sign in
                    </Link>
                </p>

                {/* Success Modal */}
                {success && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
                            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                                ✕
                            </button>
                            <div className="flex justify-center mb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 text-center">Password Reset</h2>
                            <p className="text-sm text-gray-600 text-center mt-2">
                                A password reset link has been sent to your email. Check your inbox and follow the instructions to reset your password.
                            </p>
                            <Link href="/signin">
                                <button className="w-full mt-4 py-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                                    Go back to Sign in
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}