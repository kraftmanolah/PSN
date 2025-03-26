

// // app/order/summary/page.tsx (full updated code)
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { CartItem } from "@/types/product";
// import Link from "next/link";
// import Image from "next/image";
// import axios from "axios";
// import Breadcrumbs from "@/app/components/Breadcrumbs";
// import Script from "next/script";

// export default function OrderSummaryPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
//   const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

//   const deliveryOption = searchParams.get("deliveryOption") as "pickup" | "delivery" | null;
//   const deliveryDetailsParam = searchParams.get("deliveryDetails");
//   const deliveryDetails = deliveryDetailsParam ? JSON.parse(deliveryDetailsParam) : null;
//   const cartItemsParam = searchParams.get("cartItems");
//   const cartItems: CartItem[] = cartItemsParam ? JSON.parse(cartItemsParam) : [];
//   const cartTotalParam = searchParams.get("cartTotal");
//   const cartTotal = cartTotalParam ? parseFloat(cartTotalParam) : 0;
//   const orderIdFromQuery = searchParams.get("orderId");
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);
//   const [orderId, setOrderId] = useState<number | null>(orderIdFromQuery ? parseInt(orderIdFromQuery) : null);

//   useEffect(() => {
//     if (!token) {
//       setErrorMsg("Please log in to confirm your order.");
//       router.push("/signin");
//     }
//     if (!deliveryOption) {
//       setErrorMsg("No delivery option specified. Please return to the cart page.");
//     }
//     if (deliveryOption === "delivery" && (!deliveryDetails?.address || !deliveryDetails?.city || !deliveryDetails?.state)) {
//       setErrorMsg("Delivery details are incomplete. Please return to the cart page to fill them out.");
//     }
//   }, [token, deliveryOption, deliveryDetails, router]);

//   const handleCreateOrder = async () => {
//     if (!cartItems.length || !token) {
//       setErrorMsg(!cartItems.length ? "Your cart is empty." : "Please log in to proceed to payment.");
//       return null;
//     }
//     if (deliveryOption === "delivery" && (!deliveryDetails?.address || !deliveryDetails?.city || !deliveryDetails?.state)) {
//       setErrorMsg("Delivery details are incomplete. Please return to the cart page.");
//       return null;
//     }

//     const formData = new FormData();
//     formData.append("delivery_option", deliveryOption || "pickup");
//     if (deliveryOption === "delivery" && deliveryDetails) {
//       formData.append("delivery_address", deliveryDetails.address);
//       formData.append("delivery_city", deliveryDetails.city);
//       formData.append("delivery_state", deliveryDetails.state);
//       formData.append("delivery_postcode", deliveryDetails.postcode || "");
//     }

//     try {
//       const response = await axios.post(`${backendUrl}/api/orders/create_from_cart/`, formData, {
//         headers: { Authorization: `Token ${token}` },
//       });
//       if (response.status === 201) {
//         setOrderId(response.data.id);
//         return response.data.id;
//       }
//       return null;
//     } catch (err) {
//       setErrorMsg(err instanceof Error ? err.message : "An unexpected error occurred");
//       return null;
//     }
//   };

//   const handleProceedToPayment = async () => {
//     const id = orderId || (await handleCreateOrder());
//     if (!id) return;

//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/orders/${id}/initialize_payment/`,
//         {},
//         { headers: { Authorization: `Token ${token}` } }
//       );
//       const { authorization_url, reference } = response.data.data;

//       const handler = (window as any).PaystackPop.setup({
//         key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_your_public_key_here", // Add to .env.local
//         email: localStorage.getItem("email") || "user@example.com", // Ideally fetch from user profile
//         amount: cartTotal * 100, // Convert to kobo
//         currency: "NGN",
//         ref: reference,
//         callback: async (response: any) => {
//           const verifyResponse = await axios.post(
//             `${backendUrl}/api/orders/${id}/verify_payment/`,
//             { reference: response.reference },
//             { headers: { Authorization: `Token ${token}` } }
//           );
//           if (verifyResponse.data.status === "Payment verified") {
//             localStorage.removeItem("deliveryDetails");
//             router.push("/profile"); // Redirect to profile or success page
//           } else {
//             setErrorMsg("Payment verification failed.");
//           }
//         },
//         onClose: () => {
//           setErrorMsg("Payment window closed.");
//         },
//       });
//       handler.openIframe();
//     } catch (err) {
//       setErrorMsg("Failed to initialize payment.");
//     }
//   };

//   const calculatedSubtotal = cartItems.reduce((sum: number, item: CartItem) => {
//     const itemTotal = typeof item.item_total === "string" ? parseFloat(item.item_total) : item.item_total;
//     return sum + (itemTotal || 0);
//   }, 0) || 0;

//   const subtotal = calculatedSubtotal > 0 && !isNaN(calculatedSubtotal) ? calculatedSubtotal : cartTotal;
//   const total = subtotal; // No fixed delivery fee added

//   if (errorMsg) return <div className="p-4 text-red-500">{errorMsg}</div>;
//   if (!deliveryOption) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Script src="https://js.paystack.co/v1/inline.js" />
//       <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16 py-6 sm:py-8">
//         <div className="mx-0">
//           <Breadcrumbs />
//         </div>
//         <div className="w-full">
//           <h1 className="text-xl sm:text-2xl font-bold mb-4">Confirm Order & Delivery Details</h1>
//           <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4">
//             <h2 className="text-lg sm:text-xl font-bold mb-2">Order Details</h2>
//             <ul>
//               {cartItems.map((item: CartItem) => {
//                 const itemTotal = typeof item.item_total === "string" ? parseFloat(item.item_total) : item.item_total;
//                 const quantity = typeof item.quantity === "number" ? item.quantity : 1;

//                 return (
//                   <li key={item.id} className="mb-4 border-b pb-2">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//                       <div className="flex-1">
//                         <p>
//                           <strong>Item:</strong> {item.product.name} {item.color && `(${item.color})`}
//                         </p>
//                         <p>
//                           <strong>Quantity:</strong> {quantity}
//                         </p>
//                         <p>
//                           <strong>Price:</strong> ₦{itemTotal.toLocaleString()}
//                         </p>
//                       </div>
//                       {item.design_file && (
//                         <div className="mt-2 sm:mt-0">
//                           <strong>Design File:</strong>
//                           {item.design_file.endsWith(".pdf") ? (
//                             <a href={item.design_file} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-2">
//                               View PDF
//                             </a>
//                           ) : (
//                             <Image
//                               src={item.design_file}
//                               alt={`${item.product.name} design`}
//                               width={100}
//                               height={100}
//                               className="mt-2 rounded object-cover"
//                               onError={() => console.warn(`Failed to load design file for ${item.product.name}`)}
//                             />
//                           )}
//                         </div>
//                       )}
//                     </div>
//                     {item.additional_info && (
//                       <div className="mt-2 text-sm text-gray-600">
//                         <strong>Additional Info:</strong> {item.additional_info}
//                       </div>
//                     )}
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//           <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4">
//             <h2 className="text-lg sm:text-xl font-bold mb-2">Preferred Delivery Option</h2>
//             <p>{deliveryOption === "pickup" ? "Pick Up" : "Deliver to Address"}</p>
//             {deliveryOption === "delivery" && deliveryDetails && (
//               <div className="mt-4">
//                 <h2 className="text-base sm:text-lg font-bold mb-2">Delivery Address</h2>
//                 <p>{deliveryDetails.address}</p>
//                 <p>{deliveryDetails.city}, {deliveryDetails.state}</p>
//                 {deliveryDetails.postcode && <p>Postcode: {deliveryDetails.postcode}</p>}
//                 <p className="text-red-500 text-sm mt-2">
//                   Note: Delivery price varies nationwide and will be communicated to you after your order.
//                 </p>
//               </div>
//             )}
//           </div>
//           <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4">
//             <div className="flex justify-between mb-2">
//               <p className="text-base sm:text-lg font-medium">Subtotal:</p>
//               <p className="text-base sm:text-lg">₦{subtotal.toLocaleString()}</p>
//             </div>
//             <div className="flex justify-between mb-2">
//               <p className="text-base sm:text-lg font-medium">Delivery Fee:</p>
//               <p className="text-base sm:text-lg">₦0</p>
//             </div>
//             <div className="flex justify-between">
//               <p className="text-base sm:text-lg font-bold">Total:</p>
//               <p className="text-lg sm:text-xl font-bold">₦{total.toLocaleString()}</p>
//             </div>
//             <button
//               onClick={handleProceedToPayment}
//               className="w-full mt-4 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 text-sm sm:text-base"
//             >
//               Proceed to Payment
//             </button>
//           </div>
//           <Link href="/cart" className="text-yellow-500 inline-block hover:text-yellow-600 text-sm sm:text-base">
//             <span className="mr-2">⟵</span> Back to Cart
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CartItem } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Script from "next/script";

export default function OrderSummaryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const deliveryOption = searchParams.get("deliveryOption") as "pickup" | "delivery" | null;
  const deliveryDetailsParam = searchParams.get("deliveryDetails");
  const deliveryDetails = deliveryDetailsParam ? JSON.parse(deliveryDetailsParam) : null;
  const cartItemsParam = searchParams.get("cartItems");
  const cartItems: CartItem[] = cartItemsParam ? JSON.parse(cartItemsParam) : [];
  const cartTotalParam = searchParams.get("cartTotal");
  const cartTotal = cartTotalParam ? parseFloat(cartTotalParam) : 0;
  const orderIdFromQuery = searchParams.get("orderId");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<number | null>(orderIdFromQuery ? parseInt(orderIdFromQuery) : null);

  useEffect(() => {
    if (!token) {
      setErrorMsg("Please log in to confirm your order.");
      router.push("/signin");
    }
    if (!deliveryOption) {
      setErrorMsg("No delivery option specified. Please return to the cart page.");
    }
    if (deliveryOption === "delivery" && (!deliveryDetails?.address || !deliveryDetails?.city || !deliveryDetails?.state)) {
      setErrorMsg("Delivery details are incomplete. Please return to the cart page to fill them out.");
    }
  }, [token, deliveryOption, deliveryDetails, router]);

  const handleCreateOrder = async () => {
    if (!cartItems.length || !token) {
      setErrorMsg(!cartItems.length ? "Your cart is empty." : "Please log in to proceed to payment.");
      return null;
    }
    if (deliveryOption === "delivery" && (!deliveryDetails?.address || !deliveryDetails?.city || !deliveryDetails?.state)) {
      setErrorMsg("Delivery details are incomplete. Please return to the cart page.");
      return null;
    }

    const formData = new FormData();
    formData.append("delivery_option", deliveryOption || "pickup");
    if (deliveryOption === "delivery" && deliveryDetails) {
      formData.append("delivery_address", deliveryDetails.address);
      formData.append("delivery_city", deliveryDetails.city);
      formData.append("delivery_state", deliveryDetails.state);
      formData.append("delivery_postcode", deliveryDetails.postcode || "");
    }

    try {
      const response = await axios.post(`${backendUrl}/api/orders/create_from_cart/`, formData, {
        headers: { Authorization: `Token ${token}` },
      });
      if (response.status === 201) {
        setOrderId(response.data.id);
        return response.data.id;
      }
      return null;
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "An unexpected error occurred");
      return null;
    }
  };

  const handleProceedToPayment = async () => {
    const id = orderId || (await handleCreateOrder());
    if (!id) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/orders/${id}/initialize_payment/`,
        {},
        { headers: { Authorization: `Token ${token}` } }
      );
      const { authorization_url, reference } = response.data.data;

      const handler = (window as any).PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_your_public_key_here", // Replace with your test public key
        email: localStorage.getItem("email") || "user@example.com", // Fetch from user profile if possible
        amount: cartTotal * 100, // Paystack expects amount in kobo (NGN smallest unit)
        currency: "NGN",
        ref: reference, // Unique reference from your backend
        callback: async (response: any) => {
          try {
            const verifyResponse = await axios.post(
              `${backendUrl}/api/orders/${id}/verify_payment/`,
              { reference: response.reference },
              { headers: { Authorization: `Token ${token}` } }
            );
            if (verifyResponse.data.status === "Payment verified") {
              localStorage.removeItem("deliveryDetails"); // Clear delivery details post-payment
              router.push("/profile"); // Redirect to profile or success page
            } else {
              setErrorMsg("Payment verification failed.");
            }
          } catch (err) {
            setErrorMsg("Error verifying payment.");
          }
        },
        onClose: () => {
          setErrorMsg("Payment window closed. Please try again.");
        },
      });
      handler.openIframe();
    } catch (err) {
      setErrorMsg("Failed to initialize payment. Please try again.");
      console.error(err);
    }
  };

  const calculatedSubtotal = cartItems.reduce((sum: number, item: CartItem) => {
    const itemTotal = typeof item.item_total === "string" ? parseFloat(item.item_total) : item.item_total;
    return sum + (itemTotal || 0);
  }, 0) || 0;

  const subtotal = calculatedSubtotal > 0 && !isNaN(calculatedSubtotal) ? calculatedSubtotal : cartTotal;
  const total = subtotal; // No delivery fee added yet

  if (errorMsg) return <div className="p-4 text-red-500">{errorMsg}</div>;
  if (!deliveryOption) return <div className="p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Script src="https://js.paystack.co/v1/inline.js" strategy="afterInteractive" />
      <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16 py-6 sm:py-8">
        <div className="mx-0">
          <Breadcrumbs />
        </div>
        <div className="w-full">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">Confirm Order & Delivery Details</h1>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4">
            <h2 className="text-lg sm:text-xl font-bold mb-2">Order Details</h2>
            <ul>
              {cartItems.map((item: CartItem) => {
                const itemTotal = typeof item.item_total === "string" ? parseFloat(item.item_total) : item.item_total;
                const quantity = typeof item.quantity === "number" ? item.quantity : 1;

                return (
                  <li key={item.id} className="mb-4 border-b pb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex-1">
                        <p>
                          <strong>Item:</strong> {item.product.name} {item.color && `(${item.color})`}
                        </p>
                        <p>
                          <strong>Quantity:</strong> {quantity}
                        </p>
                        <p>
                          <strong>Price:</strong> ₦{itemTotal.toLocaleString()}
                        </p>
                      </div>
                      {item.design_file && (
                        <div className="mt-2 sm:mt-0">
                          <strong>Design File:</strong>
                          {item.design_file.endsWith(".pdf") ? (
                            <a href={item.design_file} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-2">
                              View PDF
                            </a>
                          ) : (
                            <Image
                              src={item.design_file}
                              alt={`${item.product.name} design`}
                              width={100}
                              height={100}
                              className="mt-2 rounded object-cover"
                              onError={() => console.warn(`Failed to load design file for ${item.product.name}`)}
                            />
                          )}
                        </div>
                      )}
                    </div>
                    {item.additional_info && (
                      <div className="mt-2 text-sm text-gray-600">
                        <strong>Additional Info:</strong> {item.additional_info}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4">
            <h2 className="text-lg sm:text-xl font-bold mb-2">Preferred Delivery Option</h2>
            <p>{deliveryOption === "pickup" ? "Pick Up" : "Deliver to Address"}</p>
            {deliveryOption === "delivery" && deliveryDetails && (
              <div className="mt-4">
                <h2 className="text-base sm:text-lg font-bold mb-2">Delivery Address</h2>
                <p>{deliveryDetails.address}</p>
                <p>{deliveryDetails.city}, {deliveryDetails.state}</p>
                {deliveryDetails.postcode && <p>Postcode: {deliveryDetails.postcode}</p>}
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
            <button
              onClick={handleProceedToPayment}
              className="w-full mt-4 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 text-sm sm:text-base"
            >
              Proceed to Payment
            </button>
          </div>
          <Link href="/cart" className="text-yellow-500 inline-block hover:text-yellow-600 text-sm sm:text-base">
            <span className="mr-2">⟵</span> Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}