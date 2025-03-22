
'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";

export default function SignIn() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const router = useRouter();
    const { token, user, error: authError, login, logout } = useAuth();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

    useEffect(() => {
        if (authError) {
            console.error('Auth error in SignIn:', authError);
            setError(authError);
            logout();
        }
    }, [authError, router, logout]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            console.log('Attempting sign-in with:', formData);
            const response = await axios.post(`${backendUrl}/api/accounts/login/`, formData, {
                headers: { 'Content-Type': 'application/json' },
                maxRedirects: 0,
            });
            console.log('Sign-in response:', response.data);
            const { token: newToken } = response.data;
            login(newToken);
            router.push('/profile'); // Redirect here
        } catch (err: AxiosError | any) {
            console.error('Sign-in error:', err);
            let errorMessage = 'Signin failed. Please try again.';
            if (axios.isAxiosError(err)) {
                errorMessage = err.response?.data?.error || err.message || errorMessage;
                if (err.response?.status === 404) {
                    errorMessage = 'Sign-in endpoint not found. Please check the backend URL or contact support.';
                } else if (err.response?.status === 401) {
                    errorMessage = 'Invalid email or password. Please try again.';
                } else if (err.response?.status === 500) {
                    errorMessage = 'Server error. Please try again later or contact support.';
                } else if (err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED') {
                    errorMessage = 'Network error. Please check your connection and try again.';
                }
            } else if (err instanceof Error) {
                errorMessage = err.message || errorMessage;
            }
            setError(errorMessage);
            console.log('Prevented redirection due to error:', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row-reverse">
            <div className="w-full md:w-1/2 h-48 md:h-auto bg-cover bg-center" style={{ backgroundImage: 'url("/images/hero-1.png")' }} />
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
                <div className="mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">Sign In</h1>
                    <p className="text-sm text-gray-600">Welcome back! Please enter your details to continue.</p>
                </div>
                <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            E-mail Address<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password<span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className="absolute right-3 top-2 text-gray-500"
                            >
                                {passwordVisible ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <Link href="/forgot-password" className="text-sm text-yellow-500 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                    {loading && <p className="text-gray-600 mt-4">Loading...</p>}
                    {(error || authError) && <p className="text-red-500 mt-4">{error || authError}</p>}
                    <button
                        type="submit"
                        className={`w-full py-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                        disabled={loading}
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-sm text-gray-600 mt-4">
                    Don’t have an account?{' '}
                    <Link href="/signup/individual" className="text-yellow-500 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}