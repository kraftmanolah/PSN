// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import axios, { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/app/hooks/useAuth";

// export default function SignUpCompany() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirm_password: "", // Added for client-side validation
//     phone_number: "",
//     organization_name: "",
//     company_address: "",
//     account_administrator_name: "",
//     account_administrator_role: "",
//     user_type: "organization",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const router = useRouter();
//   const { login } = useAuth();
//   const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Real-time confirm password validation
//     if (name === "confirm_password") {
//       if (value !== formData.password) {
//         setError("Passwords do not match.");
//       } else {
//         setError("");
//       }
//     } else if (name === "password" && formData.confirm_password) {
//       if (formData.confirm_password !== value) {
//         setError("Passwords do not match.");
//       } else {
//         setError("");
//       }
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     // Client-side validation for password match
//     if (formData.password !== formData.confirm_password) {
//       setError("Passwords do not match.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const payload = {
//         email: formData.email,
//         password: formData.password,
//         phone_number: formData.phone_number,
//         organization_name: formData.organization_name,
//         company_address: formData.company_address,
//         account_administrator_name: formData.account_administrator_name,
//         account_administrator_role: formData.account_administrator_role,
//         user_type: formData.user_type,
//       };
//       const response = await axios.post(`${backendUrl}/api/accounts/register/`, payload);
//       const { token } = response.data;
//       await login(token);
//       router.push('/');
//     } catch (err: AxiosError | any) {
//       let errorMessage = 'Signup failed. Please try again.';
//       if (axios.isAxiosError(err)) {
//         errorMessage = err.response?.data?.error || err.message || errorMessage;
//       } else if (err instanceof Error) {
//         errorMessage = err.message || errorMessage;
//       }
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <main className="flex-grow flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
//         <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
//           {/* Header */}
//           <h1 className="text-2xl font-semibold text-gray-800 mb-4">Create your account</h1>
//           <div className="flex space-x-2 mb-6">
//             {/* For Individuals Link */}
//             <Link
//               href="/signup/individual"
//               className="px-3 py-1 rounded text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100"
//             >
//               For Individuals
//             </Link>

//             {/* For Companies Link */}
//             <Link
//               href="/signup/company"
//               className="px-3 py-1 rounded text-sm font-medium bg-yellow-500 text-white"
//             >
//               For Companies
//             </Link>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Company Name */}
//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Company Name<span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="organization_name"
//                 value={formData.organization_name}
//                 onChange={handleChange}
//                 placeholder="Enter your company's name"
//                 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               />
//             </div>

//             {/* Email Address */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 E-mail Address<span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your company's email address"
//                 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               />
//             </div>

//             {/* Phone Number */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Phone Number<span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="tel"
//                 name="phone_number"
//                 value={formData.phone_number}
//                 onChange={handleChange}
//                 placeholder="Enter your phone number"
//                 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               />
//             </div>

//             {/* Company Address */}
//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Company Address<span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 name="company_address"
//                 value={formData.company_address}
//                 onChange={handleChange}
//                 placeholder="Include the city, state and country"
//                 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               />
//             </div>

//             {/* Account Administrator Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Account Administrator<span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="account_administrator_name"
//                 value={formData.account_administrator_name}
//                 onChange={handleChange}
//                 placeholder="Enter account administrator's full name"
//                 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               />
//             </div>

//             {/* Account Administrator Role */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Account Administrator's Role<span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="account_administrator_role"
//                 value={formData.account_administrator_role}
//                 onChange={handleChange}
//                 placeholder="Enter account administrator's role in the company"
//                 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Password<span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type={passwordVisible ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter your password"
//                   className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setPasswordVisible(!passwordVisible)}
//                   className="absolute right-3 top-2 text-gray-500"
//                 >
//                   {passwordVisible ? "🙈" : "👁️"}
//                 </button>
//               </div>
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Confirm Password<span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type={confirmPasswordVisible ? "text" : "password"}
//                   name="confirm_password"
//                   value={formData.confirm_password}
//                   onChange={handleChange}
//                   placeholder="Confirm your password"
//                   className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
//                   className="absolute right-3 top-2 text-gray-500"
//                 >
//                   {confirmPasswordVisible ? "🙈" : "👁️"}
//                 </button>
//               </div>
//             </div>

//             {/* Password Hint */}
//             <div className="col-span-2">
//               <p className="text-sm text-gray-600">
//                 Include capital letters, small letters, and other characters.
//               </p>
//             </div>

//             {/* Loading or Error State */}
//             {loading && (
//               <div className="col-span-2">
//                 <p className="text-gray-600">Loading...</p>
//               </div>
//             )}
//             {error && (
//               <div className="col-span-2">
//                 <p className="text-red-500">{error}</p>
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="col-span-2 flex justify-end space-x-4 mt-2">
//               <button
//                 type="submit"
//                 className={`px-6 py-2 font-medium rounded focus:outline-none ${
//                   loading
//                     ? "bg-gray-400 text-white cursor-not-allowed"
//                     : "bg-yellow-500 text-white hover:bg-yellow-600"
//                 }`}
//                 disabled={loading}
//               >
//                 Sign Up
//               </button>
//               <Link
//                 href="/signin"
//                 className="px-6 py-2 font-medium rounded border border-yellow-500 text-yellow-500 hover:bg-yellow-100 focus:outline-none"
//               >
//                 Sign In
//               </Link>
//             </div>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";

export default function SignUpCompany() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    organization_name: "",
    company_address: "",
    account_administrator_name: "",
    account_administrator_role: "",
    user_type: "organization",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "confirm_password") {
      if (value !== formData.password) {
        setError("Passwords do not match.");
      } else {
        setError("");
      }
    } else if (name === "password" && formData.confirm_password) {
      if (formData.confirm_password !== value) {
        setError("Passwords do not match.");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Trim all inputs to prevent spaces
    const trimmedData = {
      email: formData.email.trim(),
      password: formData.password.trim(),
      confirm_password: formData.confirm_password.trim(),
      phone_number: formData.phone_number.trim(),
      organization_name: formData.organization_name.trim(),
      company_address: formData.company_address.trim(),
      account_administrator_name: formData.account_administrator_name.trim(),
      account_administrator_role: formData.account_administrator_role.trim(),
      user_type: formData.user_type,
    };

    if (trimmedData.password !== trimmedData.confirm_password) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!trimmedData.organization_name || !trimmedData.company_address || 
        !trimmedData.account_administrator_name || !trimmedData.account_administrator_role) {
      setError("All company fields are required.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        email: trimmedData.email,
        password: trimmedData.password,
        phone_number: trimmedData.phone_number,
        organization_name: trimmedData.organization_name,
        company_address: trimmedData.company_address,
        account_administrator_name: trimmedData.account_administrator_name,
        account_administrator_role: trimmedData.account_administrator_role,
        user_type: trimmedData.user_type,
      };
      const response = await axios.post(`${backendUrl}/api/accounts/register/`, payload);
      const { token } = response.data;
      await login(token);
      setSuccess("Signup successful! Please check your email to verify your account.");
      setTimeout(() => router.push('/signup-success'), 3000);
    } catch (err: AxiosError | any) {
      let errorMessage = 'Signup failed. Please try again.';
      if (axios.isAxiosError(err)) {
        const errors = err.response?.data?.error;
        if (typeof errors === 'string') {
          errorMessage = errors;
        } else if (errors && typeof errors === 'object') {
          const errorDetails = Object.keys(errors)
            .map((key) => `${key}: ${errors[key].join(', ')}`)
            .join('; ');
          errorMessage = errorDetails || errorMessage;
        } else {
          errorMessage = err.message || errorMessage;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Create your account</h1>
          <div className="flex space-x-2 mb-6">
            <Link
              href="/signup/individual"
              className="px-3 py-1 rounded text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              For Individuals
            </Link>
            <Link
              href="/signup/company"
              className="px-3 py-1 rounded text-sm font-medium bg-yellow-500 text-white"
            >
              For Companies
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="col-span-2">
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

            <div>
              <label className="block Monitoring and logging the request payloadtext-sm font-medium text-gray-700 mb-1">
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
                  className="absolute right-3 top-2"
                >
                  <img
                    src="/icons/view.png"
                    alt="Toggle visibility"
                    className={`h-5 w-5 ${passwordVisible ? 'rotate-0' : 'rotate-90'}`}
                  />
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
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  className="absolute right-3 top-2"
                >
                  <img
                    src="/icons/view.png"
                    alt="Toggle visibility"
                    className={`h-5 w-5 ${confirmPasswordVisible ? 'rotate-0' : 'rotate-90'}`}
                  />
                </button>
              </div>
            </div>

            <div className="col-span-2">
              <p className="text-sm text-gray-600">
                Include capital letters, small letters, and other characters.
              </p>
            </div>

            {loading && (
              <div className="col-span-2">
                <p className="text-gray-600">Loading...</p>
              </div>
            )}
            {error && (
              <div className="col-span-2">
                <p className="text-red-500">{error}</p>
              </div>
            )}
            {success && (
              <div className="col-span-2">
                <p className="text-green-500">{success}</p>
              </div>
            )}

            <div className="col-span-2 flex justify-end space-x-4 mt-2">
              <button
                type="submit"
                className={`px-6 py-2 font-medium rounded focus:outline-none ${
                  loading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-yellow-500 text-white hover:bg-yellow-600"
                }`}
                disabled={loading}
              >
                Sign Up
              </button>
              <Link
                href="/signin"
                className="px-6 py-2 font-medium rounded border border-yellow-500 text-yellow-500 hover:bg-yellow-100 focus:outline-none"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}