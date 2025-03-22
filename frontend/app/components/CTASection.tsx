import React from "react";

const CTASection: React.FC = () => {
  return (
    <section className="flex justify-center py-12 px-2 mb-8">
      <div
        className="bg-black text-white rounded-2xl max-w-screen-lg w-full py-8 px-4 
                   flex flex-col md:flex-row items-center justify-between"
      >
        {/* Left Content */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-lg font-semibold tracking-wide">
            LOOKING FOR CUSTOM PRINTS WITH FAST DELIVERY?
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-yellow-500 mt-2">
            Shop PrintShop Naija for fast, high-quality custom prints!
          </p>
        </div>

        {/* Right Button */}
        <div>
          <button
            className="bg-yellow-500 text-black font-medium py-3 px-6 rounded-md 
                       hover:bg-yellow-600 transition duration-300"
          >
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
