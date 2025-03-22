"use client";

import { useState, FormEvent } from "react";

const categories: { [key: string]: string[] } = {
  branding: [
    "Vehicle branding",
    "Mugs",
    "T-shirts",
    "Water bottles",
    "Pens",
    "Keyholders",
    "Face caps",
    "Monogram",
    "Screen print",
    "UV direct print",
  ],
  printing: [
    "Flyers",
    "Jotters",
    "Programs",
    "Brochures",
    "Business cards",
    "ID cards",
    "Customized printing solutions",
  ],
  packaging: [
    "Boxes",
    "Food packs",
    "Pizza packs",
    "Platter packs",
    "Custom packaging solutions",
  ],
  publishing: [
    "Stationaries",
    "Journals",
    "Storybooks",
    "Novels",
    "Christian books",
    "Publishing codes",
  ],
};

export default function RequestQuotePage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setSubcategories([]); // Reset subcategories when category changes
  };

  const handleSubcategoryChange = (subcategory: string) => {
    if (subcategories.includes(subcategory)) {
      setSubcategories(subcategories.filter((item) => item !== subcategory));
    } else {
      setSubcategories([...subcategories, subcategory]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic validation
    if (!fullName || !email || !phoneNumber || !category || subcategories.length === 0) {
      setError("Please fill in all required fields and select at least one subcategory.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("category", category);
    formData.append("subcategories", JSON.stringify(subcategories));
    formData.append("additionalInfo", additionalInfo);
    if (file) formData.append("file", file);

    // Log form data (for now, since email isn’t implemented)
    console.log("Quote Request Data:", {
      fullName,
      email,
      phoneNumber,
      category,
      subcategories,
      additionalInfo,
      file: file ? file.name : null,
    });

    // Simulate email sending (to be implemented later)
    try {
      // Placeholder for email API call
      // await axios.post("/api/send-quote-email", formData);
      setSuccess("Quote request submitted successfully! An admin will contact you soon.");
      // Reset form
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setCategory("");
      setSubcategories([]);
      setAdditionalInfo("");
      setFile(null);
    } catch (err) {
      setError("Failed to submit quote request. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Request a Quote</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name*
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            {/* Email Address and Phone Number (Flexed) */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-mail Address*
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Select Category* (YOU CAN ONLY SELECT ONE CATEGORY AT A TIME)
              </label>
              <select
                id="category"
                value={category}
                onChange={handleCategoryChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              >
                <option value="">Select a category</option>
                <option value="branding">Branding</option>
                <option value="printing">Printing</option>
                <option value="packaging">Packaging</option>
                <option value="publishing">Publishing</option>
              </select>
            </div>

            {/* Subcategories */}
            {category && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Subcategories</label>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {categories[category].map((subcategory) => (
                    <label key={subcategory} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={subcategories.includes(subcategory)}
                        onChange={() => handleSubcategoryChange(subcategory)}
                        className="form-checkbox text-yellow-500"
                      />
                      <span>{subcategory}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Information */}
            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
                Additional Information*
              </label>
              <textarea
                id="additionalInfo"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                rows={4}
                required
              />
            </div>

            {/* Attach File */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Attach File (optional)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-yellow-500 hover:text-yellow-600"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">Supported Formats: PNG, JPG, DOCX (5MB)</p>
                  {file && <p className="text-sm text-gray-700 mt-2">Selected: {file.name}</p>}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}