import React from "react";
import Image from "next/image";

const GoalSection: React.FC = () => {
  return (
    <section className="bg-black text-white py-16 px-8 md:px-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        {/* Image */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <Image
            src="/images/fsec-img.png" // Replace with the actual image path
            alt="Printing Machine"
            width={600} // Set appropriate width
            height={400} // Set appropriate height
            className="rounded-lg shadow-lg"
            priority // Ensures the image is loaded early for performance
          />
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 md:pl-8">
          <h4 className="text-sm uppercase text-gray-400 mb-2">Our Goal</h4>
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
            Empowering Creativity, <br /> <span>One Print at a Time</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Our goal at PrintShop Naija is to provide high-quality, customizable
            print solutions that inspire creativity and make your ideas come to
            life.
          </p>
          <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-300 transition">
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
};

export default GoalSection;
