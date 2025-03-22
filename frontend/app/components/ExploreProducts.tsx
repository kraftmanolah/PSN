"use client";

import React from "react";
import Image from "next/image";

const ExploreProducts: React.FC = () => {
  return (
    <section className="py-16 px-8 md:px-16 bg-black">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-yellow-500">
          Explore our wide range of products tailored to meet your needs
        </h2>
      </div>

      {/* Image Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Product 1 */}
        <div className="relative">
          <Image
            src="/images/branding-tsec.png"
            alt="Product 1"
            width={300}
            height={300}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-white flex items-center justify-center">
            <p className="text-xl font-semibold">Branding</p>
          </div>
        </div>

        {/* Product 2 */}
        <div className="relative">
          <Image
            src="/images/printing-tsec.png"
            alt="Product 2"
            width={300}
            height={300}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-white flex items-center justify-center">
            <p className="text-xl font-semibold">Printing</p>
          </div>
        </div>

        {/* Product 3 */}
        <div className="relative">
          <Image
            src="/images/packaging-tsec.png"
            alt="Product 3"
            width={300}
            height={300}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-white flex items-center justify-center">
            <p className="text-xl font-semibold">Packaging</p>
          </div>
        </div>

        {/* Product 4 */}
        <div className="relative">
          <Image
            src="/images/publishing-tsec.png"
            alt="Product 4"
            width={300}
            height={300}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-white flex items-center justify-center">
            <p className="text-xl font-semibold">Publishing</p>
          </div>
        </div>
      </div>

      {/* Learn More Button */}
      <div className="text-center mt-8">
        <button className="bg-yellow-500 text-black py-2 px-6 rounded-lg hover:bg-yellow-600 transition">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default ExploreProducts;
