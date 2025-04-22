// "use client";

// import { useState, useEffect, FormEvent } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { CartItem, OrderItem } from "@/types/product";
// import Link from "next/link";
// import Image from "next/image";
// import axios from "axios";
// import Breadcrumbs from "@/app/components/Breadcrumbs";
// import { useAuth } from "@/app/hooks/useAuth";

// // Skeleton Loader Component
// const OrderSummarySkeleton = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16 py-6 sm:py-8 animate-pulse">
//       <div className="mx-0">
//         <Breadcrumbs />
//       </div>
//       <div className="w-full">
//         <div className="h-8 w-1/3 bg-gray-300 rounded mb-4"></div>
//         {/* Order Details Section */}
//         <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4">
//           <div className="h-6 w-1/4 bg-gray-300 rounded mb-2"></div>
//           <ul className="space-y-4">
//             {Array(2).fill(0).map((_, index) => (
//               <li key={index} className="border-b pb-2">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//                   <div className="flex-1 space-y-2">
//                     <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
//                     <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
//                     <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
//                   </div>
//                   <div className="w-24 h-24 bg-gray-300 rounded mt-2 sm:mt-0"></div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//         {/* Delivery Option Section */}
//         <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4">
//           <div className="h-6 w-1/4 bg-gray-300 rounded mb-2"></div>
//           <div className="h-4 w-1/3 bg-gray-300 rounded mb-2"></div>
//           <div className="space-y-2 mt-4">
//             <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
//             <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
//             <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
//           </div>
//         </div>
//         {/* Total Section */}
//         <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4">
//           <div className="flex justify-between mb-2">
//             <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
//             <div className="h-4 w-1/6 bg-gray-300 rounded"></div>
//           </div>
//           <div className="flex justify-between mb-2">
//             <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
//             <div className="h-4 w-1/6 bg-gray-300 rounded"></div>
//           </div>
//           <div className="flex justify-between">
//             <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
//             <div className="h-4 w-1/6 bg-gray-300 rounded"></div>
//           </div>
//           <div className="mt-4 flex items-center space-x-2">
//             <div className="w-4 h-4 bg-gray-300 rounded"></div>
//             <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
//           </div>
//           <div className="h-12 w-[380px] bg-gray-300 rounded mt-4 mx-auto"></div>
//         </div>
//         <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
//       </div>
//     </div>
//   </div>
// );

// export default function OrderSummaryPage() {
//   const { token, user, loading } = useAuth();
//   const searchParams = useSearchParams();
//   const router = useRouter();
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
//   const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
//   const [orderDeliveryOption, setOrderDeliveryOption] = useState<"pickup" | "delivery" | null>(null);
//   const [orderDeliveryDetails, setOrderDeliveryDetails] = useState<{
//     address?: string;
//     city?: string;
//     state?: string;
//     postcode?: string | null;
//   } | null>(null);
//   const [orderTotal, setOrderTotal] = useState<number>(0);
//   const [scriptLoaded, setScriptLoaded] = useState(false);
//   const [termsAccepted, setTermsAccepted] = useState(false);

//   useEffect(() => {
//     if (loading) return;
//     if (!token) {
//       setErrorMsg("Please log in to confirm your order.");
//       router.push("/signin");
//     }

//     const fetchPendingOrder = async () => {
//       if (orderIdFromQuery && token) {
//         try {
//           const response = await axios.get(`${backendUrl}/api/orders/${orderIdFromQuery}/`, {
//             headers: { Authorization: `Token ${token}` },
//           });
//           if (response.status === 200) {
//             const orderData = response.data;
//             setOrderItems(orderData.items);
//             setOrderDeliveryOption(orderData.delivery_option);
//             setOrderDeliveryDetails(orderData.delivery || null);
//             setOrderTotal(orderData.total_amount);
//             setOrderId(orderData.id);
//           }
//         } catch (err) {
//           setErrorMsg("Failed to fetch order details.");
//           console.error(err);
//         }
//       }
//     };

//     fetchPendingOrder();
//   }, [token, loading, orderIdFromQuery, router, backendUrl]);

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

//   const handleProceedToPayment = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!termsAccepted) {
//       setErrorMsg("Please accept the Terms of Service to proceed.");
//       return;
//     }

//     if (!scriptLoaded) {
//       const script = document.createElement("script");
//       script.src = "https://js.paystack.co/v1/inline.js";
//       script.async = true;
//       script.onload = () => setScriptLoaded(true);
//       script.onerror = () => setErrorMsg("Failed to load Paystack script. Please try again.");
//       e.currentTarget.appendChild(script);
//     }

//     const id = orderId || (await handleCreateOrder());
//     if (!id) return;

//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/orders/${id}/initialize_payment/`,
//         {},
//         { headers: { Authorization: `Token ${token}` } }
//       );
//       const { authorization_url, reference } = response.data.data;

//       if (!window.PaystackPop) {
//         setErrorMsg("Paystack script not loaded yet. Please try again.");
//         return;
//       }

//       const verifyPayment = async (reference: string) => {
//         try {
//           const verifyResponse = await axios.post(
//             `${backendUrl}/api/orders/${id}/verify_payment/`,
//             { reference },
//             { headers: { Authorization: `Token ${token}` } }
//           );
//           if (verifyResponse.data.status === "Payment verified") {
//             localStorage.removeItem("deliveryDetails");
//             router.push("/profile");
//           } else {
//             setErrorMsg("Payment verification failed.");
//           }
//         } catch (err) {
//           setErrorMsg("Error verifying payment.");
//         }
//       };

//       const handler = window.PaystackPop.setup({
//         key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_your_public_key_here",
//         email: user?.email || localStorage.getItem("email") || "user@example.com",
//         amount: ((orderTotal > 0 ? orderTotal : cartTotal) * 100).toString(),
//         currency: "NGN",
//         ref: reference,
//         callback: (response: any) => {
//           verifyPayment(response.reference);
//         },
//         onClose: () => {
//           setErrorMsg("Payment window closed. Please try again.");
//         },
//       });
//       handler.openIframe();
//     } catch (err) {
//       setErrorMsg("Failed to initialize payment. Please try again.");
//       console.error(err);
//     }
//   };

//   const calculatedSubtotal = cartItems.reduce((sum: number, item: CartItem) => {
//     const itemTotal = typeof item.item_total === "string" ? parseFloat(item.item_total) : item.item_total || 0;
//     return sum + itemTotal;
//   }, 0) || 0;

//   const orderItemsSubtotal = orderItems.reduce((sum: number, item: OrderItem) => {
//     return sum + ((typeof item.price === "string" ? parseFloat(item.price) : item.price) * item.quantity);
//   }, 0) || 0;

//   const subtotal = orderItems.length > 0 ? orderItemsSubtotal : (calculatedSubtotal > 0 && !isNaN(calculatedSubtotal) ? calculatedSubtotal : cartTotal);
//   const total = subtotal;

//   if (loading) return <OrderSummarySkeleton />;
//   if (errorMsg) return <div className="p-4 text-red-500">{errorMsg}</div>;
//   if (!deliveryOption && !orderIdFromQuery) return <OrderSummarySkeleton />;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16 py-6 sm:py-8">
//         <div className="mx-0">
//           <Breadcrumbs />
//         </div>
//         <div className="w-full">
//           <h1 className="text-xl sm:text-2xl font-bold mb-4">Confirm Order & Delivery Details</h1>
//           <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4">
//             <h2 className="text-lg sm:text-xl font-bold mb-2">Order Details</h2>
//             <ul>
//               {(orderItems.length > 0 ? orderItems : cartItems).map((item: OrderItem | CartItem) => {
//                 const itemTotal = 'item_total' in item ? (typeof item.item_total === "string" ? parseFloat(item.item_total) : item.item_total || 0) : (typeof item.price === "string" ? parseFloat(item.price) : item.price) * item.quantity;
//                 const quantity = item.quantity;
//                 const designFile = 'design_file' in item ? item.design_file : undefined;
//                 const additionalInfo = 'additional_info' in item ? item.additional_info : undefined;
//                 const color = 'color' in item ? item.color : undefined;

//                 return (
//                   <li key={item.id.toString()} className="mb-4 border-b pb-2">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//                       <div className="flex-1">
//                         <p>
//                           <strong>Item:</strong> {item.product.name} {color && `(${color})`}
//                         </p>
//                         <p>
//                           <strong>Quantity:</strong> {quantity}
//                         </p>
//                         <p>
//                           <strong>Price:</strong> ₦{itemTotal.toLocaleString()}
//                         </p>
//                       </div>
//                       {designFile && (
//                         <div className="mt-2 sm:mt-0">
//                           <strong>Design File:</strong>
//                           {designFile.endsWith(".pdf") ? (
//                             <a href={designFile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-2">
//                               View PDF
//                             </a>
//                           ) : (
//                             <Image
//                               src={designFile}
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
//                     {additionalInfo && (
//                       <div className="mt-2 text-sm text-gray-600">
//                         <strong>Additional Info:</strong> {additionalInfo}
//                       </div>
//                     )}
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//           <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4">
//             <h2 className="text-lg sm:text-xl font-bold mb-2">Preferred Delivery Option</h2>
//             <p>{orderDeliveryOption || deliveryOption === "pickup" ? "Pick Up" : "Deliver to Address"}</p>
//             {(orderDeliveryOption === "delivery" || (deliveryOption === "delivery" && deliveryDetails)) && (
//               <div className="mt-4">
//                 <h2 className="text-base sm:text-lg font-bold mb-2">Delivery Address</h2>
//                 <p>{(orderDeliveryDetails?.address || deliveryDetails?.address) || ""}</p>
//                 <p>{(orderDeliveryDetails?.city || deliveryDetails?.city) || ""}, {(orderDeliveryDetails?.state || deliveryDetails?.state) || ""}</p>
//                 {(orderDeliveryDetails?.postcode || deliveryDetails?.postcode) && <p>Postcode: {(orderDeliveryDetails?.postcode || deliveryDetails?.postcode) || ""}</p>}
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
//             <form onSubmit={handleProceedToPayment}>
//               <div className="mt-4 flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   id="terms"
//                   checked={termsAccepted}
//                   onChange={(e) => setTermsAccepted(e.target.checked)}
//                   className="form-checkbox text-[#ECAA39] focus:ring-[#ECAA39] accent-[#ECAA39]"
//                 />
//                 <label htmlFor="terms" className="text-sm text-gray-600">
//                   I have read and agree to the{" "}
//                   <Link href="/terms-of-service" className="text-[#ECAA39] hover:underline">
//                     Terms of Service
//                   </Link>
//                 </label>
//               </div>
//               <button
//                 type="submit"
//                 disabled={!termsAccepted}
//                 className="w-full sm:w-[380px] h-[48px] mt-4 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed mx-auto block"
//               >
//                 Proceed to Payment
//               </button>
//             </form>
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

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CartItem, OrderItem } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { useAuth } from "@/app/hooks/useAuth";
import useSWR from "swr";

// Interface for user data (aligned with backend UserSerializer)
interface UserData {
  user_type: "individual" | "organization";
  company_address: string;
}

// Fetcher function for SWR
const fetcher = ([url, token]: [string, string | null]): Promise<any> =>
  fetch(url, {
    headers: token ? { Authorization: `Token ${token}` } : {},
  }).then((res) => {
    if (!res.ok) throw new Error(`Fetch failed with status: ${res.status}`);
    return res.json();
  });

// Skeleton Loader Component
const OrderSummarySkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16 py-6 sm:py-8 animate-pulse">
      <div className="mx-0">
        <Breadcrumbs />
      </div>
      <div className="w-full">
        <div className="h-8 w-1/3 bg-gray-300 rounded mb-4"></div>
        {/* Order Details Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4">
          <div className="h-6 w-1/4 bg-gray-300 rounded mb-2"></div>
          <ul className="space-y-4">
            {Array(2).fill(0).map((_, index) => (
              <li key={index} className="border-b pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                    <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
                    <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
                  </div>
                  <div className="w-24 h-24 bg-gray-300 rounded mt-2 sm:mt-0"></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Delivery Option Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4">
          <div className="h-6 w-1/4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-1/3 bg-gray-300 rounded mb-2"></div>
          <div className="space-y-2 mt-4">
            <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
          </div>
        </div>
        {/* Total Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4">
          <div className="flex justify-between mb-2">
            <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/6 bg-gray-300 rounded"></div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/6 bg-gray-300 rounded"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/6 bg-gray-300 rounded"></div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
          </div>
          <div className="h-12 w-[380px] bg-gray-300 rounded mt-4 mx-auto"></div>
        </div>
        <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);

export default function OrderSummaryPage() {
  const { token, user, loading } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
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
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [orderDeliveryOption, setOrderDeliveryOption] = useState<"pickup" | "delivery" | null>(null);
  const [orderDeliveryDetails, setOrderDeliveryDetails] = useState<{
    address?: string;
    city?: string;
    state?: string;
    postcode?: string | null;
  } | null>(null);
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Fetch user data to check user_type and company_address
  const { data: userData, error: userError } = useSWR<UserData, Error>(
    token ? [`${backendUrl}/api/accounts/user/`, token] : null,
    fetcher
  );

  useEffect(() => {
    if (loading) return;
    if (!token) {
      setErrorMsg("Please log in to confirm your order.");
      router.push("/signin");
    }

    const fetchPendingOrder = async () => {
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
            setOrderId(orderData.id);
          }
        } catch (err) {
          setErrorMsg("Failed to fetch order details.");
          console.error(err);
        }
      }
    };

    fetchPendingOrder();
  }, [token, loading, orderIdFromQuery, router, backendUrl]);

  const handleCreateOrder = async () => {
    if (!cartItems.length || !token) {
      setErrorMsg(!cartItems.length ? "Your cart is empty." : "Please log in to proceed to payment.");
      return null;
    }

    // Validate delivery details based on user_type
    if (deliveryOption === "delivery") {
      if (userData?.user_type === "individual") {
        if (!deliveryDetails?.address || !deliveryDetails?.city || !deliveryDetails?.state) {
          setErrorMsg("Delivery details are incomplete. Please return to the cart page.");
          return null;
        }
      } else if (userData?.user_type === "organization") {
        if (!userData.company_address) {
          setErrorMsg("Company address is missing. Please update it in your profile.");
          return null;
        }
      }
    }

    const formData = new FormData();
    formData.append("delivery_option", deliveryOption || "pickup");
    if (deliveryOption === "delivery") {
      if (userData?.user_type === "individual" && deliveryDetails) {
        formData.append("delivery_address", deliveryDetails.address);
        formData.append("delivery_city", deliveryDetails.city);
        formData.append("delivery_state", deliveryDetails.state);
        formData.append("delivery_postcode", deliveryDetails.postcode || "");
      } else if (userData?.user_type === "organization") {
        // Use company_address as delivery_address, set defaults for other fields
        formData.append("delivery_address", userData.company_address);
        formData.append("delivery_city", ""); // Backend allows empty
        formData.append("delivery_state", ""); // Backend allows empty
        formData.append("delivery_postcode", "");
      }
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

  const handleProceedToPayment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!termsAccepted) {
      setErrorMsg("Please accept the Terms of Service to proceed.");
      return;
    }

    if (!scriptLoaded) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => setErrorMsg("Failed to load Paystack script. Please try again.");
      e.currentTarget.appendChild(script);
    }

    const id = orderId || (await handleCreateOrder());
    if (!id) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/orders/${id}/initialize_payment/`,
        {},
        { headers: { Authorization: `Token ${token}` } }
      );
      const { authorization_url, reference } = response.data.data;

      if (!window.PaystackPop) {
        setErrorMsg("Paystack script not loaded yet. Please try again.");
        return;
      }

      const verifyPayment = async (reference: string) => {
        try {
          const verifyResponse = await axios.post(
            `${backendUrl}/api/orders/${id}/verify_payment/`,
            { reference },
            { headers: { Authorization: `Token ${token}` } }
          );
          if (verifyResponse.data.status === "Payment verified") {
            localStorage.removeItem("deliveryDetails");
            router.push("/profile");
          } else {
            setErrorMsg("Payment verification failed.");
          }
        } catch (err) {
          setErrorMsg("Error verifying payment.");
        }
      };

      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_your_public_key_here",
        email: user?.email || localStorage.getItem("email") || "user@example.com",
        amount: ((orderTotal > 0 ? orderTotal : cartTotal) * 100).toString(),
        currency: "NGN",
        ref: reference,
        callback: (response: any) => {
          verifyPayment(response.reference);
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
    const itemTotal = typeof item.item_total === "string" ? parseFloat(item.item_total) : item.item_total || 0;
    return sum + itemTotal;
  }, 0) || 0;

  const orderItemsSubtotal = orderItems.reduce((sum: number, item: OrderItem) => {
    return sum + ((typeof item.price === "string" ? parseFloat(item.price) : item.price) * item.quantity);
  }, 0) || 0;

  const subtotal = orderItems.length > 0 ? orderItemsSubtotal : (calculatedSubtotal > 0 && !isNaN(calculatedSubtotal) ? calculatedSubtotal : cartTotal);
  const total = subtotal;

  if (loading) return <OrderSummarySkeleton />;
  if (errorMsg) return <div className="p-4 text-red-500">{errorMsg}</div>;
  if (!deliveryOption && !orderIdFromQuery) return <OrderSummarySkeleton />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16 py-6 sm:py-8">
        <div className="mx-0">
          <Breadcrumbs />
        </div>
        <div className="w-full">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">Confirm Order & Delivery Details</h1>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4">
            <h2 className="text-lg sm:text-xl font-bold mb-2">Order Details</h2>
            <ul>
              {(orderItems.length > 0 ? orderItems : cartItems).map((item: OrderItem | CartItem) => {
                const itemTotal = 'item_total' in item ? (typeof item.item_total === "string" ? parseFloat(item.item_total) : item.item_total || 0) : (typeof item.price === "string" ? parseFloat(item.price) : item.price) * item.quantity;
                const quantity = item.quantity;
                const designFile = 'design_file' in item ? item.design_file : undefined;
                const additionalInfo = 'additional_info' in item ? item.additional_info : undefined;
                const color = 'color' in item ? item.color : undefined;

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
                          {designFile.endsWith(".pdf") ? (
                            <a href={designFile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-2">
                              View PDF
                            </a>
                          ) : (
                            <Image
                              src={designFile}
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
            <p>{orderDeliveryOption || deliveryOption === "pickup" ? "Pick Up" : "Deliver to Address"}</p>
            {(orderDeliveryOption === "delivery" || (deliveryOption === "delivery" && (deliveryDetails || userData?.company_address))) && (
              <div className="mt-4">
                <h2 className="text-base sm:text-lg font-bold mb-2">Delivery Address</h2>
                {userData?.user_type === "individual" ? (
                  <>
                    <p>{(orderDeliveryDetails?.address || deliveryDetails?.address) || ""}</p>
                    <p>{(orderDeliveryDetails?.city || deliveryDetails?.city) || ""}, {(orderDeliveryDetails?.state || deliveryDetails?.state) || ""}</p>
                    {(orderDeliveryDetails?.postcode || deliveryDetails?.postcode) && <p>Postcode: {(orderDeliveryDetails?.postcode || deliveryDetails?.postcode) || ""}</p>}
                  </>
                ) : (
                  <p>{userData?.company_address || ""}</p>
                )}
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
            <form onSubmit={handleProceedToPayment}>
              <div className="mt-4 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="form-checkbox text-[#ECAA39] focus:ring-[#ECAA39] accent-[#ECAA39]"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I have read and agree to the{" "}
                  <Link href="/terms-of-service" className="text-[#ECAA39] hover:underline">
                    Terms of Service
                  </Link>
                </label>
              </div>
              <button
                type="submit"
                disabled={!termsAccepted}
                className="w-full sm:w-[380px] h-[48px] mt-4 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed mx-auto block"
              >
                Proceed to Payment
              </button>
            </form>
          </div>
          <Link href="/cart" className="text-yellow-500 inline-block hover:text-yellow-600 text-sm sm:text-base">
            <span className="mr-2">⟵</span> Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}