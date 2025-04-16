"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { OrderItem } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { useAuth } from "@/app/hooks/useAuth";

export default function OrderViewPage() {
  const { token, user, loading } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const orderIdFromQuery = searchParams.get("orderId");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [orderDeliveryOption, setOrderDeliveryOption] = useState<"pickup" | "delivery" | null>(null);
  const [orderDeliveryDetails, setOrderDeliveryDetails] = useState<{
    address?: string;
    city?: string;
    state?: string;
    postcode?: string | null;
  } | null>(null);
  const [orderTotal, setOrderTotal] = useState<number>(0);

  useEffect(() => {
    if (loading) return;
    if (!token) {
      setErrorMsg("Please log in to view your order.");
      router.push("/signin");
    }

    const fetchOrder = async () => {
      if (orderIdFromQuery && token) {
        try {
          const response = await axios.get(`${backendUrl}/api/orders/${orderIdFromQuery}/`, {
            headers: { Authorization: `Token ${token}` },
          });
          if (response.status === 200) {
            const orderData = response.data;
            setOrderItems(orderData.items);
            setOrderDeliveryOption(orderData.delivery_option);
            setOrderDeliveryDetails(orderData.delivery || null);
            setOrderTotal(orderData.total_amount);
          }
        } catch (err) {
          setErrorMsg("Failed to fetch order details.");
          console.error(err);
        }
      }
    };

    fetchOrder();
  }, [token, loading, orderIdFromQuery, router]);

  const calculatedSubtotal = orderItems.reduce((sum: number, item: OrderItem) => {
    return sum + (parseFloat(item.price.toString()) * item.quantity);
  }, 0) || 0;

  const subtotal = orderItems.length > 0 && orderTotal > 0 ? orderTotal : (calculatedSubtotal > 0 && !isNaN(calculatedSubtotal) ? calculatedSubtotal : 0);
  const total = subtotal;

  if (loading) return <div className="p-4">Loading...</div>;
  if (errorMsg) return <div className="p-4 text-red-500">{errorMsg}</div>;
  if (!orderIdFromQuery) return <div className="p-4">No order selected.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16 py-6 sm:py-8">
        <div className="mx-0">
          <Breadcrumbs />
        </div>
        <div className="w-full">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">Order Summary</h1>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4">
            <h2 className="text-lg sm:text-xl font-bold mb-2">Order Details</h2>
            <ul>
              {orderItems.map((item: OrderItem) => {
                const itemTotal = parseFloat(item.price.toString()) * item.quantity;
                const quantity = item.quantity;
                const designFile = item.design_file;
                const additionalInfo = item.additional_info;
                const color = item.color;

                return (
                  <li key={item.id.toString()} className="mb-4 border-b pb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex-1">
                        <p>
                          <strong>Item:</strong> {item.product.name} {color && `(${color})`}
                        </p>
                        <p>
                          <strong>Quantity:</strong> {quantity}
                        </p>
                        <p>
                          <strong>Price:</strong> ₦{itemTotal.toLocaleString()}
                        </p>
                      </div>
                      {designFile && (
                        <div className="mt-2 sm:mt-0">
                          <strong>Design File:</strong>
                          {typeof designFile === "string" && designFile.endsWith(".pdf") ? (
                            <a href={designFile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-2">
                              View PDF
                            </a>
                          ) : typeof designFile === "string" ? (
                            <Image
                              src={designFile}
                              alt={`${item.product.name} design`}
                              width={100}
                              height={100}
                              className="mt-2 rounded object-cover"
                              onError={() => console.warn(`Failed to load design file for ${item.product.name}`)}
                            />
                          ) : null}
                        </div>
                      )}
                    </div>
                    {additionalInfo && (
                      <div className="mt-2 text-sm text-gray-600">
                        <strong>Additional Info:</strong> {additionalInfo}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4">
            <h2 className="text-lg sm:text-xl font-bold mb-2">Preferred Delivery Option</h2>
            <p>{orderDeliveryOption === "pickup" ? "Pick Up" : "Deliver to Address"}</p>
            {orderDeliveryOption === "delivery" && orderDeliveryDetails && (
              <div className="mt-4">
                <h2 className="text-base sm:text-lg font-bold mb-2">Delivery Address</h2>
                <p>{orderDeliveryDetails.address || "N/A"}</p>
                <p>{orderDeliveryDetails.city || "N/A"}, {orderDeliveryDetails.state || "N/A"}</p>
                {orderDeliveryDetails.postcode && <p>Postcode: {orderDeliveryDetails.postcode}</p>}
                <p className="text-red-500 text-sm mt-2">
                  Note: Delivery price varies nationwide and will be communicated to you after your order.
                </p>
              </div>
            )}
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4">
            <div className="flex justify-between mb-2">
              <p className="text-base sm:text-lg font-medium">Subtotal:</p>
              <p className="text-base sm:text-lg">₦{subtotal.toLocaleString()}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-base sm:text-lg font-medium">Delivery Fee:</p>
              <p className="text-base sm:text-lg">₦0</p>
            </div>
            <div className="flex justify-between">
              <p className="text-base sm:text-lg font-bold">Total:</p>
              <p className="text-lg sm:text-xl font-bold">₦{total.toLocaleString()}</p>
            </div>
          </div>
          <Link href="/profile" className="text-yellow-500 inline-block hover:text-yellow-600 text-sm sm:text-base">
            <span className="mr-2">⟵</span> Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
}