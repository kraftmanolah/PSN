"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DeliveryForm from "@/app/components/DeliveryForm";
import { Delivery } from "@/types/product";

export default function DeliveryDetailsPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSave = (details: Delivery) => {
    setError(null);
    // Save to local state or backend (for now, use state)
    router.push('/order/summary');
  };

  return (
    <div className="p-4">
      <DeliveryForm onSave={handleSave} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}