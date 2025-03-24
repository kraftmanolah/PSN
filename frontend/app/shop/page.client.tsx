

// "use client";

// import { useState, useEffect } from "react";
// import useSWR from "swr";
// import { Product, ProductCategory } from "@/types/product";
// import ProductCard from "@/app/components/ProductCard";
// import ProductCardSkeleton from "@/app/components/ProductCardSkeleton";
// import Link from "next/link";
// import Breadcrumbs from "@/app/components/Breadcrumbs";

// const fetcher = (url: string) => fetch(url).then((res) => {
//   if (!res.ok) {
//     throw new Error(`HTTP error! status: ${res.status}, text: ${res.statusText}`);
//   }
//   return res.json();
// });

// const Shop: React.FC = () => {
//   const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
//   const { data: products, error: productsError } = useSWR<Product[]>(`${backendUrl}/api/products/`, fetcher);
//   const { data: categories, error: categoriesError } = useSWR<ProductCategory[]>(`${backendUrl}/api/product-categories/`, fetcher);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

//   useEffect(() => {
//     if (products) {
//       const filtered = selectedCategories.length > 0
//         ? products.filter((product) => selectedCategories.includes(product.product_category.name))
//         : products;
//       setFilteredProducts(filtered);
//     }
//   }, [products, selectedCategories]);

//   const handleCategoryChange = (categoryName: string) => {
//     setSelectedCategories((prev) => {
//       if (prev.includes(categoryName)) {
//         return prev.filter((cat) => cat !== categoryName);
//       } else {
//         return [...prev, categoryName];
//       }
//     });
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen((prev) => !prev);
//   };

//   if (productsError || categoriesError) {
//     const error = productsError || categoriesError;
//     console.error("Error fetching data:", {
//       productsError: productsError?.message,
//       categoriesError: categoriesError?.message,
//       productsUrl: `${backendUrl}/api/products/`,
//       categoriesUrl: `${backendUrl}/api/product-categories/`,
//     });
//     return (
//       <div className="p-4 text-red-500">
//         Error loading data: {error.message.includes("<!DOCTYPE")
//           ? "Server returned HTML instead of JSON. Check backend, CORS, and ensure Django is running."
//           : error.message}
//         <br />
//         {productsError && <p>Products fetch error: {productsError.message}</p>}
//         {categoriesError && <p>Categories fetch error: {categoriesError.message}</p>}
//       </div>
//     );
//   }

//   if (!products || !categories) {
//     return (
//       <div className="min-h-screen bg-white">
//         <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16 py-6 sm:py-8">
//           <div className="mx-0">
//             <Breadcrumbs />
//           </div>
//           <div className="flex flex-col md:flex-row">
//             <div className="w-full md:w-1/5 p-6 border-r border-gray-200">
//               <div className="space-y-4">
//                 {Array.from({ length: 5 }).map((_, index) => (
//                   <div key={index} className="flex items-center animate-pulse">
//                     <div className="bg-gray-200 h-5 w-5 rounded-full"></div>
//                     <div className="bg-gray-200 h-5 w-3/4 ml-2 rounded"></div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="w-full md:w-4/5 p-6">
//               <div className="flex justify-between items-center mb-6 animate-pulse">
//                 <div className="bg-gray-200 h-8 w-1/3 rounded"></div>
//                 <div className="bg-gray-200 h-6 w-1/4 rounded"></div>
//               </div>
//               <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {Array.from({ length: 6 }).map((_, index) => (
//                   <li key={index}>
//                     <ProductCardSkeleton />
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16 py-6 sm:py-8">
//         <div className="mx-0">
//           <Breadcrumbs />
//         </div>

//         {/* Hamburger Menu Button (Visible on Mobile) */}
//         <div className="md:hidden flex justify-between items-center mb-4">
//           <button
//             onClick={toggleMenu}
//             className="text-gray-800 focus:outline-none"
//             aria-expanded={isMenuOpen}
//             aria-controls="mobile-menu"
//             aria-label={isMenuOpen ? "Close categories menu" : "Open categories menu"}
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
//               />
//             </svg>
//           </button>
//           <h1 className="text-2xl font-bold text-gray-800">Shop</h1>
//           <span className="text-gray-500">{filteredProducts.length} Products</span>
//         </div>

//         <div className="flex flex-col md:flex-row">
//           {/* Mobile Menu (Categories) */}
//           <div
//             id="mobile-menu"
//             className={`fixed inset-y-0 left-0 z-50 w-[80%] bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
//               isMenuOpen ? "translate-x-0" : "-translate-x-full"
//             }`}
//           >
//             <div className="p-6 border-r border-gray-200 h-full overflow-y-auto">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
//                 <button
//                   onClick={toggleMenu}
//                   className="text-gray-800 focus:outline-none"
//                   aria-label="Close categories menu"
//                 >
//                   <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>
//               <ul className="space-y-2">
//                 {categories.map((category) => (
//                   <li key={category.id} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id={`category-${category.id}`}
//                       checked={selectedCategories.includes(category.name)}
//                       onChange={() => handleCategoryChange(category.name)}
//                       className="form-checkbox h-5 w-5 text-yellow-500 rounded focus:ring-yellow-500"
//                     />
//                     <label htmlFor={`category-${category.id}`} className="ml-2 text-gray-600">
//                       {category.name}
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Overlay (Visible when Menu is Open on Mobile) */}
//           {isMenuOpen && (
//             <div
//               className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//               onClick={toggleMenu}
//               aria-hidden="true"
//             />
//           )}

//           {/* Sidebar Filter (Visible on Desktop) */}
//           <div className="hidden md:block md:w-1/5 p-6 border-r border-gray-200">
//             <h2 className="text-lg font-semibold mb-4 text-gray-800">Categories</h2>
//             <ul className="space-y-2">
//               {categories.map((category) => (
//                 <li key={category.id} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={`category-${category.id}`}
//                     checked={selectedCategories.includes(category.name)}
//                     onChange={() => handleCategoryChange(category.name)}
//                     className="form-checkbox h-5 w-5 text-yellow-500 rounded focus:ring-yellow-500"
//                   />
//                   <label htmlFor={`category-${category.id}`} className="ml-2 text-gray-600">
//                     {category.name}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Product Grid */}
//           <div className="w-full md:w-4/5 p-6">
//             <div className="hidden md:flex justify-between items-center mb-6">
//               <h1 className="text-2xl font-bold text-gray-800">Shop</h1>
//               <span className="text-gray-500">{filteredProducts.length} Products</span>
//             </div>
//             <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredProducts.map((product) => (
//                 <li key={product.id}>
//                   <ProductCard product={product} />
//                 </li>
//               ))}
//             </ul>
//             {filteredProducts.length === 0 && (
//               <p className="text-center text-gray-500 mt-4">No products available in the selected categories.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shop;

"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { Product, ProductCategory } from "@/types/product";
import ProductCard from "@/app/components/ProductCard";
import ProductCardSkeleton from "@/app/components/ProductCardSkeleton";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Navbar from "@/app/components/Navbar"; // Import Navbar
import Footer from "@/app/components/Footer"; // Import Footer

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}, text: ${res.statusText}`);
  }
  return res.json();
});

const Shop: React.FC = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { data: products, error: productsError } = useSWR<Product[]>(`${backendUrl}/api/products/`, fetcher);
  const { data: categories, error: categoriesError } = useSWR<ProductCategory[]>(`${backendUrl}/api/product-categories/`, fetcher);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (products) {
      const filtered = selectedCategories.length > 0
        ? products.filter((product) => selectedCategories.includes(product.product_category.name))
        : products;
      setFilteredProducts(filtered);
    }
  }, [products, selectedCategories]);

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryName)) {
        return prev.filter((cat) => cat !== categoryName);
      } else {
        return [...prev, categoryName];
      }
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  if (productsError || categoriesError) {
    const error = productsError || categoriesError;
    console.error("Error fetching data:", {
      productsError: productsError?.message,
      categoriesError: categoriesError?.message,
      productsUrl: `${backendUrl}/api/products/`,
      categoriesUrl: `${backendUrl}/api/product-categories/`,
    });
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar /> {/* Add Navbar */}
        <div className="flex-grow p-4 text-red-500">
          Error loading data: {error.message.includes("<!DOCTYPE")
            ? "Server returned HTML instead of JSON. Check backend, CORS, and ensure Django is running."
            : error.message}
          <br />
          {productsError && <p>Products fetch error: {productsError.message}</p>}
          {categoriesError && <p>Categories fetch error: {categoriesError.message}</p>}
        </div>
        <Footer /> {/* Add Footer */}
      </div>
    );
  }

  if (!products || !categories) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar /> {/* Add Navbar */}
        <div className="flex-grow bg-white">
          <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16 py-6 sm:py-8">
            <div className="mx-0">
              <Breadcrumbs />
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/5 p-6 border-r border-gray-200">
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex items-center animate-pulse">
                      <div className="bg-gray-200 h-5 w-5 rounded-full"></div>
                      <div className="bg-gray-200 h-5 w-3/4 ml-2 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-4/5 p-6">
                <div className="flex justify-between items-center mb-6 animate-pulse">
                  <div className="bg-gray-200 h-8 w-1/3 rounded"></div>
                  <div className="bg-gray-200 h-6 w-1/4 rounded"></div>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <li key={index}>
                      <ProductCardSkeleton />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Footer /> {/* Add Footer */}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* Add Navbar */}
      <div className="flex-grow bg-white">
        <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16 py-6 sm:py-8">
          <div className="mx-0">
            <Breadcrumbs />
          </div>

          {/* Hamburger Menu Button (Visible on Mobile) */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <button
              onClick={toggleMenu}
              className="text-gray-800 focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close categories menu" : "Open categories menu"}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Shop</h1>
            <span className="text-gray-500">{filteredProducts.length} Products</span>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Mobile Menu (Categories) */}
            <div
              id="mobile-menu"
              className={`fixed inset-y-0 left-0 z-50 w-[80%] bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="p-6 border-r border-gray-200 h-full overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
                  <button
                    onClick={toggleMenu}
                    className="text-gray-800 focus:outline-none"
                    aria-label="Close categories menu"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.name)}
                        onChange={() => handleCategoryChange(category.name)}
                        className="form-checkbox h-5 w-5 text-yellow-500 rounded focus:ring-yellow-500"
                      />
                      <label htmlFor={`category-${category.id}`} className="ml-2 text-gray-600">
                        {category.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Overlay (Visible when Menu is Open on Mobile) */}
            {isMenuOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                onClick={toggleMenu}
                aria-hidden="true"
              />
            )}

            {/* Sidebar Filter (Visible on Desktop) */}
            <div className="hidden md:block md:w-1/5 p-6 border-r border-gray-200">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Categories</h2>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.name)}
                      onChange={() => handleCategoryChange(category.name)}
                      className="form-checkbox h-5 w-5 text-yellow-500 rounded focus:ring-yellow-500"
                    />
                    <label htmlFor={`category-${category.id}`} className="ml-2 text-gray-600">
                      {category.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Grid */}
            <div className="w-full md:w-4/5 p-6">
              <div className="hidden md:flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Shop</h1>
                <span className="text-gray-500">{filteredProducts.length} Products</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <li key={product.id}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
              {filteredProducts.length === 0 && (
                <p className="text-center text-gray-500 mt-4">No products available in the selected categories.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer /> {/* Add Footer */}
    </div>
  );
};

export default Shop;