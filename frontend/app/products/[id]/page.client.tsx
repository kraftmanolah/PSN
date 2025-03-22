

// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useAuth } from "@/app/hooks/useAuth";
// import axios from "axios";
// import { notFound } from "next/navigation";
// import ProductSpecifications from "@/app/components/ProductSpecifications";
// import DesignSpecifications from "@/app/components/DesignSpecifications";
// import FeaturedProduct from "@/app/components/FeaturedProduct"; // Import FeaturedProduct
// import Navbar from "@/app/components/Navbar"; // Import Navbar
// import Footer from "@/app/components/Footer"; // Import Footer
// import { CirclePicker, ColorResult } from "react-color";
// import { Product, CartItem } from "@/types/product";
// import * as React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
// import Breadcrumbs from "@/app/components/Breadcrumbs";

// interface Params {
//   id: string;
// }

// const ProductDetailsSkeleton: React.FC = () => (
//   <div className="min-h-screen flex items-center justify-center bg-gray-50">
//     <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 w-full max-w-2xl mx-auto animate-pulse">
//       <div className="bg-gray-200 h-[500px] rounded-lg"></div>
//       <div className="mt-6 space-y-4">
//         <div className="bg-gray-200 h-6 w-3/4 mx-auto rounded"></div>
//         <div className="bg-gray-200 h-6 w-1/2 mx-auto rounded"></div>
//         <div className="bg-gray-200 h-6 w-1/3 mx-auto rounded"></div>
//         <div className="flex gap-2 justify-center">
//           <div className="bg-gray-200 h-12 w-12 rounded-full"></div>
//           <div className="bg-gray-200 h-12 w-12 rounded-full"></div>
//           <div className="bg-gray-200 h-12 w-12 rounded-full"></div>
//         </div>
//         <div className="flex gap-2 justify-center">
//           <div className="bg-gray-200 h-10 w-16 rounded"></div>
//           <div className="bg-gray-200 h-10 w-16 rounded"></div>
//           <div className="bg-gray-200 h-10 w-32 rounded"></div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const ProductDetails: React.FC<{ initialProduct?: Product | null | undefined }> = ({ initialProduct }) => {
//   const params = useParams() as unknown as Params;
//   const { id } = params;
//   const productId = parseInt(id, 10);
//   const { token } = useAuth();
//   const router = useRouter();
//   const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

//   const [product, setProduct] = useState<Product | null>(initialProduct || null);
//   const [selectedColor, setSelectedColor] = useState<string>("#000000");
//   const [selectedColorName, setSelectedColorName] = useState<string>("Black");
//   const [quantity, setQuantity] = useState<number | string>(initialProduct?.increment_step || 1);
//   const [activeTab, setActiveTab] = useState<"product" | "design">("product");
//   const [activeThumbnail, setActiveThumbnail] = useState<string | null>(null);
//   const [designFile, setDesignFile] = useState<File | null>(null);
//   const [additionalInfo, setAdditionalInfo] = useState<string>("");
//   const [cartItem, setCartItem] = useState<CartItem | null>(null);
//   const [cartId, setCartId] = useState<number | null>(null);
//   const [isEditingInfo, setIsEditingInfo] = useState<boolean>(false);
//   const [imageError, setImageError] = useState<boolean>(false);
//   const [imageLoading, setImageLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchProductAndCart = async () => {
//       try {
//         const [productResponse, cartResponse] = await Promise.all([
//           !initialProduct
//             ? axios.get(`${backendUrl}/api/products/${productId}/details/`, {
//                 headers: { ...(token && { Authorization: `Token ${token}` }) },
//               })
//             : Promise.resolve({ data: initialProduct }),
//           token
//             ? axios.get(`${backendUrl}/api/cart/`, {
//                 headers: { Authorization: `Token ${token}` },
//               })
//             : Promise.resolve({ data: null }),
//         ]);

//         const productData = productResponse.data;
//         setProduct(productData);
//         const defaultColor = productData.colors[0];
//         if (defaultColor) {
//           setSelectedColor(isHexCode(defaultColor) ? defaultColor : colorNameToHex(defaultColor));
//           setSelectedColorName(defaultColor);
//         }
//         const initialImage = productData.main_image || (productData.thumbnails.length > 0 ? productData.thumbnails[0].image : "");
//         setActiveThumbnail(initialImage);
//         setQuantity(productData.increment_step || 1);
//         setAdditionalInfo("");
//         setDesignFile(null);

//         if (cartResponse.data) {
//           setCartId(cartResponse.data.id);
//           const existingItem = cartResponse.data.items.find((item: CartItem) => item.product.id === productId);
//           if (existingItem) {
//             setCartItem(existingItem);
//             setAdditionalInfo(existingItem.additional_info || "");
//             setQuantity(existingItem.quantity);
//             setSelectedColorName(existingItem.color || defaultColor);
//           } else {
//             setCartItem(null);
//           }
//         }
//       } catch (err) {
//         if (axios.isAxiosError(err) && err.response?.status === 404) {
//           notFound();
//         } else {
//           console.error("Fetch error:", err);
//         }
//       }
//     };
//     fetchProductAndCart();
//   }, [productId, backendUrl, token, initialProduct]);

//   const isHexCode = (color: string) => /^#([0-9A-F]{3}){1,2}$/i.test(color);

//   const colorNameToHex = (color: string) => {
//     switch (color.toLowerCase()) {
//       case "red": return "#FF0000";
//       case "green": return "#00FF00";
//       case "blue": return "#0000FF";
//       default: return "#000000";
//     }
//   };

//   const handleColorChange = (color: ColorResult) => {
//     setSelectedColor(color.hex);
//     const selected = product?.colors.find((c) => {
//       const hex = isHexCode(c) ? c : colorNameToHex(c);
//       return hex === color.hex;
//     });
//     setSelectedColorName(selected || "Black");
//   };

//   const getIncrementStep = () => product?.increment_step || 1;

//   const handleQuantityChange = (value: string) => {
//     const step = getIncrementStep();
//     const numValue = parseInt(value, 10);
//     if (isNaN(numValue)) setQuantity(step);
//     else setQuantity(Math.max(step, Math.ceil(numValue / step) * step));
//   };

//   const incrementQuantity = () => {
//     const step = getIncrementStep();
//     const current = typeof quantity === "string" ? parseInt(quantity, 10) : quantity;
//     setQuantity(current + step);
//   };

//   const decrementQuantity = () => {
//     const step = getIncrementStep();
//     const current = typeof quantity === "string" ? parseInt(quantity, 10) : quantity;
//     setQuantity(Math.max(step, current - step));
//   };

//   const addItemToCart = async (): Promise<boolean> => {
//     if (!token) {
//       alert("Please log in to add items to your cart.");
//       return false;
//     }
//     const quantityNum = typeof quantity === "string" ? parseInt(quantity, 10) : quantity;
//     if (!selectedColor || quantityNum <= 0) {
//       alert("Please select a color and enter a valid quantity.");
//       return false;
//     }

//     const formData = new FormData();
//     formData.append("product_id", productId.toString());
//     formData.append("quantity", quantityNum.toString());
//     formData.append("color", selectedColorName);
//     if (designFile) formData.append("design_file", designFile);
//     if (additionalInfo) formData.append("additional_info", additionalInfo);

//     try {
//       const response = await axios.post(`${backendUrl}/api/cart/add_item/`, formData, {
//         headers: { Authorization: `Token ${token}` },
//       });
//       if (response.status === 201) {
//         setCartItem(response.data);
//         const cartResponse = await axios.get(`${backendUrl}/api/cart/`, {
//           headers: { Authorization: `Token ${token}` },
//         });
//         setCartId(cartResponse.data.id);
//         return true;
//       }
//       return false;
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       alert(err instanceof Error ? `Error adding to cart: ${err.message}` : "An unexpected error occurred");
//       return false;
//     }
//   };

//   const updateCartItem = async (updateData: FormData): Promise<boolean> => {
//     if (!token) {
//       alert("Please log in to update your cart.");
//       return false;
//     }

//     if (!cartId || !cartItem?.id) {
//       console.warn("Cart ID or Cart Item ID not available to update.");
//       return false;
//     }

//     try {
//       const response = await axios.put(`${backendUrl}/api/cart/${cartId}/items/${cartItem.id}/update/`, updateData, {
//         headers: { Authorization: `Token ${token}` },
//       });
//       if (response.status === 200) {
//         return true;
//       }
//       return false;
//     } catch (err) {
//       console.error("Update cart error:", err);
//       if (axios.isAxiosError(err) && err.response?.status === 404) {
//         alert("Cart item not found. It may have been removed. Please add the item to the cart again.");
//       } else {
//         alert(err instanceof Error ? `Error updating cart: ${err.message}` : "An unexpected error occurred");
//       }
//       return false;
//     }
//   };

//   const handleAddToCart = async () => {
//     const success = await addItemToCart();
//     if (success) {
//       alert(`Item ${cartItem ? "updated" : "added"} to cart successfully${designFile ? " with design" : ""}!`);
//       setQuantity(product?.increment_step || 1);
//       setDesignFile(null);
//       setAdditionalInfo("");
//       setIsEditingInfo(false);
//       router.push("/cart?refresh=true");
//     }
//   };

//   const handleProceedToCart = async () => {
//     const success = await addItemToCart();
//     if (success) {
//       router.push("/cart?refresh=true");
//     }
//   };

//   const handleDeleteFile = async () => {
//     setDesignFile(null);
//     if (cartItem?.design_file) {
//       const formData = new FormData();
//       formData.append("product_id", productId.toString());
//       formData.append("quantity", (typeof quantity === "string" ? parseInt(quantity, 10) : quantity).toString());
//       formData.append("color", selectedColorName);
//       formData.append("additional_info", additionalInfo || "");
//       formData.append("design_file", "");
//       const success = await updateCartItem(formData);
//       if (success) {
//         setCartItem((prev) => (prev ? { ...prev, design_file: "" } : null));
//       }
//     }
//   };

//   const handleDeleteInfo = async () => {
//     setAdditionalInfo("");
//     setIsEditingInfo(false);
//     if (cartItem?.additional_info) {
//       const formData = new FormData();
//       formData.append("product_id", productId.toString());
//       formData.append("quantity", (typeof quantity === "string" ? parseInt(quantity, 10) : quantity).toString());
//       formData.append("color", selectedColorName);
//       if (designFile) formData.append("design_file", designFile);
//       formData.append("additional_info", "");
//       const success = await updateCartItem(formData);
//       if (success) {
//         setCartItem((prev) => (prev ? { ...prev, additional_info: "" } : null));
//       }
//     }
//   };

//   const handleEditInfo = () => {
//     setIsEditingInfo(true);
//   };

//   const handleSaveInfo = async () => {
//     setIsEditingInfo(false);
//     if (cartItem) {
//       const formData = new FormData();
//       formData.append("product_id", productId.toString());
//       formData.append("quantity", (typeof quantity === "string" ? parseInt(quantity, 10) : quantity).toString());
//       formData.append("color", selectedColorName);
//       if (designFile) formData.append("design_file", designFile);
//       formData.append("additional_info", additionalInfo);
//       const success = await updateCartItem(formData);
//       if (success) {
//         setCartItem((prev) => (prev ? { ...prev, additional_info: additionalInfo } : null));
//       }
//     }
//   };

//   if (!product) return <ProductDetailsSkeleton />;

//   const productColors = [...new Set(product.colors.map((color) => (isHexCode(color) ? color : colorNameToHex(color))))];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Full-width container with responsive margins */}
//       <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16 py-6 sm:py-8">
//         {/* Breadcrumbs with matching margins */}
//         <div className="mx-0">
//           <Breadcrumbs productName={product.name} />
//         </div>
//         {/* Main content */}
//         <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
//           {/* Image Section */}
//           <div className="flex flex-col items-center">
//             {imageLoading && (
//               <div className="w-full aspect-square max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] bg-gray-200 rounded-lg flex items-center justify-center animate-pulse">
//                 <span>Loading...</span>
//               </div>
//             )}
//             {(activeThumbnail && !imageError) ? (
//               <img
//                 src={activeThumbnail}
//                 alt={product.name}
//                 className={`w-full aspect-square max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] object-cover rounded-lg shadow-lg ${imageLoading ? "hidden" : "block"}`}
//                 onLoad={() => setImageLoading(false)}
//                 onError={() => {
//                   setImageError(true);
//                   setImageLoading(false);
//                 }}
//               />
//             ) : (
//               <div className="w-full aspect-square max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
//                 No Image Available
//               </div>
//             )}
//             <div className="flex flex-wrap justify-center mt-4 gap-2">
//               {product.thumbnails.map((thumbnail) => (
//                 <img
//                   key={thumbnail.id}
//                   src={thumbnail.image}
//                   alt={`${product.name} thumbnail`}
//                   className={`w-16 h-16 sm:w-20 sm:h-20 cursor-pointer rounded-lg border-2 ${
//                     activeThumbnail === thumbnail.image ? "border-yellow-500" : "border-transparent"
//                   }`}
//                   onClick={() => {
//                     setActiveThumbnail(thumbnail.image);
//                     setImageError(false);
//                     setImageLoading(true);
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//           {/* Product Details Section */}
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>
//             <p className="text-lg sm:text-xl mt-2">
//               {product.currency}{parseFloat(product.price).toLocaleString()}{" "}
//               <span className="text-gray-500 text-sm sm:text-base">{product.description}</span>
//             </p>
//             <p className="mt-4 text-gray-600 text-sm sm:text-base">{product.product_description}</p>
//             <div className="mt-4">
//               <label className="font-semibold text-sm sm:text-base">Quantity:</label>
//               <div className="flex items-center gap-2 mt-2">
//                 <button
//                   className="px-2 sm:px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200"
//                   onClick={decrementQuantity}
//                 >
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   value={quantity}
//                   onChange={(e) => handleQuantityChange(e.target.value)}
//                   min={getIncrementStep()}
//                   className="w-14 sm:w-16 text-center border rounded-lg p-1 text-sm sm:text-base"
//                 />
//                 <button
//                   className="px-2 sm:px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200"
//                   onClick={incrementQuantity}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//             <div className="mt-4">
//               <label className="font-semibold text-sm sm:text-base">Select Color:</label>
//               <div className="mt-2">
//                 <CirclePicker
//                   color={selectedColor}
//                   colors={productColors}
//                   onChange={handleColorChange}
//                   circleSize={24}
//                   circleSpacing={8}
//                   className="flex flex-wrap gap-2"
//                 />
//               </div>
//             </div>
//             <button
//               onClick={handleAddToCart}
//               className="mt-6 w-full sm:w-auto bg-yellow-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-lg font-semibold hover:bg-yellow-600"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//         {/* Tabs and Specifications Section */}
//         <div className="mt-8 sm:mt-12">
//           <div className="flex border-b">
//             <button
//               className={`px-3 sm:px-4 py-2 text-sm sm:text-lg font-semibold ${
//                 activeTab === "product" ? "border-b-2 border-yellow-500 text-yellow-500" : "text-gray-500"
//               }`}
//               onClick={() => setActiveTab("product")}
//             >
//               Product Specifications
//             </button>
//             <button
//               className={`px-3 sm:px-4 py-2 text-sm sm:text-lg font-semibold ${
//                 activeTab === "design" ? "border-b-2 border-yellow-500 text-yellow-500" : "text-gray-500"
//               }`}
//               onClick={() => setActiveTab("design")}
//             >
//               Design Specifications
//             </button>
//           </div>
//           {activeTab === "product" ? (
//             <ProductSpecifications features={product.features} />
//           ) : (
//             <>
//               <DesignSpecifications
//                 setDesignFile={setDesignFile}
//                 setAdditionalInfo={setAdditionalInfo}
//                 designFile={designFile}
//                 additionalInfo={additionalInfo}
//                 isEditingInfo={isEditingInfo}
//                 onSaveInfo={handleSaveInfo}
//                 onEditInfo={handleEditInfo}
//                 setIsEditingInfo={setIsEditingInfo}
//               />
//               {(designFile || cartItem?.design_file || additionalInfo) && (
//                 <div className="mt-4">
//                   {(designFile || cartItem?.design_file) && (
//                     <div className="mb-2 flex items-center">
//                       <strong className="text-sm sm:text-base">Current Design File:</strong>
//                       <span className="text-blue-500 ml-2 underline text-sm sm:text-base">
//                         {designFile ? designFile.name : cartItem?.design_file?.split("/").pop()}
//                       </span>
//                       <button
//                         onClick={handleDeleteFile}
//                         className="ml-2 text-red-500 hover:text-red-700"
//                       >
//                         <FontAwesomeIcon icon={faTrash} />
//                       </button>
//                     </div>
//                   )}
//                   {additionalInfo && (
//                     <div className="mt-2 p-2 border border-gray-300 rounded-md">
//                       <p className="text-sm text-gray-700">{additionalInfo}</p>
//                       <div className="mt-2 flex space-x-2">
//                         <button
//                           onClick={handleEditInfo}
//                           className="text-blue-500 hover:text-blue-700"
//                         >
//                           <FontAwesomeIcon icon={faPencilAlt} />
//                         </button>
//                         <button
//                           onClick={handleDeleteInfo}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           <FontAwesomeIcon icon={faTrash} />
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </>
//           )}
//           <div className="flex justify-end mt-4 sm:mt-6">
//             <button
//               onClick={handleProceedToCart}
//               className="w-full sm:w-auto bg-yellow-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-lg font-semibold hover:bg-yellow-600"
//             >
//               Proceed to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import axios from "axios";
import { notFound } from "next/navigation";
import ProductSpecifications from "@/app/components/ProductSpecifications";
import DesignSpecifications from "@/app/components/DesignSpecifications";
import FeaturedProduct from "@/app/components/FeaturedProduct";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { CirclePicker, ColorResult } from "react-color";
import { Product, CartItem } from "@/types/product";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import Breadcrumbs from "@/app/components/Breadcrumbs";

interface Params {
  id: string;
}

const ProductDetailsSkeleton: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 w-full max-w-2xl mx-auto animate-pulse">
      <div className="bg-gray-200 h-[500px] rounded-lg"></div>
      <div className="mt-6 space-y-4">
        <div className="bg-gray-200 h-6 w-3/4 mx-auto rounded"></div>
        <div className="bg-gray-200 h-6 w-1/2 mx-auto rounded"></div>
        <div className="bg-gray-200 h-6 w-1/3 mx-auto rounded"></div>
        <div className="flex gap-2 justify-center">
          <div className="bg-gray-200 h-12 w-12 rounded-full"></div>
          <div className="bg-gray-200 h-12 w-12 rounded-full"></div>
          <div className="bg-gray-200 h-12 w-12 rounded-full"></div>
        </div>
        <div className="flex gap-2 justify-center">
          <div className="bg-gray-200 h-10 w-16 rounded"></div>
          <div className="bg-gray-200 h-10 w-16 rounded"></div>
          <div className="bg-gray-200 h-10 w-32 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

const ProductDetails: React.FC<{ initialProduct?: Product | null | undefined }> = ({ initialProduct }) => {
  const params = useParams() as unknown as Params;
  const { id } = params;
  const productId = parseInt(id, 10);
  const { token } = useAuth();
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const [product, setProduct] = useState<Product | null>(initialProduct || null);
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [selectedColorName, setSelectedColorName] = useState<string>("Black");
  const [quantity, setQuantity] = useState<number | string>(initialProduct?.increment_step || 1);
  const [activeTab, setActiveTab] = useState<"product" | "design">("product");
  const [activeThumbnail, setActiveThumbnail] = useState<string | null>(null);
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const [cartId, setCartId] = useState<number | null>(null);
  const [isEditingInfo, setIsEditingInfo] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductAndCart = async () => {
      try {
        const [productResponse, cartResponse] = await Promise.all([
          !initialProduct
            ? axios.get(`${backendUrl}/api/products/${productId}/details/`, {
                headers: { ...(token && { Authorization: `Token ${token}` }) },
              })
            : Promise.resolve({ data: initialProduct }),
          token
            ? axios.get(`${backendUrl}/api/cart/`, {
                headers: { Authorization: `Token ${token}` },
              })
            : Promise.resolve({ data: null }),
        ]);

        const productData = productResponse.data;
        setProduct(productData);
        const defaultColor = productData.colors[0];
        if (defaultColor) {
          setSelectedColor(isHexCode(defaultColor) ? defaultColor : colorNameToHex(defaultColor));
          setSelectedColorName(defaultColor);
        }
        const initialImage = productData.main_image || (productData.thumbnails.length > 0 ? productData.thumbnails[0].image : "");
        setActiveThumbnail(initialImage);
        setQuantity(productData.increment_step || 1);
        setAdditionalInfo("");
        setDesignFile(null);

        if (cartResponse.data) {
          setCartId(cartResponse.data.id);
          const existingItem = cartResponse.data.items.find((item: CartItem) => item.product.id === productId);
          if (existingItem) {
            setCartItem(existingItem);
            setAdditionalInfo(existingItem.additional_info || "");
            setQuantity(existingItem.quantity);
            setSelectedColorName(existingItem.color || defaultColor);
          } else {
            setCartItem(null);
          }
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          notFound();
        } else {
          console.error("Fetch error:", err);
        }
      }
    };
    fetchProductAndCart();
  }, [productId, backendUrl, token, initialProduct]);

  const isHexCode = (color: string) => /^#([0-9A-F]{3}){1,2}$/i.test(color);

  const colorNameToHex = (color: string) => {
    switch (color.toLowerCase()) {
      case "red": return "#FF0000";
      case "green": return "#00FF00";
      case "blue": return "#0000FF";
      default: return "#000000";
    }
  };

  const handleColorChange = (color: ColorResult) => {
    setSelectedColor(color.hex);
    const selected = product?.colors.find((c) => {
      const hex = isHexCode(c) ? c : colorNameToHex(c);
      return hex === color.hex;
    });
    setSelectedColorName(selected || "Black");
  };

  const getIncrementStep = () => product?.increment_step || 1;

  const handleQuantityChange = (value: string) => {
    const step = getIncrementStep();
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) setQuantity(step);
    else setQuantity(Math.max(step, Math.ceil(numValue / step) * step));
  };

  const incrementQuantity = () => {
    const step = getIncrementStep();
    const current = typeof quantity === "string" ? parseInt(quantity, 10) : quantity;
    setQuantity(current + step);
  };

  const decrementQuantity = () => {
    const step = getIncrementStep();
    const current = typeof quantity === "string" ? parseInt(quantity, 10) : quantity;
    setQuantity(Math.max(step, current - step));
  };

  const addItemToCart = async (): Promise<boolean> => {
    if (!token) {
      alert("Please log in to add items to your cart.");
      return false;
    }
    const quantityNum = typeof quantity === "string" ? parseInt(quantity, 10) : quantity;
    if (!selectedColor || quantityNum <= 0) {
      alert("Please select a color and enter a valid quantity.");
      return false;
    }

    const formData = new FormData();
    formData.append("product_id", productId.toString());
    formData.append("quantity", quantityNum.toString());
    formData.append("color", selectedColorName);
    if (designFile) formData.append("design_file", designFile);
    if (additionalInfo) formData.append("additional_info", additionalInfo);

    try {
      const response = await axios.post(`${backendUrl}/api/cart/add_item/`, formData, {
        headers: { Authorization: `Token ${token}` },
      });
      if (response.status === 201) {
        setCartItem(response.data);
        const cartResponse = await axios.get(`${backendUrl}/api/cart/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setCartId(cartResponse.data.id);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Add to cart error:", err);
      alert(err instanceof Error ? `Error adding to cart: ${err.message}` : "An unexpected error occurred");
      return false;
    }
  };

  const updateCartItem = async (updateData: FormData): Promise<boolean> => {
    if (!token) {
      alert("Please log in to update your cart.");
      return false;
    }

    if (!cartId || !cartItem?.id) {
      console.warn("Cart ID or Cart Item ID not available to update.");
      return false;
    }

    try {
      const response = await axios.put(`${backendUrl}/api/cart/${cartId}/items/${cartItem.id}/update/`, updateData, {
        headers: { Authorization: `Token ${token}` },
      });
      if (response.status === 200) {
        return true;
      }
      return false;
    } catch (err) {
      console.error("Update cart error:", err);
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        alert("Cart item not found. It may have been removed. Please add the item to the cart again.");
      } else {
        alert(err instanceof Error ? `Error updating cart: ${err.message}` : "An unexpected error occurred");
      }
      return false;
    }
  };

  const handleAddToCart = async () => {
    const success = await addItemToCart();
    if (success) {
      alert(`Item ${cartItem ? "updated" : "added"} to cart successfully${designFile ? " with design" : ""}!`);
      setQuantity(product?.increment_step || 1);
      setDesignFile(null);
      setAdditionalInfo("");
      setIsEditingInfo(false);
      router.push("/cart?refresh=true");
    }
  };

  const handleProceedToCart = async () => {
    const success = await addItemToCart();
    if (success) {
      router.push("/cart?refresh=true");
    }
  };

  const handleDeleteFile = async () => {
    setDesignFile(null);
    if (cartItem?.design_file) {
      const formData = new FormData();
      formData.append("product_id", productId.toString());
      formData.append("quantity", (typeof quantity === "string" ? parseInt(quantity, 10) : quantity).toString());
      formData.append("color", selectedColorName);
      formData.append("additional_info", additionalInfo || "");
      formData.append("design_file", "");
      const success = await updateCartItem(formData);
      if (success) {
        setCartItem((prev) => (prev ? { ...prev, design_file: "" } : null));
      }
    }
  };

  const handleDeleteInfo = async () => {
    setAdditionalInfo("");
    setIsEditingInfo(false);
    if (cartItem?.additional_info) {
      const formData = new FormData();
      formData.append("product_id", productId.toString());
      formData.append("quantity", (typeof quantity === "string" ? parseInt(quantity, 10) : quantity).toString());
      formData.append("color", selectedColorName);
      if (designFile) formData.append("design_file", designFile);
      formData.append("additional_info", "");
      const success = await updateCartItem(formData);
      if (success) {
        setCartItem((prev) => (prev ? { ...prev, additional_info: "" } : null));
      }
    }
  };

  const handleEditInfo = () => {
    setIsEditingInfo(true);
  };

  const handleSaveInfo = async () => {
    setIsEditingInfo(false);
    if (cartItem) {
      const formData = new FormData();
      formData.append("product_id", productId.toString());
      formData.append("quantity", (typeof quantity === "string" ? parseInt(quantity, 10) : quantity).toString());
      formData.append("color", selectedColorName);
      if (designFile) formData.append("design_file", designFile);
      formData.append("additional_info", additionalInfo);
      const success = await updateCartItem(formData);
      if (success) {
        setCartItem((prev) => (prev ? { ...prev, additional_info: additionalInfo } : null));
      }
    }
  };

  if (!product) return <ProductDetailsSkeleton />;

  const productColors = [...new Set(product.colors.map((color) => (isHexCode(color) ? color : colorNameToHex(color))))];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow">
        <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16 py-6 sm:py-8">
          <div className="mx-0">
            <Breadcrumbs productName={product.name} />
          </div>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Image Section */}
            <div className="flex flex-col items-center">
              {imageLoading && (
                <div className="w-full aspect-square max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] bg-gray-200 rounded-lg flex items-center justify-center animate-pulse">
                  <span>Loading...</span>
                </div>
              )}
              {(activeThumbnail && !imageError) ? (
                <img
                  src={activeThumbnail}
                  alt={product.name}
                  className={`w-full aspect-square max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] object-cover rounded-lg shadow-lg ${imageLoading ? "hidden" : "block"}`}
                  onLoad={() => setImageLoading(false)}
                  onError={() => {
                    setImageError(true);
                    setImageLoading(false);
                  }}
                />
              ) : (
                <div className="w-full aspect-square max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  No Image Available
                </div>
              )}
              <div className="flex flex-wrap justify-center mt-4 gap-2">
                {product.thumbnails.map((thumbnail) => (
                  <img
                    key={thumbnail.id}
                    src={thumbnail.image}
                    alt={`${product.name} thumbnail`}
                    className={`w-16 h-16 sm:w-20 sm:h-20 cursor-pointer rounded-lg border-2 ${
                      activeThumbnail === thumbnail.image ? "border-yellow-500" : "border-transparent"
                    }`}
                    onClick={() => {
                      setActiveThumbnail(thumbnail.image);
                      setImageError(false);
                      setImageLoading(true);
                    }}
                  />
                ))}
              </div>
            </div>
            {/* Product Details Section */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>
              <p className="text-lg sm:text-xl mt-2">
                {product.currency}{parseFloat(product.price).toLocaleString()}{" "}
                <span className="text-gray-500 text-sm sm:text-base">{product.description}</span>
              </p>
              <p className="mt-4 text-gray-600 text-sm sm:text-base">{product.product_description}</p>
              <div className="mt-4">
                <label className="font-semibold text-sm sm:text-base">Quantity:</label>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="px-2 sm:px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200"
                    onClick={decrementQuantity}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    min={getIncrementStep()}
                    className="w-14 sm:w-16 text-center border rounded-lg p-1 text-sm sm:text-base"
                  />
                  <button
                    className="px-2 sm:px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200"
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <label className="font-semibold text-sm sm:text-base">Select Color:</label>
                <div className="mt-2">
                  <CirclePicker
                    color={selectedColor}
                    colors={productColors}
                    onChange={handleColorChange}
                    circleSize={24}
                    circleSpacing={8}
                    className="flex flex-wrap gap-2"
                  />
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className="mt-6 w-full sm:w-auto bg-yellow-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-lg font-semibold hover:bg-yellow-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
          {/* Tabs and Specifications Section */}
          <div className="mt-8 sm:mt-12">
            <div className="flex border-b">
              <button
                className={`px-3 sm:px-4 py-2 text-sm sm:text-lg font-semibold ${
                  activeTab === "product" ? "border-b-2 border-yellow-500 text-yellow-500" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("product")}
              >
                Product Specifications
              </button>
              <button
                className={`px-3 sm:px-4 py-2 text-sm sm:text-lg font-semibold ${
                  activeTab === "design" ? "border-b-2 border-yellow-500 text-yellow-500" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("design")}
              >
                Design Specifications
              </button>
            </div>
            {activeTab === "product" ? (
              <ProductSpecifications features={product.features} />
            ) : (
              <>
                <DesignSpecifications
                  setDesignFile={setDesignFile}
                  setAdditionalInfo={setAdditionalInfo}
                  designFile={designFile}
                  additionalInfo={additionalInfo}
                  isEditingInfo={isEditingInfo}
                  onSaveInfo={handleSaveInfo}
                  onEditInfo={handleEditInfo}
                  setIsEditingInfo={setIsEditingInfo}
                />
                {(designFile || cartItem?.design_file || additionalInfo) && (
                  <div className="mt-4">
                    {(designFile || cartItem?.design_file) && (
                      <div className="mb-2 flex items-center">
                        <strong className="text-sm sm:text-base">Current Design File:</strong>
                        <span className="text-blue-500 ml-2 underline text-sm sm:text-base">
                          {designFile ? designFile.name : cartItem?.design_file?.split("/").pop()}
                        </span>
                        <button
                          onClick={handleDeleteFile}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    )}
                    {additionalInfo && (
                      <div className="mt-2 p-2 border border-gray-300 rounded-md">
                        <p className="text-sm text-gray-700">{additionalInfo}</p>
                        <div className="mt-2 flex space-x-2">
                          <button
                            onClick={handleEditInfo}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <FontAwesomeIcon icon={faPencilAlt} />
                          </button>
                          <button
                            onClick={handleDeleteInfo}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
            <div className="flex justify-end mt-4 sm:mt-6">
              <button
                onClick={handleProceedToCart}
                className="w-full sm:w-auto bg-yellow-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-lg font-semibold hover:bg-yellow-600"
              >
                Proceed to Cart
              </button>
            </div>
          </div>
          {/* Similar Products Section */}
          <div className="mt-12 pb-5 mb-5">
            <h2 className="text-2xl font-bold text-center mb-6">
              Similar Products You Might Like
            </h2>
            <FeaturedProduct />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetails;