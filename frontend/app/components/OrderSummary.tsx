"use client";

import React from "react";
import { Cart, Order } from "@/types/product";

interface OrderSummaryProps {
    cart: Cart | null;
    order: Order | null;
    deliveryOption: 'pickup' | 'delivery';
    onProceed: () => void;
    deliveryDetails?: {  // Make optional with '?'
      address: string;
      city: string;
      state: string;
      postcode: string | null;
    } | null | undefined;
  }

const OrderSummary: React.FC<OrderSummaryProps> = ({ cart, order, deliveryOption, onProceed, deliveryDetails }) => {
  const total = cart?.total || order?.total_amount || 0;
  const itemCount = cart?.item_count || (order?.items.length || 0);
  const deliveryFee = deliveryOption === 'delivery' ? 2500 : 0; // ₦2,500 delivery fee
  const grandTotal = total;

  return (
    <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Order Summary</h2>
      <p>Items ({itemCount})</p>
      {deliveryOption === 'delivery' && deliveryDetails && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">Delivery Address:</p>
          <p>{deliveryDetails.address}</p>
          <p>{deliveryDetails.city}, {deliveryDetails.state}</p>
          {deliveryDetails.postcode && <p>Postcode: {deliveryDetails.postcode}</p>}
        </div>
      )}
      <div className="mt-4">
        <label className="block mb-2">
          <input
            type="radio"
            name="delivery"
            value="pickup"
            checked={deliveryOption === 'pickup'}
            onChange={() => {}}
            disabled
            className="mr-2"
          />
          Pick Up
        </label>
        <label className="block">
          <input
            type="radio"
            name="delivery"
            value="delivery"
            checked={deliveryOption === 'delivery'}
            onChange={() => {}}
            disabled
            className="mr-2"
          />
          Deliver to Address
        </label>
      </div>
      <p className="mt-4 font-bold">Total: ₦{total.toLocaleString()}</p>
      {deliveryOption === 'delivery' && (
        <>
          <p className="mt-2">Subtotal: ₦{total.toLocaleString()}</p>
          <p className="mt-2">Delivery Fee: ₦{deliveryFee.toLocaleString()}</p>
          <p className="mt-2 font-bold">Grand Total: ₦{grandTotal.toLocaleString()}</p>
        </>
      )}
      <button
        onClick={onProceed}
        className="w-full bg-yellow-500 text-white p-2 rounded mt-4 hover:bg-yellow-600"
        disabled={!cart?.items.length && !order?.items.length}
      >
        Proceed to payment
      </button>
    </div>
  );
};

export default OrderSummary;