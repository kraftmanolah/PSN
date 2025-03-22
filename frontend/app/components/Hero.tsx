"use client";

import React from "react";
import Image from "next/image";
import HeroTrustedBy from "./HeroTrustedBy"; // Import the trusted by component

const Hero: React.FC = () => {
  return (
    <div> {/* Wrapping the content in a div to ensure one parent element */}
      <section className="bg-black py-16 px-8 md:px-16 flex flex-col-reverse md:flex-row items-center">
        {/* Left: Text Section with Animation */}
        <div className="md:w-1/2 space-y-4 animate-slideInLeft">
          <h1 className="text-4xl font-bold text-yellow-500">
            <span className="block">Create. Customize.</span>
            <span className="block">Print - PrintShop</span>
            <span className="block">Naija Has You</span>
            <span className="block">Covered!</span>
          </h1>
          <p className="text-lg text-gray-400">
            Your one-stop solution for all printing needs. Get high-quality prints
            with quick turnaround times and affordable pricing.
          </p>
          <div className="space-x-4">
            <button className="bg-yellow-500 text-black py-2 px-6 rounded-lg hover:bg-yellow-600 transition">
              Shop Now
            </button>
            <button className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition">
              Request a Quote
            </button>
          </div>
        </div>

        {/* Hero Image 1 */}
        <div className="md:w-1/3 h-full flex justify-center items-center">
          <Image
            src="/images/hero-1.png"
            alt="Hero Image 1"
            width={300} // Adjust based on the image size you want
            height={900} // Full height to match the right column's images
            className="object-cover"
          />
        </div>

        {/* Hero Images 2 and 3 */}
        <div className="md:w-1/3 flex flex-col space-y-4 items-center">
          {/* Hero Image 2 */}
          <div className="w-full">
            <Image
              src="/images/hero-2.png"
              alt="Hero Image 2"
              width={300}
              height={600} // Ensure it is taller than hero-3
              className="object-cover mb-3"
            />
          </div>

          {/* Hero Image 3 */}
          <div className="w-full">
            <Image
              src="/images/hero-3.png"
              alt="Hero Image 3"
              width={300}
              height={500} // Shorter than hero-2
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Trusted by Section */}
      <HeroTrustedBy />
    </div>
  );
};

export default Hero;
