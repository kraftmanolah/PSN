"use client";

import React, { useState } from "react";
import { Delivery } from "@/types/product";

interface DeliveryFormProps {
  onSave: (details: Delivery) => void;
  initialDetails?: Partial<Delivery>;  // Allow partial initial data
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({ onSave, initialDetails }) => {
  const [details, setDetails] = useState<Delivery>({
    address: initialDetails?.address || "",
    city: initialDetails?.city || "",
    state: initialDetails?.state || "",
    postcode: initialDetails?.postcode || null,  // Ensure null is handled
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value || (name === 'postcode' ? null : ""),  // Handle null for postcode
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.address || !details.city || !details.state) {
      setError("Delivery Address, City, and State are required.");
      return;
    }
    setError(null);
    onSave(details);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-100 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Enter Delivery Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-red-500 mb-2">Delivery Address*</label>
          <input
            type="text"
            name="address"
            value={details.address || ""}  // Handle null with empty string
            onChange={handleChange}
            placeholder="Enter your address for delivery"
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-red-500 mb-2">City*</label>
          <input
            type="text"
            name="city"
            value={details.city || ""}  // Handle null with empty string
            onChange={handleChange}
            placeholder="Enter your city"
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="flex gap-4">
          <div className="w-2/3">
            <label className="block text-red-500 mb-2">State*</label>
            <input
              type="text"
              name="state"
              value={details.state || ""}  // Handle null with empty string
              onChange={handleChange}
              placeholder="Enter your state"
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-500 mb-2">Postcode (optional)</label>
            <input
              type="text"
              name="postcode"
              value={details.postcode || ""}  // Handle null with empty string
              onChange={handleChange}
              placeholder="Enter your postcode"
              className="w-full border rounded p-2"
            />
          </div>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <button type="submit" className="w-full bg-yellow-500 text-white p-2 rounded mt-4 hover:bg-yellow-600">
          Save
        </button>
      </form>
    </div>
  );
};

export default DeliveryForm;