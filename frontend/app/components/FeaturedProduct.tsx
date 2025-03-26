

// "use client";

// import React from "react";
// import { useProducts } from "@/app/hooks/useProducts";
// import ProductCard from "@/app/components/ProductCard";
// import ProductCardSkeleton from "@/app/components/ProductCardSkeleton"; // Import the skeleton
// import { Product } from "@/types/product";

// const FeaturedProduct: React.FC = () => {
//   const { products, error, isLoading } = useProducts();

//   if (error) return <div className="p-4 text-red-500">Error loading featured products: {error.message}</div>;
//   if (isLoading || !products) {
//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {Array.from({ length: 4 }).map((_, index) => (
//           <ProductCardSkeleton key={index} />
//         ))}
//       </div>
//     );
//   }

//   // Shuffle array and take first 4
//   const shuffledProducts = [...products].sort(() => Math.random() - 0.5).slice(0, 4);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {shuffledProducts.map((product) => (
//         <ProductCard
//           key={product.id}
//           product={product}
//         />
//       ))}
//     </div>
//   );
// };

// export default FeaturedProduct;

"use client";

import React from "react";
import { useProducts } from "@/app/hooks/useProducts";
import ProductCard from "@/app/components/ProductCard";
import ProductCardSkeleton from "@/app/components/ProductCardSkeleton";
import { Product } from "@/types/product";

const FeaturedProduct: React.FC = () => {
  const { products, error, isLoading } = useProducts();

  if (error) return <div className="p-4 text-red-500 sm:px-4">Error loading featured products: {error.message}</div>;
  if (isLoading || !products) {
    return (
      <div className="px-1 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Shuffle array and take first 4
  const shuffledProducts = [...products].sort(() => Math.random() - 0.5).slice(0, 4);

  return (
    <div className="px-1 sm:px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {shuffledProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;