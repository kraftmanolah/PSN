"use client";

import React, { useState } from "react";
import ProductSpecifications from "@/app/components/ProductSpecifications";
import DesignSpecifications from "@/app/components/DesignSpecifications";
import { Product } from "@/types/product";

const ProductDetails: React.FC<{ product: Product }> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [quantity, setQuantity] = useState<number | string>(1);  // Allow string for input
  const [activeTab, setActiveTab] = useState<"product" | "design">("product");
  const [activeThumbnail, setActiveThumbnail] = useState<string | null>(product.main_image || '');

  const handleQuantityChange = (value: string) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue < 1) {
      setQuantity(1);  // Default to 1 if invalid
      return;
    }
    setQuantity(numValue);  // Store as number for increments
  };

  const incrementQuantity = () => {
    const current = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;
    setQuantity(current + current);  // Double the current quantity (dynamic increment)
  };

  const decrementQuantity = () => {
    const current = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;
    if (current > current) {  // Ensure quantity stays above the current value
      setQuantity(current - current);  // Halve the current quantity (dynamic decrement)
    }
  };

  const handleAddToCart = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      alert('Please log in to add items to your cart.');
      return;
    }
    const quantityNum = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;
    try {
      const response = await fetch('/api/cart/add_item/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: product.id, quantity: quantityNum }),
      });
      if (!response.ok) throw new Error('Failed to add to cart');
      alert('Item added to cart successfully!');
    } catch (err: unknown) {  // Type 'err' as 'unknown'
      if (err instanceof Error) {
        alert(`Error adding to cart: ${err.message}`);
      } else {
        alert('An unexpected error occurred while adding to cart');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Images & Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Product Images */}
        <div>
          <img src={activeThumbnail || product.main_image || ''} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
          <div className="flex mt-4 gap-2">
            {product.thumbnails.map((thumbnail) => (
              <img
                key={thumbnail.id}
                src={thumbnail.image}
                alt={`${product.name} thumbnail`}
                className={`w-20 h-20 cursor-pointer rounded-lg border-2 ${activeThumbnail === thumbnail.image ? 'border-yellow-500' : 'border-transparent'}`}
                onClick={() => setActiveThumbnail(thumbnail.image)}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl mt-2">
            {product.currency}{product.price.toLocaleString()} <span className="text-gray-500">{product.description}</span>
          </p>

          {/* Product Description */}
          <p className="mt-4 text-gray-600">{product.product_description}</p>

          {/* Quantity Selector */}
          <div className="mt-4">
            <label className="font-semibold">Quantity:</label>
            <div className="flex items-center gap-2 mt-2">
              <button
                className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200"
                onClick={decrementQuantity}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                min="1"
                className="w-16 text-center border rounded-lg p-1"
              />
              <button
                className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200"
                onClick={incrementQuantity}
              >
                +
              </button>
              <span className="ml-2 text-sm text-gray-500">(Increments of {quantity})</span>
            </div>
          </div>

          {/* Color Selection */}
          <div className="mt-4">
            <label className="font-semibold">Select Color:</label>
            <div className="flex gap-2 mt-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded-full border-2"
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-6 bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Tabbed Section: Product & Design Specifications */}
      <div className="mt-12">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 text-lg font-semibold ${activeTab === "product" ? "border-b-2 border-yellow-500 text-yellow-500" : "text-gray-500"}`}
            onClick={() => setActiveTab("product")}
          >
            Product Specifications
          </button>
          <button
            className={`px-4 py-2 text-lg font-semibold ${activeTab === "design" ? "border-b-2 border-yellow-500 text-yellow-500" : "text-gray-500"}`}
            onClick={() => setActiveTab("design")}
          >
            Design Specifications
          </button>
        </div>

        {/* Conditional Rendering for Tabs */}
        {activeTab === "product" ? (
          <ProductSpecifications features={product.features} />
        ) : (
          <DesignSpecifications />
        )}

        <div className="flex justify-end mt-6">
          <button
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600"
            onClick={() => alert('Proceed to cart clicked - implement routing or cart navigation')}
          >
            Proceed to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;