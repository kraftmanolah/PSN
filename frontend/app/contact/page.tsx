

// app/contact/page.tsx
"use client";
import Image from "next/image";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ email: "", phone: "", message: "" });
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatus("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen lg:h-[675px] max-w-[1268.1px] ml-0">
      {/* Left Section - Image */}
      <div className="w-full lg:w-[720px] h-[675px] relative">
        <Image
          src="/images/contact-1.png"
          alt="Printing Press"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>

      {/* Spacer between Image and Form */}
      <div className="lg:w-3"></div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-[548.1px] bg-white flex flex-col justify-center items-center lg:ml-6">
        {/* Form Section with Fixed Dimensions and Centered Vertically */}
        <div className="w-[548.1px] h-[675px] bg-white flex flex-col justify-center items-center py-8 px-6">
          {/* Content Wrapper - Ensures consistent width for all elements */}
          <div className="w-full max-w-[548.1px]">
            {/* Logo - Aligned to the Left */}
            <div className="mb-4">
              <Image
                src="/images/logo.png" // Placeholder logo; replace with your actual logo
                alt="PrintShop Naija Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>

            {/* Heading and Subheading - Centered within the same width */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                Get In Touch With PrintShop Naija
              </h2>
              <p className="text-gray-600">
                Have questions or need assistance? We’re here to help! Reach out to us for inquiries, orders, or support.
              </p>
            </div>

            {/* Form - Aligned Fields */}
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  E-mail Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your company’s E-mail address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-50"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone Number Field */}
              <div className="mb-3">
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Phone Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-100 text-gray-700">
                    +234
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="__________"
                    className="w-full px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-50"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Reason for Contacting */}
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Reason for Contacting Us
                </label>
                <textarea
                  id="message"
                  placeholder="State your reason for contacting us...."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 h-24 resize-none bg-gray-50"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition-colors"
              >
                Submit
              </button>
              {status && <p className="mt-3 text-center text-gray-600">{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}