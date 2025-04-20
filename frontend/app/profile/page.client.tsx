
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

// Interface for user data (aligned with backend UserSerializer)
interface UserData {
  full_name: string;
  phone_number: string;
  email: string;
  delivery_details: {
    address: string;
    city: string;
    state: string;
    postcode: string | null;
  } | null; // Allow null for users without delivery details
}

// Interface for address form data
interface AddressFormData {
  address: string;
  city: string;
  state: string;
  postcode: string | null;
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for Account Settings
  const [userData, setUserData] = useState<UserData>({
    full_name: "",
    phone_number: "",
    email: "",
    delivery_details: null, // Initialize as null
  });
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_new_password: "",
  });
  const [addressFormData, setAddressFormData] = useState<AddressFormData>({
    address: "",
    city: "",
    state: "",
    postcode: "",
  });
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showUpdateSuccessModal, setShowUpdateSuccessModal] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | string[] }>({});

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
  if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
    console.warn("NEXT_PUBLIC_BACKEND_URL is not set. Using default:", backendUrl);
  }

  // Fetch user data when the component mounts
  useEffect(() => {
    if (loading || !user || !token) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/accounts/user/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch user data");
        }
        const data: UserData = await response.json();
        setUserData(data);
        setAddressFormData(data.delivery_details || { address: "", city: "", state: "", postcode: "" });
      } catch (error: any) {
        console.error("Error fetching user data:", error);
        setErrors({ general: error.message || "Failed to fetch user data" });
      }
    };

    fetchUserData();
  }, [user, token, loading, backendUrl]);

  // Fetch orders
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

  // Handle user data form changes
  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle password form changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle address form changes
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle user data update
  const handleUserDataUpdate = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/accounts/user/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          full_name: userData.full_name,
          phone_number: userData.phone_number,
          email: userData.email,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData);
        throw new Error("Failed to update user data");
      }
      setErrors({});
      setShowUpdateSuccessModal(true);
      setTimeout(() => setShowUpdateSuccessModal(false), 2000);
    } catch (error) {
      console.error("Error updating user data:", error);
      setErrors({ general: "Failed to update user data. Please try again." });
    }
  };

  // Handle password update
  const handlePasswordUpdate = async () => {
    if (passwordData.new_password !== passwordData.confirm_new_password) {
      setErrors({ confirm_new_password: "Passwords do not match" });
      return;
    }
    if (passwordData.new_password.length < 8) {
      setErrors({ new_password: "Password must be at least 8 characters long" });
      return;
    }
    try {
      const response = await fetch(`${backendUrl}/api/accounts/change-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          current_password: passwordData.current_password,
          new_password: passwordData.new_password,
          confirm_password: passwordData.confirm_new_password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData);
        throw new Error("Failed to update password");
      }
      const data = await response.json();
      setErrors({});
      setPasswordData({ current_password: "", new_password: "", confirm_new_password: "" });
      setShowUpdateSuccessModal(true);
      setTimeout(() => setShowUpdateSuccessModal(false), 2000);
    } catch (error) {
      console.error("Error updating password:", error);
      setErrors({ general: "Failed to update password. Please try again." });
    }
  };

  // Handle address update
  const handleAddressUpdate = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/accounts/delivery-details/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(addressFormData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData);
        throw new Error("Failed to update address");
      }
      setUserData((prev) => ({ ...prev, delivery_details: addressFormData }));
      setShowAddressModal(false);
      setShowUpdateSuccessModal(true);
      setTimeout(() => setShowUpdateSuccessModal(false), 2000);
    } catch (error) {
      console.error("Error updating address:", error);
      setErrors({ general: "Failed to update address. Please try again." });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
    await handleUserDataUpdate();
    if (
      passwordData.current_password ||
      passwordData.new_password ||
      passwordData.confirm_new_password
    ) {
      await handlePasswordUpdate();
    }
    setIsSubmitting(false);
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
    return null; // Redirect handled by useAuth
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
              <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">My Account Overview</h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Edit Account Details */}
                  <div className="border rounded-lg p-4">
                    <h2 className="text-lg font-semibold mb-4">Edit Account Details</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                          type="text"
                          name="full_name"
                          value={userData.full_name}
                          onChange={handleUserDataChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                          required
                        />
                        {errors.full_name && (
                          <p className="text-red-500 text-sm mt-1">
                            {Array.isArray(errors.full_name) ? errors.full_name.join(", ") : errors.full_name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                          type="tel"
                          name="phone_number"
                          value={userData.phone_number}
                          onChange={handleUserDataChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                          required
                        />
                        {errors.phone_number && (
                          <p className="text-red-500 text-sm mt-1">
                            {Array.isArray(errors.phone_number) ? errors.phone_number.join(", ") : errors.phone_number}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">E-mail Address</label>
                        <input
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={handleUserDataChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                          required
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {Array.isArray(errors.email) ? errors.email.join(", ") : errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Edit Password */}
                  <div className="border rounded-lg p-4">
                    <h2 className="text-lg font-semibold mb-4">Edit Password</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Current Password</label>
                        <input
                          type="password"
                          name="current_password"
                          value={passwordData.current_password}
                          onChange={handlePasswordChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                        {errors.current_password && (
                          <p className="text-red-500 text-sm mt-1">
                            {Array.isArray(errors.current_password) ? errors.current_password.join(", ") : errors.current_password}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                          type="password"
                          name="new_password"
                          value={passwordData.new_password}
                          onChange={handlePasswordChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                        {errors.new_password && (
                          <p className="text-red-500 text-sm mt-1">
                            {Array.isArray(errors.new_password) ? errors.new_password.join(", ") : errors.new_password}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input
                          type="password"
                          name="confirm_new_password"
                          value={passwordData.confirm_new_password}
                          onChange={handlePasswordChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                        {errors.confirm_new_password && (
                          <p className="text-red-500 text-sm mt-1">
                            {Array.isArray(errors.confirm_new_password) ? errors.confirm_new_password.join(", ") : errors.confirm_new_password}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Delivery Address</h2>
                    <button
                      type="button"
                      onClick={() => setShowAddressModal(true)}
                      className="text-yellow-500 border border-yellow-500 rounded px-4 py-2 text-sm"
                    >
                      {userData.delivery_details ? "Edit Address" : "Add Address"}
                    </button>
                  </div>
                  {userData.delivery_details ? (
                    <p className="text-sm text-gray-600">
                      Default Address: {userData.delivery_details.address || "Not set"}, {userData.delivery_details.city || "Not set"}, {userData.delivery_details.state || "Not set"}
                      {userData.delivery_details.postcode && `, ${userData.delivery_details.postcode}`}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600">
                      No address set. Click "Add Address" to provide your delivery details.
                    </p>
                  )}
                </div>

                {/* General Error */}
                {errors.general && (
                  <p className="text-red-500 text-sm">
                    {Array.isArray(errors.general) ? errors.general.join(", ") : errors.general}
                  </p>
                )}

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-yellow-500 text-white rounded px-6 py-2 hover:bg-yellow-600 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-[400px] p-6 relative flex flex-col items-center shadow-lg">
            <button onClick={closeCancelConfirmModal} className="absolute top-4 right-4">
              <Image
                src="/icons/x.png"
                alt="Close Modal"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>
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
            <button onClick={closeCancelSuccessModal} className="absolute top-4 right-4">
              <Image
                src="/icons/x.png"
                alt="Close Modal"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>
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

      {/* Address Edit Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-[400px] p-6 relative flex flex-col shadow-lg">
            <button onClick={() => setShowAddressModal(false)} className="absolute top-4 right-4">
              <Image
                src="/icons/x.png"
                alt="Close Modal"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>
            <h2 className="text-lg font-semibold mb-4">{userData.delivery_details ? "Edit Delivery Address" : "Add Delivery Address"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={addressFormData.address}
                  onChange={handleAddressChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {Array.isArray(errors.address) ? errors.address.join(", ") : errors.address}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={addressFormData.city}
                  onChange={handleAddressChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {Array.isArray(errors.city) ? errors.city.join(", ") : errors.city}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  name="state"
                  value={addressFormData.state}
                  onChange={handleAddressChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {Array.isArray(errors.state) ? errors.state.join(", ") : errors.state}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Postcode (Optional)</label>
                <input
                  type="text"
                  name="postcode"
                  value={addressFormData.postcode || ""}
                  onChange={handleAddressChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                {errors.postcode && (
                  <p className="text-red-500 text-sm mt-1">
                    {Array.isArray(errors.postcode) ? errors.postcode.join(", ") : errors.postcode}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleAddressUpdate}
                className="bg-yellow-500 text-white rounded px-6 py-2 hover:bg-yellow-600"
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Success Modal */}
      {showUpdateSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-[527px] h-[266px] relative flex flex-col items-center justify-center shadow-lg">
            <button onClick={() => setShowUpdateSuccessModal(false)} className="absolute top-4 right-4">
              <Image
                src="/icons/x.png"
                alt="Close Modal"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Image
                src="/icons/check.png"
                alt="Check Icon"
                width={40}
                height={40}
                className="w-10 h-10 tint-green"
              />
            </div>
            <h2 className="text-lg font-semibold">Changes Saved Successfully</h2>
          </div>
        </div>
      )}
    </div>
  );
}