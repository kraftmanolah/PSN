
// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Product } from "@/types/product";

// interface ProductCardProps {
//   product: Product;
//   onOrderNow?: () => void; // Optional function prop (not used here)
// }

// const ProductCard = ({ product, onOrderNow }: ProductCardProps) => {
//   const { name, price, currency, main_image, id, description } = product;

//   const handleOrderNow = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     if (onOrderNow) {
//       e.preventDefault(); // Prevent navigation if onOrderNow is provided
//       onOrderNow();
//     }
//     // If onOrderNow is not provided, the Link will handle navigation as usual
//   };

//   return (
//     <div className="border border-gray-200 rounded-lg shadow-md w-full max-w-xs mx-auto p-2 h-[350px] flex flex-col justify-between overflow-hidden hover:scale-105 transition-transform duration-200">
//       <Link href={`/products/${id}`}>
//         <div className="bg-gray-100 rounded-t-lg overflow-hidden">
//           <div className="p-2 flex justify-center h-[200px]">
//             {main_image ? (
//               <Image
//                 src={main_image.startsWith("/") ? main_image : `/${main_image}`}
//                 alt={name}
//                 width={200}
//                 height={200}
//                 className="rounded-lg object-contain"
//                 onError={(e) => console.error(`Image load error for ${name}:`, e)}
//               />
//             ) : (
//               <div className="w-[200px] h-[200px] bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
//                 No Image
//               </div>
//             )}
//           </div>
//         </div>
//       </Link>
//       <div className="bg-white rounded-b-lg flex flex-col justify-between">
//         <div className="text-left p-2">
//           <h3 className="mt-2 text-lg font-semibold text-gray-800 truncate">{name}</h3>
//           <p className="mt-1 text-sm text-gray-600 truncate">
//             {currency}
//             {parseFloat(price).toLocaleString()}{" "}
//             <span className="text-gray-400">{description}</span>
//           </p>
//         </div>
//         <div className="mt-2 flex justify-start p-2">
//           <Link
//             href={`/products/${id}`}
//             onClick={handleOrderNow}
//             className="px-4 py-2 bg-white text-yellow-500 border border-yellow-500 rounded-lg hover:bg-yellow-600 hover:text-white hover:border-yellow-600 transition-colors block text-center w-full"
//           >
//             Order Now
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onOrderNow?: () => void; // Optional function prop (not used here)
}

const ProductCard = ({ product, onOrderNow }: ProductCardProps) => {
  const { name, price, currency, main_image, id, description } = product;

  const handleOrderNow = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onOrderNow) {
      e.preventDefault(); // Prevent navigation if onOrderNow is provided
      onOrderNow();
    }
    // If onOrderNow is not provided, the Link will handle navigation as usual
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-md w-full max-w-[280px] mx-auto p-2 h-[400px] flex flex-col justify-between overflow-hidden hover:scale-105 transition-transform duration-200">
      <Link href={`/products/${id}`}>
        <div className="bg-gray-100 rounded-t-lg overflow-hidden">
          <div className="p-2 flex justify-center h-[230px]">
            {main_image ? (
              <Image
                src={main_image.startsWith("/") ? main_image : `/${main_image}`}
                alt={name}
                width={200}
                height={200}
                className="rounded-lg object-contain"
                onError={(e) => console.error(`Image load error for ${name}:`, e)}
              />
            ) : (
              <div className="w-[200px] h-[200px] bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>
        </div>
      </Link>
      <div className="bg-white rounded-b-lg flex flex-col justify-between">
        <div className="text-left p-2">
          <h3 className="mt-2 text-lg font-semibold text-gray-800 truncate">{name}</h3>
          <p className="mt-1 text-sm text-gray-600 truncate">
            {currency}
            {parseFloat(price).toLocaleString()}{" "}
            <span className="text-gray-400">{description}</span>
          </p>
        </div>
        <div className="mt-2 flex justify-start p-2">
          <Link
            href={`/products/${id}`}
            onClick={handleOrderNow}
            className="px-4 py-2 bg-white text-yellow-500 border border-yellow-500 rounded-lg hover:bg-yellow-600 hover:text-white hover:border-yellow-600 transition-colors block text-center w-full"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;