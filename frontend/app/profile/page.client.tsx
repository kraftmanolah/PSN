// "use client";

// import { useState, useEffect } from "react";
// import { useAuth } from "@/app/hooks/useAuth";
// import Link from "next/link";
// import Image from "next/image";
// import Navbar from "@/app/components/Navbar";
// import axios from "axios";

// // Define TypeScript interfaces for the order data
// interface Product {
//   id: number;
//   name: string;
//   price: string;
//   currency: string;
//   main_image: string | null;
// }

// interface OrderItem {
//   id: number;
//   product: Product;
//   quantity: number;
//   price: number;
//   design_file?: string | null;
//   additional_info?: string | null;
//   color?: string | null;
// }

// interface Order {
//   id: number;
//   user: number;
//   items: OrderItem[];
//   total_amount: number;
//   status: string;
//   created_at: string;
//   transaction_id: string | null;
//   delivery_option: "pickup" | "delivery";
//   delivery: {
//     address?: string;
//     city?: string;
//     state?: string;
//     postcode?: string | null;
//   } | null;
// }

// export default function Profile() {
//   const { user, token, logout, loading } = useAuth();
//   const [activeTab, setActiveTab] = useState<"my-orders" | "account-settings">("my-orders");
//   const [orderTab, setOrderTab] = useState<"PENDING" | "ONGOING" | "COMPLETED" | "CANCELLED">("PENDING");
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [orderCounts, setOrderCounts] = useState({
//     PENDING: 0,
//     ONGOING: 0,
//     COMPLETED: 0,
//     CANCELLED: 0,
//   });
//   const [showCancelSuccessModal, setShowCancelSuccessModal] = useState(false);
//   const [showCancelConfirmModal, setShowCancelConfirmModal] = useState(false);
//   const [orderToCancel, setOrderToCancel] = useState<number | null>(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

//   useEffect(() => {
//     if (loading || !user || !token) return;

//     const fetchOrders = async () => {
//       try {
//         const response = await fetch(`${backendUrl}/api/orders/`, {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         });
//         if (!response.ok) throw new Error("Failed to fetch orders");
//         const data: Order[] = await response.json();
//         console.log("Current user:", user);
//         console.log("Token used:", token);
//         console.log("Fetched orders:", data);
//         setOrders(data);
//         setOrderCounts({
//           PENDING: data.filter((order: Order) => order.status === "pending").length,
//           ONGOING: data.filter((order: Order) => order.status === "processing").length,
//           COMPLETED: data.filter((order: Order) => order.status === "completed").length,
//           CANCELLED: data.filter((order: Order) => order.status === "cancelled").length,
//         });
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, [user, token, loading, backendUrl]);

//   const handleAddToCart = async (items: OrderItem[]) => {
//     if (!token) {
//       alert("Please log in to add items to your cart.");
//       return;
//     }

//     try {
//       for (const item of items) {
//         const quantityNum = item.quantity;
//         if (!item.color || quantityNum <= 0) {
//           alert(`Invalid item data for ${item.product.name}: missing color or quantity.`);
//           continue;
//         }

//         const formData = new FormData();
//         formData.append("product_id", item.product.id.toString());
//         formData.append("quantity", quantityNum.toString());
//         formData.append("color", item.color || "");
//         if (item.additional_info) formData.append("additional_info", item.additional_info);

//         const response = await axios.post(`${backendUrl}/api/cart/add_item/`, formData, {
//           headers: { Authorization: `Token ${token}` },
//         });
//         if (response.status !== 201) {
//           throw new Error(`Failed to add ${item.product.name} to cart.`);
//         }
//       }
//       alert("All products from the order have been added to your cart successfully!");
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       alert(err instanceof Error ? `Error adding to cart: ${err.message}` : "An unexpected error occurred");
//     }
//   };

//   const handleCancelOrderConfirm = (orderId: number) => {
//     setOrderToCancel(orderId);
//     setShowCancelConfirmModal(true);
//   };

//   const handleCancelOrder = async () => {
//     if (orderToCancel === null) return;

//     try {
//       const response = await fetch(`${backendUrl}/api/orders/${orderToCancel}/cancel/`, {
//         method: "POST",
//         headers: {
//           Authorization: `Token ${token}`,
//         },
//       });
//       if (!response.ok) throw new Error("Failed to cancel order");
//       setOrders(orders.map((order: Order) =>
//         order.id === orderToCancel ? { ...order, status: "cancelled" } : order
//       ));
//       setOrderCounts((prev) => ({
//         ...prev,
//         PENDING: prev.PENDING - 1,
//         CANCELLED: prev.CANCELLED + 1,
//       }));
//       setShowCancelConfirmModal(false);
//       setShowCancelSuccessModal(true);
//       setTimeout(() => {
//         setShowCancelSuccessModal(false);
//       }, 2000);
//     } catch (error) {
//       console.error("Error cancelling order:", error);
//       alert("Failed to cancel order. Please try again.");
//     } finally {
//       setOrderToCancel(null);
//     }
//   };

//   const closeCancelConfirmModal = () => {
//     setShowCancelConfirmModal(false);
//     setOrderToCancel(null);
//   };

//   const closeCancelSuccessModal = () => {
//     setShowCancelSuccessModal(false);
//   };

//   const formatDate = (dateString: string): string => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100">
//         <Navbar />
//         <div className="flex flex-col md:flex-row">
//           {/* Sidebar Skeleton */}
//           <div className="w-full md:w-64 bg-black text-white flex flex-col justify-between md:min-h-screen">
//             <div className="mt-4">
//               <div className="w-[242px] h-[44px] mx-2 bg-gray-600 rounded-lg animate-pulse"></div>
//               <div className="w-[242px] h-[44px] mx-2 mt-2 bg-gray-600 rounded-lg animate-pulse"></div>
//             </div>
//             <div className="p-4 mb-6 flex justify-center">
//               <div className="w-full max-w-[242px] h-[50px] bg-gray-600 rounded-lg animate-pulse"></div>
//             </div>
//           </div>
//           {/* Main Content Skeleton */}
//           <div className="flex-1 p-4 md:p-8">
//             <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
//               <div className="h-8 w-1/4 bg-gray-200 rounded animate-pulse mb-4"></div>
//               <div className="flex flex-wrap gap-2 border-b mb-4">
//                 {[...Array(4)].map((_, index) => (
//                   <div key={index} className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
//                 ))}
//               </div>
//               <div className="space-y-4">
//                 {[...Array(3)].map((_, index) => (
//                   <div
//                     key={index}
//                     className="border p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
//                   >
//                     <div className="flex items-center space-x-4">
//                       <div className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
//                       <div className="space-y-2">
//                         <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
//                         <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
//                         <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
//                       </div>
//                     </div>
//                     <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mx-auto"></div>
//                     <div className="space-y-2">
//                       <div className="h-4 w-24 bg-gray-200 rounded animate-pulse ml-auto"></div>
//                       <div className="h-4 w-16 bg-gray-200 rounded animate-pulse ml-auto"></div>
//                       <div className="flex justify-end space-x-2">
//                         <div className="w-[142px] h-[40px] bg-gray-200 rounded animate-pulse"></div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!user || !token) {
//     return null; // Redirect handled by useAuth or AuthGuard
//   }

//   const filteredOrders = orders.filter((order: Order) => {
//     if (orderTab === "ONGOING") {
//       return order.status === "processing";
//     }
//     return order.status.toLowerCase() === orderTab.toLowerCase();
//   });

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navbar */}
//       <Navbar />

//       {/* Main Layout */}
//       <div className="flex flex-col md:flex-row relative">
//         {/* Hamburger Menu Button for Mobile */}
//         <div className="md:hidden p-4">
//           <button onClick={toggleMenu} className="text-black focus:outline-none">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
//             </svg>
//           </button>
//         </div>

//         {/* Sidebar - Hamburger Menu on Mobile, Full Sidebar on Desktop */}
//         <div className={`fixed inset-y-0 left-0 z-50 w-3/5 bg-black text-white flex flex-col justify-between transform transition-transform duration-300 md:static md:w-64 md:min-h-screen md:transition-none ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
//           <div>
//             <nav className="mt-4 flex flex-col items-start">
//               <button
//                 onClick={() => { setActiveTab("my-orders"); setIsMenuOpen(false); }}
//                 className={`w-full h-[44px] text-left px-4 flex items-center space-x-3 rounded-lg ${
//                   activeTab === "my-orders" ? "bg-yellow-500 text-black" : "text-white hover:bg-gray-800"
//                 }`}
//               >
//                 <Image
//                   src="/icons/package.png"
//                   alt="My Orders Icon"
//                   width={20}
//                   height={20}
//                   className="w-5 h-5"
//                 />
//                 <span>My Orders</span>
//               </button>
//               <button
//                 onClick={() => { setActiveTab("account-settings"); setIsMenuOpen(false); }}
//                 className={`w-full h-[44px] mt-2 text-left px-4 flex items-center space-x-3 rounded-lg ${
//                   activeTab === "account-settings" ? "bg-yellow-500 text-black" : "text-white hover:bg-gray-800"
//                 }`}
//               >
//                 <Image
//                   src="/icons/settings.png"
//                   alt="Account Settings Icon"
//                   width={20}
//                   height={20}
//                   className="w-5 h-5"
//                 />
//                 <span>Account Settings</span>
//               </button>
//             </nav>
//           </div>
//           <div className="p-4 mb-6 flex justify-center">
//             <button
//               onClick={() => { logout(); setIsMenuOpen(false); }}
//               className="w-full text-center px-4 py-3 flex items-center justify-center space-x-3 text-white hover:bg-gray-800 rounded-lg"
//             >
//               <Image
//                 src="/icons/log-out.png"
//                 alt="Logout Icon"
//                 width={20}
//                 height={20}
//                 className="w-5 h-5"
//               />
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>

//         {/* Overlay for Mobile Menu */}
//         {isMenuOpen && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//             onClick={toggleMenu}
//           ></div>
//         )}

//         {/* Main Content */}
//         <div className="flex-1 p-4 md:p-8">
//           {activeTab === "my-orders" && (
//             <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
//               <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">My Orders</h1>
//               {/* Order Tabs */}
//               <div className="flex flex-wrap gap-2 md:gap-4 border-b mb-4 overflow-x-auto">
//                 <button
//                   onClick={() => setOrderTab("PENDING")}
//                   className={`px-3 py-2 text-sm font-medium whitespace-nowrap ${
//                     orderTab === "PENDING"
//                       ? "border-b-2 border-yellow-500 text-yellow-500"
//                       : "text-gray-500"
//                   }`}
//                 >
//                   PENDING ORDERS ( {orderCounts.PENDING} )
//                 </button>
//                 <button
//                   onClick={() => setOrderTab("ONGOING")}
//                   className={`px-3 py-2 text-sm font-medium whitespace-nowrap ${
//                     orderTab === "ONGOING"
//                       ? "border-b-2 border-yellow-500 text-yellow-500"
//                       : "text-gray-500"
//                   }`}
//                 >
//                   ONGOING ORDERS ( {orderCounts.ONGOING} )
//                 </button>
//                 <button
//                   onClick={() => setOrderTab("COMPLETED")}
//                   className={`px-3 py-2 text-sm font-medium whitespace-nowrap ${
//                     orderTab === "COMPLETED"
//                       ? "border-b-2 border-yellow-500 text-yellow-500"
//                       : "text-gray-500"
//                   }`}
//                 >
//                   COMPLETED ORDERS ( {orderCounts.COMPLETED} )
//                 </button>
//                 <button
//                   onClick={() => setOrderTab("CANCELLED")}
//                   className={`px-3 py-2 text-sm font-medium whitespace-nowrap ${
//                     orderTab === "CANCELLED"
//                       ? "border-b-2 border-yellow-500 text-yellow-500"
//                       : "text-gray-500"
//                   }`}
//                 >
//                   CANCELLED ORDERS ( {orderCounts.CANCELLED} )
//                 </button>
//               </div>

//               {/* Order List */}
//               <div className="space-y-4">
//                 {filteredOrders.length > 0 ? (
//                   filteredOrders.map((order: Order) => {
//                     const firstItem = order.items[0];
//                     const isCompletedOrCancelled = ["COMPLETED", "CANCELLED"].includes(order.status.toUpperCase());
//                     const isPending = order.status.toLowerCase() === "pending";
//                     const viewOrderLink = isPending
//                       ? `/order/summary?orderId=${order.id}`
//                       : `/order/view?orderId=${order.id}`;

//                     return (
//                       <div
//                         key={order.id}
//                         className="border p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
//                       >
//                         {/* Left Section: Image, Order Info */}
//                         <div className="flex items-center space-x-4">
//                           <div>
//                             {firstItem.product.main_image ? (
//                               <img
//                                 src={firstItem.product.main_image}
//                                 alt={firstItem.product.name}
//                                 className="w-12 h-12 object-cover rounded"
//                               />
//                             ) : (
//                               <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500">
//                                 No Image
//                               </div>
//                             )}
//                           </div>
//                           <div>
//                             <p className="text-xs md:text-sm text-gray-500 capitalize">
//                               {order.status === "processing" ? "ONGOING" : order.status}
//                             </p>
//                             <p className="font-medium text-sm md:text-base">
//                               Order #{order.id} ({order.items.length} {order.items.length === 1 ? "item" : "items"})
//                             </p>
//                             <p className="text-xs md:text-sm text-gray-600">
//                               First item: {firstItem.product.name}
//                             </p>
//                           </div>
//                         </div>

//                         {/* Center Section: Total Items */}
//                         <div className="text-center">
//                           <p className="text-xs md:text-sm text-gray-500">{order.items.length} Items</p>
//                         </div>

//                         {/* Right Section: Date, Total Amount, Buttons */}
//                         <div className="text-right space-y-2">
//                           <p className="text-xs md:text-sm text-gray-500">{formatDate(order.created_at)}</p>
//                           <p className="font-medium text-sm md:text-base">₦{order.total_amount.toLocaleString()}</p>
//                           <div className="flex justify-end space-x-2">
//                             {order.status.toLowerCase() === "pending" && (
//                               <button
//                                 onClick={() => handleCancelOrderConfirm(order.id)}
//                                 className="w-[120px] md:w-[142px] h-[36px] md:h-[40px] text-[#FF3B30] border border-[#FF3B30] bg-white rounded-[4px] text-xs md:text-sm"
//                               >
//                                 Cancel Order
//                               </button>
//                             )}
//                             {isCompletedOrCancelled ? (
//                               <button
//                                 onClick={() => handleAddToCart(order.items)}
//                                 className="w-[120px] md:w-[142px] h-[36px] md:h-[40px] text-[#ECAA39] border border-[#ECAA39] bg-white rounded-[4px] text-xs md:text-sm"
//                               >
//                                 Add to Cart
//                               </button>
//                             ) : (
//                               <Link
//                                 href={viewOrderLink}
//                                 className="w-[120px] md:w-[142px] h-[36px] md:h-[40px] flex items-center justify-center text-[#ECAA39] border border-[#ECAA39] bg-white rounded-[4px] text-xs md:text-sm"
//                               >
//                                 View Order
//                               </Link>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })
//                 ) : (
//                   <p className="text-gray-500 text-sm">
//                     No {orderTab === "ONGOING" ? "ONGOING" : orderTab} ORDERS found.
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}
//           {activeTab === "account-settings" && (
//             <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
//               <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Account Settings</h1>
//               <p className="text-gray-500 text-sm">Account settings content will go here.</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Cancel Confirmation Modal */}
//       {showCancelConfirmModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-[90%] max-w-[400px] p-6 relative flex flex-col items-center shadow-lg">
//             {/* Close Button */}
//             <button onClick={closeCancelConfirmModal} className="absolute top-4 right-4">
//               <Image
//                 src="/icons/x.png"
//                 alt="Close Modal"
//                 width={24}
//                 height={24}
//                 className="w-6 h-6"
//               />
//             </button>
//             {/* Modal Content */}
//             <div className="mb-4">
//               <Image
//                 src="/icons/delete.png"
//                 alt="Delete Icon"
//                 width={40}
//                 height={40}
//                 className="w-10 h-10"
//               />
//             </div>
//             <h2 className="text-lg font-semibold mb-6">Are you sure you want to cancel order?</h2>
//             <div className="flex space-x-4">
//               <button
//                 onClick={handleCancelOrder}
//                 className="w-[120px] h-[40px] border border-gray-300 rounded text-sm"
//               >
//                 Yes
//               </button>
//               <button
//                 onClick={closeCancelConfirmModal}
//                 className="w-[120px] h-[40px] bg-[#ECAA39] text-white rounded text-sm"
//               >
//                 No
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Cancel Success Modal */}
//       {showCancelSuccessModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-[90%] max-w-[527px] h-[266px] relative flex flex-col items-center justify-center shadow-lg">
//             {/* Close Button */}
//             <button onClick={closeCancelSuccessModal} className="absolute top-4 right-4">
//               <Image
//                 src="/icons/x.png"
//                 alt="Close Modal"
//                 width={24}
//                 height={24}
//                 className="w-6 h-6"
//               />
//             </button>
//             {/* Modal Content */}
//             <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
//               <Image
//                 src="/icons/check.png"
//                 alt="Check Icon"
//                 width={40}
//                 height={40}
//                 className="w-10 h-10 tint-green"
//               />
//             </div>
//             <h2 className="text-lg font-semibold">Order Cancelled</h2>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import axios from "axios";

// Define TypeScript interfaces for the order data
interface Product {
  id: number;
  name: string;
  price: string;
  currency: string;
  main_image: string | null;
}

interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
  design_file?: string | null;
  additional_info?: string | null;
  color?: string | null;
}

interface Order {
  id: number;
  user: number;
  items: OrderItem[];
  total_amount: number;
  status: string;
  created_at: string;
  transaction_id: string | null;
  delivery_option: "pickup" | "delivery";
  delivery: {
    address?: string;
    city?: string;
    state?: string;
    postcode?: string | null;
  } | null;
}

// Empty Orders Component
const EmptyOrders = ({ status }: { status: "PENDING" | "ONGOING" | "COMPLETED" | "CANCELLED" }) => {
  const message = {
    PENDING: "You don’t have any pending orders",
    ONGOING: "You don’t have any ongoing orders",
    COMPLETED: "You don’t have any completed orders",
    CANCELLED: "You don’t have any cancelled orders",
  }[status];

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Image
        src="/icons/cart-box.png"
        alt={`No ${status} Orders`}
        width={80}
        height={80}
        className="mb-4 opacity-50"
      />
      <p className="text-lg text-gray-600">{message}</p>
      <Link href="/shop" className="mt-4 text-yellow-500 hover:text-yellow-600">
        Start Shopping
      </Link>
    </div>
  );
};

export default function Profile() {
  const { user, token, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<"my-orders" | "account-settings">("my-orders");
  const [orderTab, setOrderTab] = useState<"PENDING" | "ONGOING" | "COMPLETED" | "CANCELLED">("PENDING");
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderCounts, setOrderCounts] = useState({
    PENDING: 0,
    ONGOING: 0,
    COMPLETED: 0,
    CANCELLED: 0,
  });
  const [showCancelSuccessModal, setShowCancelSuccessModal] = useState(false);
  const [showCancelConfirmModal, setShowCancelConfirmModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    if (loading || !user || !token) return;

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/orders/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data: Order[] = await response.json();
        console.log("Current user:", user);
        console.log("Token used:", token);
        console.log("Fetched orders:", data);
        setOrders(data);
        setOrderCounts({
          PENDING: data.filter((order: Order) => order.status === "pending").length,
          ONGOING: data.filter((order: Order) => order.status === "processing").length,
          COMPLETED: data.filter((order: Order) => order.status === "completed").length,
          CANCELLED: data.filter((order: Order) => order.status === "cancelled").length,
        });
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user, token, loading, backendUrl]);

  const handleAddToCart = async (items: OrderItem[]) => {
    if (!token) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      for (const item of items) {
        const quantityNum = item.quantity;
        if (!item.color || quantityNum <= 0) {
          alert(`Invalid item data for ${item.product.name}: missing color or quantity.`);
          continue;
        }

        const formData = new FormData();
        formData.append("product_id", item.product.id.toString());
        formData.append("quantity", quantityNum.toString());
        formData.append("color", item.color || "");
        if (item.additional_info) formData.append("additional_info", item.additional_info);

        const response = await axios.post(`${backendUrl}/api/cart/add_item/`, formData, {
          headers: { Authorization: `Token ${token}` },
        });
        if (response.status !== 201) {
          throw new Error(`Failed to add ${item.product.name} to cart.`);
        }
      }
      alert("All products from the order have been added to your cart successfully!");
    } catch (err) {
      console.error("Add to cart error:", err);
      alert(err instanceof Error ? `Error adding to cart: ${err.message}` : "An unexpected error occurred");
    }
  };

  const handleCancelOrderConfirm = (orderId: number) => {
    setOrderToCancel(orderId);
    setShowCancelConfirmModal(true);
  };

  const handleCancelOrder = async () => {
    if (orderToCancel === null) return;

    try {
      const response = await fetch(`${backendUrl}/api/orders/${orderToCancel}/cancel/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to cancel order");
      setOrders(orders.map((order: Order) =>
        order.id === orderToCancel ? { ...order, status: "cancelled" } : order
      ));
      setOrderCounts((prev) => ({
        ...prev,
        PENDING: prev.PENDING - 1,
        CANCELLED: prev.CANCELLED + 1,
      }));
      setShowCancelConfirmModal(false);
      setShowCancelSuccessModal(true);
      setTimeout(() => {
        setShowCancelSuccessModal(false);
      }, 2000);
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Failed to cancel order. Please try again.");
    } finally {
      setOrderToCancel(null);
    }
  };

  const closeCancelConfirmModal = () => {
    setShowCancelConfirmModal(false);
    setOrderToCancel(null);
  };

  const closeCancelSuccessModal = () => {
    setShowCancelSuccessModal(false);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex flex-col md:flex-row">
          {/* Sidebar Skeleton */}
          <div className="w-full md:w-64 bg-black text-white flex flex-col justify-between md:min-h-screen">
            <div className="mt-4">
              <div className="w-[242px] h-[44px] mx-2 bg-gray-600 rounded-lg animate-pulse"></div>
              <div className="w-[242px] h-[44px] mx-2 mt-2 bg-gray-600 rounded-lg animate-pulse"></div>
            </div>
            <div className="p-4 mb-6 flex justify-center">
              <div className="w-full max-w-[242px] h-[50px] bg-gray-600 rounded-lg animate-pulse"></div>
            </div>
          </div>
          {/* Main Content Skeleton */}
          <div className="flex-1 p-4 md:p-8">
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <div className="h-8 w-1/4 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="flex flex-wrap gap-2 border-b mb-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mx-auto"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse ml-auto"></div>
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse ml-auto"></div>
                      <div className="flex justify-end space-x-2">
                        <div className="w-[142px] h-[40px] bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !token) {
    return null; // Redirect handled by useAuth or AuthGuard
  }

  const filteredOrders = orders.filter((order: Order) => {
    if (orderTab === "ONGOING") {
      return order.status === "processing";
    }
    return order.status.toLowerCase() === orderTab.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row relative">
        {/* Hamburger Menu Button for Mobile */}
        <div className="md:hidden p-4">
          <button onClick={toggleMenu} className="text-black focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Sidebar - Hamburger Menu on Mobile, Full Sidebar on Desktop */}
        <div className={`fixed inset-y-0 left-0 z-50 w-3/5 bg-black text-white flex flex-col justify-between transform transition-transform duration-300 md:static md:w-64 md:min-h-screen md:transition-none ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
          <div>
            <nav className="mt-4 flex flex-col items-start">
              <button
                onClick={() => { setActiveTab("my-orders"); setIsMenuOpen(false); }}
                className={`w-full h-[44px] text-left px-4 flex items-center space-x-3 rounded-lg ${
                  activeTab === "my-orders" ? "bg-yellow-500 text-black" : "text-white hover:bg-gray-800"
                }`}
              >
                <Image
                  src="/icons/package.png"
                  alt="My Orders Icon"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span>My Orders</span>
              </button>
              <button
                onClick={() => { setActiveTab("account-settings"); setIsMenuOpen(false); }}
                className={`w-full h-[44px] mt-2 text-left px-4 flex items-center space-x-3 rounded-lg ${
                  activeTab === "account-settings" ? "bg-yellow-500 text-black" : "text-white hover:bg-gray-800"
                }`}
              >
                <Image
                  src="/icons/settings.png"
                  alt="Account Settings Icon"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span>Account Settings</span>
              </button>
            </nav>
          </div>
          <div className="p-4 mb-6 flex justify-center">
            <button
              onClick={() => { logout(); setIsMenuOpen(false); }}
              className="w-full text-center px-4 py-3 flex items-center justify-center space-x-3 text-white hover:bg-gray-800 rounded-lg"
            >
              <Image
                src="/icons/log-out.png"
                alt="Logout Icon"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Overlay for Mobile Menu */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleMenu}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          {activeTab === "my-orders" && (
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">My Orders</h1>
              {/* Order Tabs */}
              <div className="flex flex-wrap gap-2 md:gap-4 border-b mb-4 overflow-x-auto">
                <button
                  onClick={() => setOrderTab("PENDING")}
                  className={
                    orderTab === "PENDING"
                      ? "px-3 py-2 text-sm font-medium whitespace-nowrap border-b-2 border-yellow-500 text-yellow-500"
                      : "px-3 py-2 text-sm font-medium whitespace-nowrap text-gray-500"
                  }
                >
                  PENDING ORDERS ( {orderCounts.PENDING} )
                </button>
                <button
                  onClick={() => setOrderTab("ONGOING")}
                  className={
                    orderTab === "ONGOING"
                      ? "px-3 py-2 text-sm font-medium whitespace-nowrap border-b-2 border-yellow-500 text-yellow-500"
                      : "px-3 py-2 text-sm font-medium whitespace-nowrap text-gray-500"
                  }
                >
                  ONGOING ORDERS ( {orderCounts.ONGOING} )
                </button>
                <button
                  onClick={() => setOrderTab("COMPLETED")}
                  className={
                    orderTab === "COMPLETED"
                      ? "px-3 py-2 text-sm font-medium whitespace-nowrap border-b-2 border-yellow-500 text-yellow-500"
                      : "px-3 py-2 text-sm font-medium whitespace-nowrap text-gray-500"
                  }
                >
                  COMPLETED ORDERS ( {orderCounts.COMPLETED} )
                </button>
                <button
                  onClick={() => setOrderTab("CANCELLED")}
                  className={
                    orderTab === "CANCELLED"
                      ? "px-3 py-2 text-sm font-medium whitespace-nowrap border-b-2 border-yellow-500 text-yellow-500"
                      : "px-3 py-2 text-sm font-medium whitespace-nowrap text-gray-500"
                  }
                >
                  CANCELLED ORDERS ( {orderCounts.CANCELLED} )
                </button>
              </div>

              {/* Order List */}
              <div className="space-y-4">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order: Order) => {
                    const firstItem = order.items[0];
                    const isCompletedOrCancelled = ["COMPLETED", "CANCELLED"].includes(order.status.toUpperCase());
                    const isPending = order.status.toLowerCase() === "pending";
                    const viewOrderLink = isPending
                      ? `/order/summary?orderId=${order.id}`
                      : `/order/view?orderId=${order.id}`;

                    return (
                      <div
                        key={order.id}
                        className="border p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        {/* Left Section: Image, Order Info */}
                        <div className="flex items-center space-x-4">
                          <div>
                            {firstItem.product.main_image ? (
                              <img
                                src={firstItem.product.main_image}
                                alt={firstItem.product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                                No Image
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-xs md:text-sm text-gray-500 capitalize">
                              {order.status === "processing" ? "ONGOING" : order.status}
                            </p>
                            <p className="font-medium text-sm md:text-base">
                              Order #{order.id} ({order.items.length} {order.items.length === 1 ? "item" : "items"})
                            </p>
                            <p className="text-xs md:text-sm text-gray-600">
                              First item: {firstItem.product.name}
                            </p>
                          </div>
                        </div>

                        {/* Center Section: Total Items */}
                        <div className="text-center">
                          <p className="text-xs md:text-sm text-gray-500">{order.items.length} Items</p>
                        </div>

                        {/* Right Section: Date, Total Amount, Buttons */}
                        <div className="text-right space-y-2">
                          <p className="text-xs md:text-sm text-gray-500">{formatDate(order.created_at)}</p>
                          <p className="font-medium text-sm md:text-base">₦{order.total_amount.toLocaleString()}</p>
                          <div className="flex justify-end space-x-2">
                            {order.status.toLowerCase() === "pending" && (
                              <button
                                onClick={() => handleCancelOrderConfirm(order.id)}
                                className="w-[120px] md:w-[142px] h-[36px] md:h-[40px] text-[#FF3B30] border border-[#FF3B30] bg-white rounded-[4px] text-xs md:text-sm"
                              >
                                Cancel Order
                              </button>
                            )}
                            {isCompletedOrCancelled ? (
                              <button
                                onClick={() => handleAddToCart(order.items)}
                                className="w-[120px] md:w-[142px] h-[36px] md:h-[40px] text-[#ECAA39] border border-[#ECAA39] bg-white rounded-[4px] text-xs md:text-sm"
                              >
                                Add to Cart
                              </button>
                            ) : (
                              <Link
                                href={viewOrderLink}
                                className="w-[120px] md:w-[142px] h-[36px] md:h-[40px] flex items-center justify-center text-[#ECAA39] border border-[#ECAA39] bg-white rounded-[4px] text-xs md:text-sm"
                              >
                                View Order
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <EmptyOrders status={orderTab} />
                )}
              </div>
            </div>
          )}
          {activeTab === "account-settings" && (
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Account Settings</h1>
              <p className="text-gray-500 text-sm">Account settings content will go here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-[400px] p-6 relative flex flex-col items-center shadow-lg">
            {/* Close Button */}
            <button onClick={closeCancelConfirmModal} className="absolute top-4 right-4">
              <Image
                src="/icons/x.png"
                alt="Close Modal"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>
            {/* Modal Content */}
            <div className="mb-4">
              <Image
                src="/icons/delete.png"
                alt="Delete Icon"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </div>
            <h2 className="text-lg font-semibold mb-6">Are you sure you want to cancel order?</h2>
            <div className="flex space-x-4">
              <button
                onClick={handleCancelOrder}
                className="w-[120px] h-[40px] border border-gray-300 rounded text-sm"
              >
                Yes
              </button>
              <button
                onClick={closeCancelConfirmModal}
                className="w-[120px] h-[40px] bg-[#ECAA39] text-white rounded text-sm"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Success Modal */}
      {showCancelSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-[527px] h-[266px] relative flex flex-col items-center justify-center shadow-lg">
            {/* Close Button */}
            <button onClick={closeCancelSuccessModal} className="absolute top-4 right-4">
              <Image
                src="/icons/x.png"
                alt="Close Modal"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>
            {/* Modal Content */}
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Image
                src="/icons/check.png"
                alt="Check Icon"
                width={40}
                height={40}
                className="w-10 h-10 tint-green"
              />
            </div>
            <h2 className="text-lg font-semibold">Order Cancelled</h2>
          </div>
        </div>
      )}
    </div>
  );
}