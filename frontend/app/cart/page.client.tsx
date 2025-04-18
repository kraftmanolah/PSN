// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import useSWR from "swr";
// import { Cart, CartItem, Delivery } from "@/types/product";
// import Link from "next/link";
// import Image from "next/image";
// import { useAuth } from "@/app/hooks/useAuth";
// import DeliveryForm from "@/app/components/DeliveryForm";
// import Breadcrumbs from "@/app/components/Breadcrumbs";
// import Navbar from "@/app/components/Navbar";
// import Footer from "@/app/components/Footer";
// import FeaturedProduct from "@/app/components/FeaturedProduct";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// // Fetcher function remains unchanged
// const fetcher = ([url, token]: [string, string | null]): Promise<Cart> =>
//   fetch(url, {
//     headers: token ? { Authorization: `Token ${token}` } : {},
//     credentials: "include",
//   }).then((res) => {
//     if (!res.ok) throw new Error(`Fetch failed with status: ${res.status}`);
//     return res.json();
//   });

// // Skeleton Loader Component
// const CartSkeleton = () => (
//   <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 animate-pulse">
//     {/* Left Section Skeleton (Cart Items) */}
//     <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
//       <div className="h-8 w-1/4 bg-gray-300 rounded mb-4"></div>
//       <div className="border-b pb-4 mb-4">
//         <div className="hidden sm:flex justify-between">
//           <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
//           <div className="flex space-x-16">
//             <div className="h-4 w-16 bg-gray-300 rounded"></div>
//             <div className="h-4 w-16 bg-gray-300 rounded"></div>
//           </div>
//         </div>
//       </div>
//       <ul>
//         {Array(2).fill(0).map((_, index) => (
//           <li key={index} className="py-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div className="flex items-center space-x-4 flex-1">
//               <div className="w-16 h-16 bg-gray-300 rounded"></div>
//               <div className="flex-1 space-y-2">
//                 <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
//                 <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
//                 <div className="h-3 w-1/3 bg-gray-300 rounded"></div>
//               </div>
//             </div>
//             <div className="hidden sm:flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <div className="w-8 h-8 bg-gray-300 rounded-l"></div>
//                 <div className="w-12 h-8 bg-gray-300"></div>
//                 <div className="w-8 h-8 bg-gray-300 rounded-r"></div>
//               </div>
//               <div className="h-4 w-20 bg-gray-300 rounded min-w-[100px]"></div>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <div className="h-4 w-1/3 bg-gray-300 rounded mt-4"></div>
//     </div>
//     {/* Right Section Skeleton (Order Summary) */}
//     <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
//       <div className="h-8 w-1/3 bg-gray-300 rounded mb-4"></div>
//       <div className="h-4 w-1/4 bg-gray-300 rounded mb-4"></div>
//       <div className="space-y-2 mb-4">
//         <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
//         <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
//       </div>
//       <div className="border-t pt-4">
//         <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
//         <div className="h-6 w-1/3 bg-gray-300 rounded mt-2 float-right"></div>
//       </div>
//       <div className="h-10 w-full bg-gray-300 rounded mt-4"></div>
//     </div>
//   </div>
// );

// // Empty Cart Component
// const EmptyCart = () => (
//   <div className="flex flex-col items-center justify-center py-12">
//     <Image
//       src="/icons/cart-box.png"
//       alt="Empty Cart"
//       width={80}
//       height={80}
//       className="mb-4 opacity-50"
//     />
//     <p className="text-lg text-gray-600">You Have No Items In Your Cart</p>
//     <Link href="/shop" className="mt-4 text-yellow-500 hover:text-yellow-600">
//       Start Shopping
//     </Link>
//   </div>
// );

// export default function CartPage() {
//   const { token, loading } = useAuth();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const shouldRefresh = searchParams.get("refresh") === "true";
//   const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

//   const { data: cart, error, mutate } = useSWR<Cart, Error>(
//     token ? [`${backendUrl}/api/cart/`, token] as [string, string | null] : null,
//     fetcher,
//     { revalidateOnFocus: true, revalidateOnReconnect: true }
//   );

//   const [deliveryOption, setDeliveryOption] = useState<"pickup" | "delivery">("pickup");
//   const [deliveryDetails, setDeliveryDetails] = useState<Delivery>({
//     address: "",
//     city: "",
//     state: "",
//     postcode: "",
//   });
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);
//   const [isEditingDelivery, setIsEditingDelivery] = useState(false);

//   // useEffect hooks remain unchanged
//   useEffect(() => {
//     const loadDeliveryDetails = async () => {
//       if (!token) return;

//       const savedDetails = localStorage.getItem("deliveryDetails");
//       if (savedDetails) {
//         const parsedDetails = JSON.parse(savedDetails);
//         console.log("Loaded from localStorage:", parsedDetails);
//         if (parsedDetails.address && parsedDetails.city && parsedDetails.state) {
//           setDeliveryDetails(parsedDetails);
//           setDeliveryOption("delivery");
//           return;
//         }
//       }

//       try {
//         const res = await fetch(`${backendUrl}/api/accounts/delivery-details/`, {
//           headers: { Authorization: `Token ${token}` },
//         });
//         if (!res.ok) {
//           console.log("No saved delivery details found in database.");
//           return;
//         }
//         const data = await res.json();
//         console.log("Fetched delivery details:", data);
//         if (data.address && data.city && data.state) {
//           setDeliveryDetails(data);
//           setDeliveryOption("delivery");
//           localStorage.setItem("deliveryDetails", JSON.stringify(data));
//         }
//       } catch (err) {
//         console.error("Error fetching delivery details:", err);
//       }
//     };

//     loadDeliveryDetails();
//     if (shouldRefresh) {
//       mutate();
//     }
//   }, [token, shouldRefresh, mutate, backendUrl]);

//   useEffect(() => {
//     if (!loading && !token) {
//       setErrorMsg("Please log in to view your cart.");
//       router.push("/signin");
//     }
//   }, [token, loading, router]);

//   const getIncrementStep = (item: CartItem): number => {
//     return item.product.increment_step || 1;
//   };

//   const handleUpdateQuantity = async (cartItemId: number, newQuantity: number, item: CartItem) => {
//     if (!token || newQuantity < 1 || !cart?.id) return;

//     const step = getIncrementStep(item);
//     const adjustedQuantity = Math.max(step, Math.round(newQuantity / step) * step);

//     try {
//       const response = await fetch(`${backendUrl}/api/cart/${cart.id}/update_quantity/`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Token ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ cart_item_id: cartItemId, quantity: adjustedQuantity }),
//       });
//       if (!response.ok) throw new Error("Failed to update quantity");
//       mutate();
//     } catch (err) {
//       setErrorMsg(err instanceof Error ? err.message : "An error occurred");
//     }
//   };

//   const handleRemoveItem = async (cartItemId: number) => {
//     if (!token || !cart?.id) return;
//     try {
//       const response = await fetch(`${backendUrl}/api/cart/${cart.id}/items/${cartItemId}/`, {
//         method: "DELETE",
//         headers: { Authorization: `Token ${token}` },
//       });
//       if (!response.ok) throw new Error("Failed to remove item");
//       mutate();
//     } catch (err) {
//       setErrorMsg(err instanceof Error ? err.message : "An error occurred");
//     }
//   };

//   const handleSaveDelivery = async () => {
//     if (!token) return;
//     if (!deliveryDetails.address || !deliveryDetails.city || !deliveryDetails.state) {
//       setErrorMsg("Please fill in all required delivery fields.");
//       return;
//     }
//     try {
//       const response = await fetch(`${backendUrl}/api/accounts/delivery-details/`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Token ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(deliveryDetails),
//       });
//       if (!response.ok) throw new Error("Failed to save delivery details");
//       console.log("Saved delivery details:", deliveryDetails);
//       localStorage.setItem("deliveryDetails", JSON.stringify(deliveryDetails));
//       setIsEditingDelivery(false);
//     } catch (err) {
//       setErrorMsg("Failed to save delivery details.");
//       console.error(err);
//     }
//   };

//   const handleProceed = () => {
//     if (!cart?.items?.length || !token) {
//       setErrorMsg(!cart?.items?.length ? "Your cart is empty." : "Please log in to proceed.");
//       return;
//     }
//     if (deliveryOption === "delivery" && (!deliveryDetails.address || !deliveryDetails.city || !deliveryDetails.state)) {
//       setErrorMsg("Please enter all required delivery details.");
//       return;
//     }
//     const queryParams = new URLSearchParams({
//       deliveryOption,
//       deliveryDetails: JSON.stringify(deliveryDetails),
//       cartItems: JSON.stringify(cart.items),
//       cartTotal: cart.total.toString(),
//     }).toString();
//     router.push(`/order/summary?${queryParams}`);
//   };

//   if (errorMsg) return <div className="p-4 text-red-500">{errorMsg}</div>;
//   if (error) return <div className="p-4 text-red-500">Error loading cart: {error.message}</div>;
//   if (!cart) {
//     return (
//       <div className="flex flex-col min-h-screen bg-gray-50">
//         <Navbar />
//         <main className="flex-grow">
//           <div className="p-4">
//             <Breadcrumbs />
//             <CartSkeleton />
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   const cartTotal = typeof cart.total === "string" ? parseFloat(cart.total) : cart.total;

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Navbar />
//       <main className="flex-grow">
//         <div className="p-4">
//           <Breadcrumbs />
//           {cart.items && cart.items.length > 0 ? (
//             <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
//               <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
//                 <h1 className="text-2xl font-bold mb-4">
//                   My Cart ({cart.item_count} item{cart.item_count !== 1 ? "s" : ""})
//                 </h1>
//                 <div className="border-b pb-4 mb-4">
//                   <div className="hidden sm:flex justify-between text-sm font-medium text-gray-600">
//                     <span>PRODUCT DETAILS</span>
//                     <div className="flex space-x-16">
//                       <span>QUANTITY</span>
//                       <span>PRICE</span>
//                     </div>
//                   </div>
//                 </div>
//                 <ul>
//                   {cart.items.map((item: CartItem) => {
//                     const itemTotal = typeof item.item_total === "string" ? parseFloat(item.item_total) : item.item_total;
//                     return (
//                       <li key={item.id} className="py-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                         <div className="flex items-center space-x-4 flex-1">
//                           <Image
//                             src={item.product.main_image || ""}
//                             alt={item.product.name}
//                             width={64}
//                             height={64}
//                             className="w-16 h-16 object-cover rounded"
//                           />
//                           <div className="flex-1">
//                             <p className="font-semibold">{item.product.name} {item.color && `(${item.color})`}</p>
//                             <div className="text-sm text-blue-500 space-x-2 mt-1">
//                               <button onClick={() => handleRemoveItem(item.id)} className="text-red-500">
//                                 Remove
//                               </button>
//                               <Link href={`/products/${item.product.id}`} className="text-blue-500">
//                                 Edit
//                               </Link>
//                             </div>
//                             {item.additional_info && (
//                               <p className="text-sm text-gray-600 mt-1">
//                                 <strong>Additional Info:</strong> {item.additional_info}
//                               </p>
//                             )}
//                             {item.design_file && (
//                               <p className="text-sm text-gray-600 mt-1">
//                                 <strong>Design File:</strong>{" "}
//                                 <a href={item.design_file} target="_blank" rel="noopener noreferrer" className="text-blue-500">
//                                   {item.design_file.split("/").pop() || "Design File"}
//                                 </a>
//                               </p>
//                             )}
//                             <div className="sm:hidden mt-2">
//                               <span className="text-sm font-medium text-gray-600">Quantity:</span>
//                               <div className="flex items-center space-x-2 mt-1">
//                                 <button
//                                   onClick={() => handleUpdateQuantity(item.id, item.quantity - getIncrementStep(item), item)}
//                                   className="bg-gray-200 p-2 rounded-l disabled:opacity-50"
//                                   disabled={item.quantity <= getIncrementStep(item)}
//                                 >
//                                   -
//                                 </button>
//                                 <input
//                                   type="number"
//                                   value={item.quantity}
//                                   onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || getIncrementStep(item), item)}
//                                   className="w-12 text-center border-t border-b focus:outline-none"
//                                   min={getIncrementStep(item)}
//                                   step={getIncrementStep(item)}
//                                 />
//                                 <button
//                                   onClick={() => handleUpdateQuantity(item.id, item.quantity + getIncrementStep(item), item)}
//                                   className="bg-gray-200 p-2 rounded-r"
//                                 >
//                                   +
//                                 </button>
//                               </div>
//                             </div>
//                             <p className="sm:hidden text-sm font-medium mt-2">
//                               <span className="text-gray-600">Price:</span> ₦{itemTotal.toLocaleString()} {item.product.currency}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="hidden sm:flex items-center space-x-4">
//                           <div className="flex items-center space-x-2">
//                             <button
//                               onClick={() => handleUpdateQuantity(item.id, item.quantity - getIncrementStep(item), item)}
//                               className="bg-gray-200 p-2 rounded-l disabled:opacity-50"
//                               disabled={item.quantity <= getIncrementStep(item)}
//                             >
//                               -
//                             </button>
//                             <input
//                               type="number"
//                               value={item.quantity}
//                               onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || getIncrementStep(item), item)}
//                               className="w-12 text-center border-t border-b focus:outline-none"
//                               min={getIncrementStep(item)}
//                               step={getIncrementStep(item)}
//                             />
//                             <button
//                               onClick={() => handleUpdateQuantity(item.id, item.quantity + getIncrementStep(item), item)}
//                               className="bg-gray-200 p-2 rounded-r"
//                             >
//                               +
//                             </button>
//                           </div>
//                           <p className="text-right font-medium min-w-[100px]">
//                             ₦{itemTotal.toLocaleString()} {item.product.currency}
//                           </p>
//                         </div>
//                       </li>
//                     );
//                   })}
//                 </ul>
//                 <Link href="/shop" className="text-yellow-500 mt-4 inline-block hover:text-yellow-600">
//                   <span className="mr-2">⟵</span> Continue Shopping
//                 </Link>
//               </div>
//               <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
//                 <div className="text-sm text-gray-600 mb-4">ITEM ({cart.items.length})</div>
//                 <div className="mb-4">
//                   <p className="text-sm text-gray-600">Choose Delivery Option</p>
//                   <div className="mt-2 flex space-x-6">
//                     <label className="flex items-center space-x-2">
//                       <input
//                         type="radio"
//                         value="pickup"
//                         checked={deliveryOption === "pickup"}
//                         onChange={() => setDeliveryOption("pickup")}
//                         className="form-radio text-[#ECAA39] focus:ring-[#ECAA39]"
//                       />
//                       <span>Pick Up Option</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input
//                         type="radio"
//                         value="delivery"
//                         checked={deliveryOption === "delivery"}
//                         onChange={() => setDeliveryOption("delivery")}
//                         className="form-radio text-[#ECAA39] focus:ring-[#ECAA39]"
//                       />
//                       <span>Deliver to Address</span>
//                     </label>
//                   </div>
//                   {deliveryOption === "delivery" && (
//                     <p className="text-red-500 text-sm mt-2">
//                       Note: Delivery price varies nationwide and will be communicated to you after your order.
//                     </p>
//                   )}
//                   {deliveryOption === "delivery" && isEditingDelivery && (
//                     <DeliveryForm
//                       onSave={(details) => {
//                         setDeliveryDetails(details);
//                         handleSaveDelivery();
//                       }}
//                       initialDetails={deliveryDetails}
//                     />
//                   )}
//                   {deliveryOption === "delivery" && !isEditingDelivery && deliveryDetails.address && (
//                     <div className="mt-4">
//                       <h2 className="text-lg font-bold mb-2">Delivery Address</h2>
//                       <p>{deliveryDetails.address}</p>
//                       <p>{deliveryDetails.city}, {deliveryDetails.state}</p>
//                       {deliveryDetails.postcode && <p>Postcode: {deliveryDetails.postcode}</p>}
//                       <button
//                         onClick={() => setIsEditingDelivery(true)}
//                         className="mt-2 text-yellow-500 hover:text-yellow-600"
//                       >
//                         Edit
//                       </button>
//                     </div>
//                   )}
//                   {deliveryOption === "delivery" && !isEditingDelivery && !deliveryDetails.address && (
//                     <div className="mt-4">
//                       <p className="text-sm text-gray-600">No saved delivery address found.</p>
//                       <button
//                         onClick={() => setIsEditingDelivery(true)}
//                         className="mt-2 text-yellow-500 hover:text-yellow-600"
//                       >
//                         Add Delivery Address
//                       </button>
//                     </div>
//                   )}
//                 </div>
//                 <div className="border-t pt-4 flex justify-between items-center">
//                   <p className="text-lg font-medium">Total:</p>
//                   <p className="text-xl font-bold">
//                     ₦{(cartTotal ?? 0).toLocaleString()} {cart.items[0]?.product.currency || "₦"}
//                   </p>
//                 </div>
//                 <button
//                   onClick={handleProceed}
//                   className="w-[467px] h-[64px] mt-4 bg-white text-[#ECAA39] border border-[#ECAA39] rounded hover:bg-gray-100"
//                 >
//                   Proceed to checkout
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
//               <EmptyCart />
//             </div>
//           )}
//           <div className="max-w-7xl mx-auto mt-12 pb-5 mb-5">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold">Similar Products You Might Like</h2>
//               <Link href="/shop" className="text-yellow-500 hover:text-yellow-600 flex items-center">
//                 View All <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
//               </Link>
//             </div>
//             <FeaturedProduct />
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Cart, CartItem, Delivery } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/hooks/useAuth";
import DeliveryForm from "@/app/components/DeliveryForm";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import FeaturedProduct from "@/app/components/FeaturedProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// Custom CSS to ensure radio button selected color is yellow
const customStyles = `
  input[type="radio"].yellow-radio:checked {
    accent-color: #ECAA39;
    background-color: #ECAA39;
    border-color: #ECAA39;
  }
  input[type="radio"].yellow-radio:checked::before {
    background-color: #ECAA39;
  }
`;

// Fetcher function remains unchanged
const fetcher = ([url, token]: [string, string | null]): Promise<Cart> =>
  fetch(url, {
    headers: token ? { Authorization: `Token ${token}` } : {},
    credentials: "include",
  }).then((res) => {
    if (!res.ok) throw new Error(`Fetch failed with status: ${res.status}`);
    return res.json();
  });

// Skeleton Loader Component
const CartSkeleton = () => (
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 animate-pulse">
    {/* Left Section Skeleton (Cart Items) */}
    <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
      <div className="h-8 w-1/4 bg-gray-300 rounded mb-4"></div>
      <div className="border-b pb-4 mb-4">
        <div className="hidden sm:flex justify-between">
          <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
          <div className="flex space-x-16">
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
      <ul>
        {Array(2).fill(0).map((_, index) => (
          <li key={index} className="py-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-16 h-16 bg-gray-300 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
                <div className="h-3 w-1/3 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-l"></div>
                <div className="w-12 h-8 bg-gray-300"></div>
                <div className="w-8 h-8 bg-gray-300 rounded-r"></div>
              </div>
              <div className="h-4 w-20 bg-gray-300 rounded min-w-[100px]"></div>
            </div>
          </li>
        ))}
      </ul>
      <div className="h-4 w-1/3 bg-gray-300 rounded mt-4"></div>
    </div>
    {/* Right Section Skeleton (Order Summary) */}
    <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
      <div className="h-8 w-1/3 bg-gray-300 rounded mb-4"></div>
      <div className="h-4 w-1/4 bg-gray-300 rounded mb-4"></div>
      <div className="space-y-2 mb-4">
        <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
      </div>
      <div className="border-t pt-4">
        <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
        <div className="h-6 w-1/3 bg-gray-300 rounded mt-2 float-right"></div>
      </div>
      <div className="h-10 w-full bg-gray-300 rounded mt-4"></div>
    </div>
  </div>
);

// Empty Cart Component
const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <Image
      src="/icons/cart-box.png"
      alt="Empty Cart"
      width={80}
      height={80}
      className="mb-4 opacity-50"
    />
    <p className="text-lg text-gray-600">You Have No Items In Your Cart</p>
    <Link href="/shop" className="mt-4 text-yellow-500 hover:text-yellow-600">
      Start Shopping
    </Link>
  </div>
);

export default function CartPage() {
  const { token, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldRefresh = searchParams.get("refresh") === "true";
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const { data: cart, error, mutate } = useSWR<Cart, Error>(
    token ? [`${backendUrl}/api/cart/`, token] as [string, string | null] : null,
    fetcher,
    { revalidateOnFocus: true, revalidateOnReconnect: true }
  );

  const [deliveryOption, setDeliveryOption] = useState<"pickup" | "delivery">("pickup");
  const [deliveryDetails, setDeliveryDetails] = useState<Delivery>({
    address: "",
    city: "",
    state: "",
    postcode: "",
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isEditingDelivery, setIsEditingDelivery] = useState(false);

  // useEffect hooks remain unchanged
  useEffect(() => {
    const loadDeliveryDetails = async () => {
      if (!token) return;

      const savedDetails = localStorage.getItem("deliveryDetails");
      if (savedDetails) {
        const parsedDetails = JSON.parse(savedDetails);
        console.log("Loaded from localStorage:", parsedDetails);
        if (parsedDetails.address && parsedDetails.city && parsedDetails.state) {
          setDeliveryDetails(parsedDetails);
          setDeliveryOption("delivery");
          return;
        }
      }

      try {
        const res = await fetch(`${backendUrl}/api/accounts/delivery-details/`, {
          headers: { Authorization: `Token ${token}` },
        });
        if (!res.ok) {
          console.log("No saved delivery details found in database.");
          return;
        }
        const data = await res.json();
        console.log("Fetched delivery details:", data);
        if (data.address && data.city && data.state) {
          setDeliveryDetails(data);
          setDeliveryOption("delivery");
          localStorage.setItem("deliveryDetails", JSON.stringify(data));
        }
      } catch (err) {
        console.error("Error fetching delivery details:", err);
      }
    };

    loadDeliveryDetails();
    if (shouldRefresh) {
      mutate();
    }
  }, [token, shouldRefresh, mutate, backendUrl]);

  useEffect(() => {
    if (!loading && !token) {
      setErrorMsg("Please log in to view your cart.");
      router.push("/signin");
    }
  }, [token, loading, router]);

  const getIncrementStep = (item: CartItem): number => {
    return item.product.increment_step || 1;
  };

  const handleUpdateQuantity = async (cartItemId: number, newQuantity: number, item: CartItem) => {
    if (!token || newQuantity < 1 || !cart?.id) return;

    const step = getIncrementStep(item);
    const adjustedQuantity = Math.max(step, Math.round(newQuantity / step) * step);

    try {
      const response = await fetch(`${backendUrl}/api/cart/${cart.id}/update_quantity/`, {
        method: "PATCH",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart_item_id: cartItemId, quantity: adjustedQuantity }),
      });
      if (!response.ok) throw new Error("Failed to update quantity");
      mutate();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    if (!token || !cart?.id) return;
    try {
      const response = await fetch(`${backendUrl}/api/cart/${cart.id}/items/${cartItemId}/`, {
        method: "DELETE",
        headers: { Authorization: `Token ${token}` },
      });
      if (!response.ok) throw new Error("Failed to remove item");
      mutate();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleSaveDelivery = async () => {
    if (!token) return;
    if (!deliveryDetails.address || !deliveryDetails.city || !deliveryDetails.state) {
      setErrorMsg("Please fill in all required delivery fields.");
      return;
    }
    try {
      const response = await fetch(`${backendUrl}/api/accounts/delivery-details/`, {
        method: "PATCH",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deliveryDetails),
      });
      if (!response.ok) throw new Error("Failed to save delivery details");
      console.log("Saved delivery details:", deliveryDetails);
      localStorage.setItem("deliveryDetails", JSON.stringify(deliveryDetails));
      setIsEditingDelivery(false);
    } catch (err) {
      setErrorMsg("Failed to save delivery details.");
      console.error(err);
    }
  };

  const handleProceed = () => {
    if (!cart?.items?.length || !token) {
      setErrorMsg(!cart?.items?.length ? "Your cart is empty." : "Please log in to proceed.");
      return;
    }
    if (deliveryOption === "delivery" && (!deliveryDetails.address || !deliveryDetails.city || !deliveryDetails.state)) {
      setErrorMsg("Please enter all required delivery details.");
      return;
    }
    const queryParams = new URLSearchParams({
      deliveryOption,
      deliveryDetails: JSON.stringify(deliveryDetails),
      cartItems: JSON.stringify(cart.items),
      cartTotal: cart.total.toString(),
    }).toString();
    router.push(`/order/summary?${queryParams}`);
  };

  if (errorMsg) return <div className="p-4 text-red-500">{errorMsg}</div>;
  if (error) return <div className="p-4 text-red-500">Error loading cart: {error.message}</div>;
  if (!cart) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <div className="p-4">
            <Breadcrumbs />
            <CartSkeleton />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const cartTotal = typeof cart.total === "string" ? parseFloat(cart.total) : cart.total;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <style>{customStyles}</style>
      <Navbar />
      <main className="flex-grow">
        <div className="p-4">
          <Breadcrumbs />
          {cart.items && cart.items.length > 0 ? (
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
              <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">
                  My Cart ({cart.item_count} item{cart.item_count !== 1 ? "s" : ""})
                </h1>
                <div className="border-b pb-4 mb-4">
                  <div className="hidden sm:flex justify-between text-sm font-medium text-gray-600">
                    <span>PRODUCT DETAILS</span>
                    <div className="flex space-x-16">
                      <span>QUANTITY</span>
                      <span>PRICE</span>
                    </div>
                  </div>
                </div>
                <ul>
                  {cart.items.map((item: CartItem) => {
                    const itemTotal = typeof item.item_total === "string" ? parseFloat(item.item_total) : item.item_total;
                    return (
                      <li key={item.id} className="py-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center space-x-4 flex-1">
                          <Image
                            src={item.product.main_image || ""}
                            alt={item.product.name}
                            width={64}
                            height={64}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-semibold">{item.product.name} {item.color && `(${item.color})`}</p>
                            <div className="text-sm text-blue-500 space-x-2 mt-1">
                              <button onClick={() => handleRemoveItem(item.id)} className="text-red-500">
                                Remove
                              </button>
                              <Link href={`/products/${item.product.id}`} className="text-blue-500">
                                Edit
                              </Link>
                            </div>
                            {item.additional_info && (
                              <p className="text-sm text-gray-600 mt-1">
                                <strong>Additional Info:</strong> {item.additional_info}
                              </p>
                            )}
                            {item.design_file && (
                              <p className="text-sm text-gray-600 mt-1">
                                <strong>Design File:</strong>{" "}
                                <a href={item.design_file} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                  {item.design_file.split("/").pop() || "Design File"}
                                </a>
                              </p>
                            )}
                            <div className="sm:hidden mt-2">
                              <span className="text-sm font-medium text-gray-600">Quantity:</span>
                              <div className="flex items-center space-x-2 mt-1">
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity - getIncrementStep(item), item)}
                                  className="bg-gray-200 p-2 rounded-l disabled:opacity-50"
                                  disabled={item.quantity <= getIncrementStep(item)}
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || getIncrementStep(item), item)}
                                  className="w-12 text-center border-t border-b focus:outline-none"
                                  min={getIncrementStep(item)}
                                  step={getIncrementStep(item)}
                                />
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + getIncrementStep(item), item)}
                                  className="bg-gray-200 p-2 rounded-r"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <p className="sm:hidden text-sm font-medium mt-2">
                              <span className="text-gray-600">Price:</span> ₦{itemTotal.toLocaleString()} {item.product.currency}
                            </p>
                          </div>
                        </div>
                        <div className="hidden sm:flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - getIncrementStep(item), item)}
                              className="bg-gray-200 p-2 rounded-l disabled:opacity-50"
                              disabled={item.quantity <= getIncrementStep(item)}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || getIncrementStep(item), item)}
                              className="w-12 text-center border-t border-b focus:outline-none"
                              min={getIncrementStep(item)}
                              step={getIncrementStep(item)}
                            />
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + getIncrementStep(item), item)}
                              className="bg-gray-200 p-2 rounded-r"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-right font-medium min-w-[100px]">
                            ₦{itemTotal.toLocaleString()} {item.product.currency}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <Link href="/shop" className="text-yellow-500 mt-4 inline-block hover:text-yellow-600">
                  <span className="mr-2">⟵</span> Continue Shopping
                </Link>
              </div>
              <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                <div className="text-sm text-gray-600 mb-4">ITEM ({cart.items.length})</div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Choose Delivery Option</p>
                  <div className="mt-2 flex space-x-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="pickup"
                        checked={deliveryOption === "pickup"}
                        onChange={() => setDeliveryOption("pickup")}
                        className="form-radio text-[#ECAA39] focus:ring-[#ECAA39] accent-[#ECAA39] yellow-radio"
                      />
                      <span>Pick Up Option</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="delivery"
                        checked={deliveryOption === "delivery"}
                        onChange={() => setDeliveryOption("delivery")}
                        className="form-radio text-[#ECAA39] focus:ring-[#ECAA39] accent-[#ECAA39] yellow-radio"
                      />
                      <span>Deliver to Address</span>
                    </label>
                  </div>
                  {deliveryOption === "delivery" && (
                    <p className="text-red-500 text-sm mt-2">
                      Note: Delivery price varies nationwide and will be communicated to you after your order.
                    </p>
                  )}
                  {deliveryOption === "delivery" && isEditingDelivery && (
                    <DeliveryForm
                      onSave={(details) => {
                        setDeliveryDetails(details);
                        handleSaveDelivery();
                      }}
                      initialDetails={deliveryDetails}
                    />
                  )}
                  {deliveryOption === "delivery" && !isEditingDelivery && deliveryDetails.address && (
                    <div className="mt-4">
                      <h2 className="text-lg font-bold mb-2">Delivery Address</h2>
                      <p>{deliveryDetails.address}</p>
                      <p>{deliveryDetails.city}, {deliveryDetails.state}</p>
                      {deliveryDetails.postcode && <p>Postcode: {deliveryDetails.postcode}</p>}
                      <button
                        onClick={() => setIsEditingDelivery(true)}
                        className="mt-2 text-yellow-500 hover:text-yellow-600"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                  {deliveryOption === "delivery" && !isEditingDelivery && !deliveryDetails.address && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">No saved delivery address found.</p>
                      <button
                        onClick={() => setIsEditingDelivery(true)}
                        className="mt-2 text-yellow-500 hover:text-yellow-600"
                      >
                        Add Delivery Address
                      </button>
                    </div>
                  )}
                </div>
                <div className="border-t pt-4 flex justify-between items-center">
                  <p className="text-lg font-medium">Total:</p>
                  <p className="text-xl font-bold">
                    ₦{(cartTotal ?? 0).toLocaleString()} {cart.items[0]?.product.currency || "₦"}
                  </p>
                </div>
                <button
                  onClick={handleProceed}
                  className="w-full sm:w-[380px] h-[48px] mt-4 bg-white text-[#ECAA39] border border-[#ECAA39] rounded hover:bg-gray-100"
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
              <EmptyCart />
            </div>
          )}
          <div className="max-w-7xl mx-auto mt-12 pb-5 mb-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Similar Products You Might Like</h2>
              <Link href="/shop" className="text-yellow-500 hover:text-yellow-600 flex items-center">
                View All <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Link>
            </div>
            <FeaturedProduct />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}