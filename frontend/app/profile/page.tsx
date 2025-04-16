
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

//   const handleAddToCart = async (item: OrderItem) => {
//     if (!token) {
//       alert("Please log in to add items to your cart.");
//       return;
//     }
//     const quantityNum = item.quantity;
//     if (!item.color || quantityNum <= 0) {
//       alert("Invalid item data: missing color or quantity.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("product_id", item.product.id.toString());
//     formData.append("quantity", quantityNum.toString());
//     formData.append("color", item.color || "");
//     if (item.additional_info) formData.append("additional_info", item.additional_info);

//     try {
//       const response = await axios.post(`${backendUrl}/api/cart/add_item/`, formData, {
//         headers: { Authorization: `Token ${token}` },
//       });
//       if (response.status === 201) {
//         alert("Product added to cart successfully!");
//       }
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       alert(err instanceof Error ? `Error adding to cart: ${err.message}` : "An unexpected error occurred");
//     }
//   };

//   const handleCancelOrder = async (orderId: number) => {
//     try {
//       const response = await fetch(`${backendUrl}/api/orders/${orderId}/cancel/`, {
//         method: "POST",
//         headers: {
//           Authorization: `Token ${token}`,
//         },
//       });
//       if (!response.ok) throw new Error("Failed to cancel order");
//       setOrders(orders.map((order: Order) =>
//         order.id === orderId ? { ...order, status: "cancelled" } : order
//       ));
//       setOrderCounts((prev) => ({
//         ...prev,
//         PENDING: prev.PENDING - 1,
//         CANCELLED: prev.CANCELLED + 1,
//       }));
//     } catch (error) {
//       console.error("Error cancelling order:", error);
//       alert("Failed to cancel order. Please try again.");
//     }
//   };

//   const formatDate = (dateString: string): string => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
//   };

//   if (loading) {
//     return <div>Loading...</div>;
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
//       <div className="flex flex-col md:flex-row">
//         {/* Sidebar */}
//         <div className="w-full md:w-64 bg-black text-white flex flex-col justify-between md:min-h-screen">
//           <div>
//             <nav className="mt-4">
//               <button
//                 onClick={() => setActiveTab("my-orders")}
//                 className={`w-[242px] h-[44px] mx-2 text-left px-4 flex items-center space-x-3 rounded-lg ${
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
//                 onClick={() => setActiveTab("account-settings")}
//                 className={`w-[242px] h-[44px] mx-2 mt-2 text-left px-4 flex items-center space-x-3 rounded-lg ${
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
//               onClick={logout}
//               className="w-full max-w-xs text-center px-4 py-3 flex items-center justify-center space-x-3 text-white hover:bg-gray-800 rounded-lg"
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
//                     return (
//                       <div
//                         key={order.id}
//                         className="border p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
//                       >
//                         {/* Left Section: Image, Name, Status */}
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
//                             <p className="text-sm text-gray-500 capitalize">
//                               {order.status === "processing" ? "ONGOING" : order.status}
//                             </p>
//                             <p className="font-medium">{firstItem.product.name}</p>
//                           </div>
//                         </div>

//                         {/* Center Section: Quantity */}
//                         <div className="text-center">
//                           <p className="text-sm text-gray-500">{firstItem.quantity}</p>
//                         </div>

//                         {/* Right Section: Date, Price, Buttons */}
//                         <div className="text-right space-y-2">
//                           <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
//                           <p className="font-medium">₦{firstItem.price.toLocaleString()}</p>
//                           <div className="flex justify-end space-x-2">
//                             {order.status.toLowerCase() === "pending" && (
//                               <button
//                                 onClick={() => handleCancelOrder(order.id)}
//                                 className="w-[142px] h-[40px] text-[#FF3B30] border border-[#FF3B30] bg-white rounded-[4px] text-sm"
//                               >
//                                 Cancel Order
//                               </button>
//                             )}
//                             {isCompletedOrCancelled ? (
//                               <button
//                                 onClick={() => handleAddToCart(firstItem)}
//                                 className="w-[142px] h-[40px] text-[#ECAA39] border border-[#ECAA39] bg-white rounded-[4px] text-sm"
//                               >
//                                 Add to Cart
//                               </button>
//                             ) : (
//                               <Link
//                                 href={`/order/summary?orderId=${order.id}`}
//                                 className="w-[142px] h-[40px] flex items-center justify-center text-[#ECAA39] border border-[#ECAA39] bg-white rounded-[4px] text-sm"
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
//                   <p className="text-gray-500">
//                     No {orderTab === "ONGOING" ? "ONGOING" : orderTab} orders found.
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}
//           {activeTab === "account-settings" && (
//             <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
//               <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Account Settings</h1>
//               <p className="text-gray-500">Account settings content will go here.</p>
//             </div>
//           )}
//         </div>
//       </div>
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

  const handleAddToCart = async (item: OrderItem) => {
    if (!token) {
      alert("Please log in to add items to your cart.");
      return;
    }
    const quantityNum = item.quantity;
    if (!item.color || quantityNum <= 0) {
      alert("Invalid item data: missing color or quantity.");
      return;
    }

    const formData = new FormData();
    formData.append("product_id", item.product.id.toString());
    formData.append("quantity", quantityNum.toString());
    formData.append("color", item.color || "");
    if (item.additional_info) formData.append("additional_info", item.additional_info);

    try {
      const response = await axios.post(`${backendUrl}/api/cart/add_item/`, formData, {
        headers: { Authorization: `Token ${token}` },
      });
      if (response.status === 201) {
        alert("Product added to cart successfully!");
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      alert(err instanceof Error ? `Error adding to cart: ${err.message}` : "An unexpected error occurred");
    }
  };

  const handleCancelOrder = async (orderId: number) => {
    try {
      const response = await fetch(`${backendUrl}/api/orders/${orderId}/cancel/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to cancel order");
      setOrders(orders.map((order: Order) =>
        order.id === orderId ? { ...order, status: "cancelled" } : order
      ));
      setOrderCounts((prev) => ({
        ...prev,
        PENDING: prev.PENDING - 1,
        CANCELLED: prev.CANCELLED + 1,
      }));
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Failed to cancel order. Please try again.");
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
  };

  if (loading) {
    return <div>Loading...</div>;
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
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-black text-white flex flex-col justify-between md:min-h-screen">
          <div>
            <nav className="mt-4">
              <button
                onClick={() => setActiveTab("my-orders")}
                className={`w-[242px] h-[44px] mx-2 text-left px-4 flex items-center space-x-3 rounded-lg ${
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
                onClick={() => setActiveTab("account-settings")}
                className={`w-[242px] h-[44px] mx-2 mt-2 text-left px-4 flex items-center space-x-3 rounded-lg ${
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
              onClick={logout}
              className="w-full max-w-xs text-center px-4 py-3 flex items-center justify-center space-x-3 text-white hover:bg-gray-800 rounded-lg"
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

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          {activeTab === "my-orders" && (
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">My Orders</h1>
              {/* Order Tabs */}
              <div className="flex flex-wrap gap-2 md:gap-4 border-b mb-4 overflow-x-auto">
                <button
                  onClick={() => setOrderTab("PENDING")}
                  className={`px-3 py-2 text-sm font-medium whitespace-nowrap ${
                    orderTab === "PENDING"
                      ? "border-b-2 border-yellow-500 text-yellow-500"
                      : "text-gray-500"
                  }`}
                >
                  PENDING ORDERS ( {orderCounts.PENDING} )
                </button>
                <button
                  onClick={() => setOrderTab("ONGOING")}
                  className={`px-3 py-2 text-sm font-medium whitespace-nowrap ${
                    orderTab === "ONGOING"
                      ? "border-b-2 border-yellow-500 text-yellow-500"
                      : "text-gray-500"
                  }`}
                >
                  ONGOING ORDERS ( {orderCounts.ONGOING} )
                </button>
                <button
                  onClick={() => setOrderTab("COMPLETED")}
                  className={`px-3 py-2 text-sm font-medium whitespace-nowrap ${
                    orderTab === "COMPLETED"
                      ? "border-b-2 border-yellow-500 text-yellow-500"
                      : "text-gray-500"
                  }`}
                >
                  COMPLETED ORDERS ( {orderCounts.COMPLETED} )
                </button>
                <button
                  onClick={() => setOrderTab("CANCELLED")}
                  className={`px-3 py-2 text-sm font-medium whitespace-nowrap ${
                    orderTab === "CANCELLED"
                      ? "border-b-2 border-yellow-500 text-yellow-500"
                      : "text-gray-500"
                  }`}
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
                    return (
                      <div
                        key={order.id}
                        className="border p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        {/* Left Section: Image, Name, Status */}
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
                            <p className="text-sm text-gray-500 capitalize">
                              {order.status === "processing" ? "ONGOING" : order.status}
                            </p>
                            <p className="font-medium">{firstItem.product.name}</p>
                          </div>
                        </div>

                        {/* Center Section: Quantity */}
                        <div className="text-center">
                          <p className="text-sm text-gray-500">{firstItem.quantity}</p>
                        </div>

                        {/* Right Section: Date, Price, Buttons */}
                        <div className="text-right space-y-2">
                          <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                          <p className="font-medium">₦{firstItem.price.toLocaleString()}</p>
                          <div className="flex justify-end space-x-2">
                            {order.status.toLowerCase() === "pending" && (
                              <button
                                onClick={() => handleCancelOrder(order.id)}
                                className="w-[142px] h-[40px] text-[#FF3B30] border border-[#FF3B30] bg-white rounded-[4px] text-sm"
                              >
                                Cancel Order
                              </button>
                            )}
                            {isCompletedOrCancelled ? (
                              <button
                                onClick={() => handleAddToCart(firstItem)}
                                className="w-[142px] h-[40px] text-[#ECAA39] border border-[#ECAA39] bg-white rounded-[4px] text-sm"
                              >
                                Add to Cart
                              </button>
                            ) : (
                              <Link
                                href={`/order/view?orderId=${order.id}`}
                                className="w-[142px] h-[40px] flex items-center justify-center text-[#ECAA39] border border-[#ECAA39] bg-white rounded-[4px] text-sm"
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
                  <p className="text-gray-500">
                    No {orderTab === "ONGOING" ? "ONGOING" : orderTab} ORDERS found.
                  </p>
                )}
              </div>
            </div>
          )}
          {activeTab === "account-settings" && (
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Account Settings</h1>
              <p className="text-gray-500">Account settings content will go here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}