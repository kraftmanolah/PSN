// "use client";

// import { useState } from "react";
// import Link from "next/link";

// export default function SignUpCompany() {
//   const [passwordVisible, setPasswordVisible] = useState(false); // Toggle password visibility
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // Toggle confirm password visibility

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
//         {/* Header */}
//         <h1 className="text-2xl font-semibold text-gray-800 mb-4">Create your account</h1>
//         <div className="flex space-x-2 mb-6">
//           {/* For Individuals Link */}
//           <Link
//             href="/signup/individual"
//             className={`px-3 py-1 rounded text-sm font-medium ${
//               false // Active condition for "For Individuals"
//                 ? "bg-yellow-500 text-white"
//                 : "border border-gray-300 text-gray-700"
//             }`}
//           >
//             For Individuals
//           </Link>

//           {/* For Companies Link */}
//           <Link
//             href="/signup/company"
//             className={`px-3 py-1 rounded text-sm font-medium ${
//               true // Active condition for "For Companies"
//                 ? "bg-yellow-500 text-white"
//                 : "border border-gray-300 text-gray-700"
//             }`}
//           >
//             For Companies
//           </Link>
//         </div>

//         {/* Form */}
//         <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Company Name */}
//           <div className="col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Company Name<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter your company's name"
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             />
//           </div>

//           {/* Email Address */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               E-mail Address<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               placeholder="Enter your company's email address"
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             />
//           </div>

//           {/* Company Address */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Company Address<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Include the city, state and country"
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             />
//           </div>

//           {/* Account Administrator Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Account Administrator<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter account administrator's full name"
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             />
//           </div>

//           {/* Account Administrator Role */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Account Administrator's Role<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter account administrator's role in the company"
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password<span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 placeholder="Enter your password"
//                 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               />
//               <button
//                 type="button"
//                 onClick={() => setPasswordVisible(!passwordVisible)}
//                 className="absolute right-3 top-2 text-gray-500"
//               >
//                 {passwordVisible ? "🙈" : "👁️"}
//               </button>
//             </div>
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Confirm Password<span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={confirmPasswordVisible ? "text" : "password"}
//                 placeholder="Confirm your password"
//                 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               />
//               <button
//                 type="button"
//                 onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
//                 className="absolute right-3 top-2 text-gray-500"
//               >
//                 {confirmPasswordVisible ? "🙈" : "👁️"}
//               </button>
//             </div>
//           </div>
//         </form>

//         {/* Password Hint */}
//         <p className="text-sm text-gray-600 mt-4">
//           Include capital letters, small letters, and other characters.
//         </p>

//         {/* Action Buttons */}
//         <div className="flex justify-end space-x-4 mt-6">
//           {/* Sign Up Link */}
//           <Link
//             href="/signup/company"
//             className={`px-6 py-2 font-medium rounded focus:outline-none ${
//               true // Active condition for "Sign Up"
//                 ? "bg-yellow-500 text-white hover:bg-yellow-600"
//                 : "border border-yellow-500 text-yellow-500 hover:bg-yellow-100"
//             }`}
//           >
//             Sign Up
//           </Link>

//           {/* Sign In Link */}
//           <Link
//             href="/signin"
//             className={`px-6 py-2 font-medium rounded focus:outline-none ${
//               false // Active condition for "Sign In"
//                 ? "bg-yellow-500 text-white hover:bg-yellow-600"
//                 : "border border-yellow-500 text-yellow-500 hover:bg-yellow-100"
//             }`}
//           >
//             Sign In
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import axios, { AxiosError } from "axios"; // Import AxiosError for typing
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";

export default function SignUpCompany() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone_number: "",
    organization_name: "",
    company_address: "",
    account_administrator_name: "",
    account_administrator_role: "",
    user_type: "organization", // Fixed for company signup
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // Toggle password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // Toggle confirm password visibility
  const router = useRouter();
  const { login } = useAuth();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone_number,
        organization_name: formData.organization_name,
        company_address: formData.company_address,
        account_administrator_name: formData.account_administrator_name,
        account_administrator_role: formData.account_administrator_role,
        user_type: formData.user_type,
      };
      const response = await axios.post(`${backendUrl}/api/accounts/register/`, payload);
      const { token } = response.data;
      login(token); // Store token via useAuth
      router.push('/'); // Redirect to homepage or dashboard
    } catch (err: AxiosError | any) { // Type err as AxiosError or any for broader compatibility
      let errorMessage = 'Signup failed. Please try again.';
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.error || err.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Create your account</h1>
        <div className="flex space-x-2 mb-6">
          {/* For Individuals Link */}
          <Link
            href="/signup/individual"
            className={`px-3 py-1 rounded text-sm font-medium ${
              false // Active condition for "For Individuals"
                ? "bg-yellow-500 text-white"
                : "border border-gray-300 text-gray-700"
            }`}
          >
            For Individuals
          </Link>

          {/* For Companies Link */}
          <Link
            href="/signup/company"
            className={`px-3 py-1 rounded text-sm font-medium ${
              true // Active condition for "For Companies"
                ? "bg-yellow-500 text-white"
                : "border border-gray-300 text-gray-700"
            }`}
          >
            For Companies
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company Name */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="organization_name"
              value={formData.organization_name}
              onChange={handleChange}
              placeholder="Enter your company's name"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-mail Address<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your company's email address"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Company Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Address<span className="text-red-500">*</span>
            </label>
            <textarea
              name="company_address"
              value={formData.company_address}
              onChange={handleChange}
              placeholder="Include the city, state and country"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Account Administrator Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Administrator<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="account_administrator_name"
              value={formData.account_administrator_name}
              onChange={handleChange}
              placeholder="Enter account administrator's full name"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Account Administrator Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Administrator's Role<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="account_administrator_role"
              value={formData.account_administrator_role}
              onChange={handleChange}
              placeholder="Enter account administrator's role in the company"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Password */}
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

          {/* Confirm Password (optional for form validation, not sent to backend) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                onChange={(e) => {
                  if (e.target.value !== formData.password) {
                    setError("Passwords do not match.");
                  } else {
                    setError("");
                  }
                }}
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
        </form>

        {/* Password Hint */}
        <p className="text-sm text-gray-600 mt-4">
          Include capital letters, small letters, and other characters.
        </p>

        {/* Loading or Error State */}
        {loading && <p className="text-gray-600 mt-4">Loading...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          {/* Sign Up Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className={`px-6 py-2 font-medium rounded focus:outline-none ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            }`}
            disabled={loading}
          >
            Sign Up
          </button>

          {/* Sign In Link */}
          <Link
            href="/signin"
            className={`px-6 py-2 font-medium rounded focus:outline-none ${
              false // Active condition for "Sign In"
                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                : "border border-yellow-500 text-yellow-500 hover:bg-yellow-100"
            }`}
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}