// 'use client';

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import axios, { AxiosError } from "axios";

// export default function ResetPassword() {
//     const searchParams = useSearchParams();
//     const uid = searchParams.get("uid") || "";
//     const token = searchParams.get("token") || "";
//     const [formData, setFormData] = useState({ new_password: "", confirm_password: "" });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string>("");
//     const [success, setSuccess] = useState(false);
//     const [passwordVisible, setPasswordVisible] = useState(false);
//     const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//     const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

//     useEffect(() => {
//         if (!uid || !token) {
//             setError("Invalid or missing reset token. Please request a new password reset link.");
//         }
//     }, [uid, token]);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError("");
//         setLoading(true);

//         // Client-side validation
//         if (formData.new_password.length < 8) {
//             setError("Password must be at least 8 characters long.");
//             setLoading(false);
//             return;
//         }
//         if (formData.new_password !== formData.confirm_password) {
//             setError("Passwords do not match.");
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await axios.post(`${backendUrl}/api/accounts/password/reset/confirm/`, {
//                 uid,
//                 token,
//                 new_password: formData.new_password,
//                 confirm_password: formData.confirm_password,
//             });
//             if (response.status === 200) {
//                 setSuccess(true);
//             }
//         } catch (err: AxiosError | any) {
//             console.error("Password reset error:", err.response?.data);
//             let errorMessage = 'Failed to reset password. Please try again.';
//             if (axios.isAxiosError(err) && err.response?.data) {
//                 const data = err.response.data;
//                 if (data.detail) {
//                     errorMessage = data.detail; // e.g., "Invalid or expired token."
//                 } else if (data.confirm_password) {
//                     errorMessage = data.confirm_password.join(' '); // e.g., "Passwords do not match."
//                 } else if (data.new_password) {
//                     errorMessage = data.new_password.join(' '); // e.g., "This password is too common."
//                 } else if (data.non_field_errors) {
//                     errorMessage = data.non_field_errors.join(' ');
//                 }
//             }
//             setError(errorMessage);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const closeModal = () => {
//         setSuccess(false);
//         setFormData({ new_password: "", confirm_password: "" });
//     };

//     return (
//         <div className="min-h-screen flex flex-col md:flex-row">
//             <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white relative order-1 md:order-1">
//                 <div className="w-full max-w-md space-y-4">
//                     <div>
//                         <h1 className="text-3xl font-semibold text-gray-800">Create a New Password</h1>
//                         <p className="text-sm text-gray-600">
//                             Your new password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
//                         </p>
//                     </div>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Password<span className="text-red-500">*</span>
//                             </label>
//                             <div className="relative">
//                                 <input
//                                     type={passwordVisible ? "text" : "password"}
//                                     name="new_password"
//                                     value={formData.new_password}
//                                     onChange={handleChange}
//                                     placeholder="Enter your new password"
//                                     className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                                     required
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => setPasswordVisible(!passwordVisible)}
//                                     className="absolute right-3 top-2 text-gray-500"
//                                 >
//                                     {passwordVisible ? "🙈" : "👁️"}
//                                 </button>
//                             </div>
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Confirm Password<span className="text-red-500">*</span>
//                             </label>
//                             <div className="relative">
//                                 <input
//                                     type={confirmPasswordVisible ? "text" : "password"}
//                                     name="confirm_password"
//                                     value={formData.confirm_password}
//                                     onChange={handleChange}
//                                     placeholder="Confirm your new password"
//                                     className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                                     required
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
//                                     className="absolute right-3 top-2 text-gray-500"
//                                 >
//                                     {confirmPasswordVisible ? "🙈" : "👁️"}
//                                 </button>
//                             </div>
//                         </div>
//                         {loading && <p className="text-gray-600">Loading...</p>}
//                         {error && <p className="text-red-500">{error}</p>}
//                         <button
//                             type="submit"
//                             className={`w-full py-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${loading ? "cursor-not-allowed opacity-50" : ""}`}
//                             disabled={loading || !uid || !token}
//                         >
//                             Reset Password
//                         </button>
//                     </form>
//                 </div>

//                 {/* Success Modal */}
//                 {success && (
//                     <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                         <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
//                             <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
//                                 ✕
//                             </button>
//                             <div className="flex justify-center mb-4">
//                                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                                     <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                                     </svg>
//                                 </div>
//                             </div>
//                             <h2 className="text-xl font-semibold text-gray-800 text-center">Password Reset Successfully!</h2>
//                             <p className="text-sm text-gray-600 text-center mt-2">
//                                 Your password has been updated successfully! You can now log in with your new password.
//                             </p>
//                             <Link href="/signin">
//                                 <button className="w-full mt-4 py-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">
//                                     Go back to Sign in
//                                 </button>
//                             </Link>
//                         </div>
//                     </div>
//                 )}
//             </div>
//             <div className="w-full md:w-1/2 h-48 md:h-screen bg-cover bg-center order-2 md:order-2" style={{ backgroundImage: 'url("/images/reset.png")' }} />
//         </div>
//     );
// }

'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";

export default function ResetPassword() {
    const searchParams = useSearchParams();
    const uid = searchParams.get("uid") || "";
    const token = searchParams.get("token") || "";
    const [formData, setFormData] = useState({ new_password: "", confirm_password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

    useEffect(() => {
        if (!uid || !token) {
            setError("Invalid or missing reset token. Please request a new password reset link.");
        }
    }, [uid, token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Client-side validation
        if (formData.new_password.length < 8) {
            setError("Password must be at least 8 characters long.");
            setLoading(false);
            return;
        }
        if (formData.new_password !== formData.confirm_password) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${backendUrl}/api/accounts/password/reset/confirm/`, {
                uid,
                token,
                new_password: formData.new_password,
                confirm_password: formData.confirm_password,
            });
            if (response.status === 200) {
                setSuccess(true);
            }
        } catch (err: AxiosError | any) {
            console.error("Password reset error:", err.response?.data);
            let errorMessage = 'Failed to reset password. Please try again.';
            if (axios.isAxiosError(err) && err.response?.data) {
                const data = err.response.data;
                if (data.detail) {
                    errorMessage = data.detail;
                } else if (data.confirm_password) {
                    errorMessage = data.confirm_password.join(' ');
                } else if (data.new_password) {
                    errorMessage = data.new_password.join(' ');
                } else if (data.non_field_errors) {
                    errorMessage = data.non_field_errors.join(' ');
                }
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setSuccess(false);
        setFormData({ new_password: "", confirm_password: "" });
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white relative order-1 md:order-1">
                <div className="w-full max-w-md space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-semibold text-gray-800">Create a New Password</h1>
                        <p className="text-sm text-gray-600">
                            Choose a secure password to protect your account.
                        </p>
                        <p className="text-sm text-gray-500 italic">
                            Requirements: At least 8 characters, not too similar to your email or name, not a common password (e.g., ‘password123’), and not entirely numeric (e.g., ‘12345678’).
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password<span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    name="new_password"
                                    value={formData.new_password}
                                    onChange={handleChange}
                                    placeholder="Enter your new password"
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
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password<span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={confirmPasswordVisible ? "text" : "password"}
                                    name="confirm_password"
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                    placeholder="Confirm your new password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                    className="absolute right-3 top-2 text-gray-500"
                                >
                                    {confirmPasswordVisible ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </div>
                        {loading && <p className="text-gray-600">Loading...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        <button
                            type="submit"
                            className={`w-full py-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                            disabled={loading || !uid || !token}
                        >
                            Reset Password
                        </button>
                    </form>
                </div>

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
                            <h2 className="text-xl font-semibold text-gray-800 text-center">Password Reset Successfully!</h2>
                            <p className="text-sm text-gray-600 text-center mt-2">
                                Your password has been updated successfully! You can now log in with your new password.
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
            <div className="w-full md:w-1/2 h-48 md:h-screen bg-cover bg-center order-2 md:order-2" style={{ backgroundImage: 'url("/images/reset.png")' }} />
        </div>
    );
}