

// "use client";

// import React from "react";
// import { useProducts } from "@/app/hooks/useProducts";
// import ProductCard from "@/app/components/ProductCard";
// import { Product } from "@/types/product";

// const ProductGrid: React.FC = () => {
//   const { products, error, isLoading } = useProducts();

//   if (error) return <div className="container mx-auto px-4 p-4 text-red-500">Error loading products: {error.message}</div>;
//   if (isLoading || !products) return <div className="container mx-auto px-4 p-4">Loading...</div>;

//   // Shuffle array and take first 8
//   const shuffledProducts = [...products].sort(() => Math.random() - 0.5).slice(0, 8);

//   return (
//     <div className="container mx-auto px-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {shuffledProducts.map((product) => (
//           <ProductCard
//             key={product.id}
//             product={product}
//             // No onOrderNow prop, allowing navigation to /products/${id}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductGrid;

"use client";

import React from "react";
import { useProducts } from "@/app/hooks/useProducts";
import ProductCard from "@/app/components/ProductCard";
import ProductCardSkeleton from "@/app/components/ProductCardSkeleton"; // Import the skeleton
import { Product } from "@/types/product";

const ProductGrid: React.FC = () => {
  const { products, error, isLoading } = useProducts();

  if (error) return <div className="container mx-auto px-4 p-4 text-red-500">Error loading products: {error.message}</div>;
  if (isLoading || !products) {
    return (
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Shuffle array and take first 8
  const shuffledProducts = [...products].sort(() => Math.random() - 0.5).slice(0, 8);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {shuffledProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;