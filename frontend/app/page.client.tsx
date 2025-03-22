"use client";

import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import ExploreProducts from "./components/ExploreProducts";
import GoalSection from "./components/GoalSection"; // Import the GoalSection component
import HeroTrustedBy from "./components/HeroTrustedBy";  // Import the HeroTrustedBy component
import FeaturedProduct from "./components/FeaturedProduct";
import CustomerReviews from "./components/CustomerReviews";
import Footer from "./components/Footer";
import CTASection from "./components/CTASection";

const Home: React.FC = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* Featured Products Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Shop Our Bestsellers - Loved by Customers, Perfect for You.
          </h2>
          <section className="py-8 px-8 md:px-16">  {/* Add padding to left and right here */}
            <ProductGrid />
          </section>
        </div>
      </section>

      {/* Explore Our Products Section */}
      <ExploreProducts /> {/* This will be your section */}

      <section className="py-12 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Explore our Featured Products
          </h2>
          <section className="py-8 px-8 md:px-16">  {/* Add padding to left and right here */}
            <FeaturedProduct />
          </section>
        </div>
      </section>

      {/* Our Goal Section */}
      <GoalSection />

      {/* Customer Reviews Section */}
      <CustomerReviews />

       {/* Call-To-Action Section */}
       <CTASection />

        {/* Footer Section */}
        <Footer />
    </main>
  );
};

export default Home;
