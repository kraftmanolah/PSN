// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import Navbar from "@/app/components/Navbar"; // Assuming you have a Navbar component
// import Footer from "@/app/components/Footer"; // Assuming you have a Footer component

// const About: React.FC = () => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <div className="flex-grow bg-white">
//         {/* Section 1: About Us Header */}
//         <section className="bg-black py-12 text-center">
//           <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16">
//             <p className="text-lg text-white">About Us</p>
//             <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
//               Bringing Your Ideas to Life, One Print at a Time
//             </h1>
//           </div>
//         </section>

//         {/* Section 2: Who We Are */}
//         <section className="py-12 text-center">
//           <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16">
//             <h2 className="text-2xl sm:text-3xl font-semibold">
//               <span className="text-yellow-600">Who We Are</span>{" "}
//               <span className="text-gray-900">The PrintShop Naija Story</span>
//             </h2>
//             <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
//               We are Nigeria’s go-to print shop, combining innovation with craftsmanship to create stunning prints that make an impact. With a passion for excellence, we use state-of-the-art printing technology to ensure your prints come out just the way you envision them—crisp, vibrant, and professional.
//             </p>
//             <div className="mt-8">
//               <Image
//                 src="/images/printing-image.jpg" // Replace with your actual image path
//                 alt="Printing Illustration"
//                 width={600}
//                 height={400}
//                 className="mx-auto rounded-lg object-cover"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Section 3: What We Do */}
//         <section className="py-12">
//           <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16 text-center">
//             <h2 className="text-2xl sm:text-3xl font-semibold">
//               <span className="text-yellow-600">What We Do</span>
//             </h2>
//             <h3 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
//               Services Our Printshop Renders
//             </h3>
//             <p className="mt-2 text-gray-600">
//               From Business Essentials to Custom Creations—We’ve Got You Covered!
//             </p>
//             <div className="mt-12 space-y-12">
//               {/* Service 1: Business & Marketing Prints (Image Left, Text Right) */}
//               <div className="flex flex-col lg:flex-row items-center gap-8">
//                 <div className="w-full lg:w-1/2">
//                   <Image
//                     src="/images/business-prints.jpg" // Replace with your actual image path
//                     alt="Business & Marketing Prints"
//                     width={500}
//                     height={300}
//                     className="w-full h-64 object-cover rounded-lg border border-yellow-50"
//                   />
//                 </div>
//                 <div className="w-full lg:w-1/2 text-center lg:text-left">
//                   <h3 className="text-xl font-semibold text-gray-800">
//                     Business & Marketing Prints
//                   </h3>
//                   <p className="mt-2 text-gray-600">
//                     Business cards, flyers, posters, and brochures that leave a lasting impression.
//                   </p>
//                 </div>
//               </div>

//               {/* Service 2: Large Format & Signage (Text Left, Image Right) */}
//               <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
//                 <div className="w-full lg:w-1/2">
//                   <Image
//                     src="/images/large-format.jpg" // Replace with your actual image path
//                     alt="Large Format & Signage"
//                     width={500}
//                     height={300}
//                     className="w-full h-64 object-cover rounded-lg border border-yellow-50"
//                   />
//                 </div>
//                 <div className="w-full lg:w-1/2 text-center lg:text-right">
//                   <h3 className="text-xl font-semibold text-gray-800">
//                     Large Format & Signage
//                   </h3>
//                   <p className="mt-2 text-gray-600">
//                     Banners, roll-up stands, and signage for maximum visibility.
//                   </p>
//                 </div>
//               </div>

//               {/* Service 3: Customized Prints & Gifts (Image Left, Text Right) */}
//               <div className="flex flex-col lg:flex-row items-center gap-8">
//                 <div className="w-full lg:w-1/2">
//                   <Image
//                     src="/images/custom-prints.jpg" // Replace with your actual image path
//                     alt="Customized Prints & Gifts"
//                     width={500}
//                     height={300}
//                     className="w-full h-64 object-cover rounded-lg border border-yellow-50"
//                   />
//                 </div>
//                 <div className="w-full lg:w-1/2 text-center lg:text-left">
//                   <h3 className="text-xl font-semibold text-gray-800">
//                     Customized Prints & Gifts
//                   </h3>
//                   <p className="mt-2 text-gray-600">
//                     Mugs, t-shirts, souvenirs, and more for personal or corporate branding.
//                   </p>
//                 </div>
//               </div>

//               {/* Service 4: Express & Bulk Printing (Text Left, Image Right) */}
//               <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
//                 <div className="w-full lg:w-1/2">
//                   <Image
//                     src="/images/express-printing.jpg" // Replace with your actual image path
//                     alt="Express & Bulk Printing"
//                     width={500}
//                     height={300}
//                     className="w-full h-64 object-cover rounded-lg border border-yellow-50"
//                   />
//                 </div>
//                 <div className="w-full lg:w-1/2 text-center lg:text-right">
//                   <h3 className="text-xl font-semibold text-gray-800">
//                     Express & Bulk Printing
//                   </h3>
//                   <p className="mt-2 text-gray-600">
//                     High-quality prints in record time to meet your deadlines.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Section 4: Why Choose Us (Updated) */}
//         <section className="py-12">
//           <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16 text-center">
//             <h2 className="text-2xl sm:text-3xl font-semibold">
//               <span className="text-yellow-600">What We Offer</span>
//             </h2>
//             <h3 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
//               Why Choose Us
//             </h3>
//             <p className="mt-2 text-gray-600">
//               Quality, Speed, and Affordability—Printing Made Simple!
//             </p>
//             <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {/* Feature Card 1 */}
//               <div className="bg-yellow-50 p-8 rounded-lg shadow-sm">
//                 <div className="flex justify-center">
//                   <Image
//                     src="/icons/quality-icon.png" // Replace with your actual icon path
//                     alt="Quality Icon"
//                     width={40}
//                     height={40}
//                   />
//                 </div>
//                 <h3 className="mt-4 text-lg font-semibold text-gray-800">
//                   Quality You Can Trust
//                 </h3>
//                 <p className="mt-2 text-gray-600">
//                   We use premium materials and advanced printing techniques.
//                 </p>
//               </div>
//               {/* Feature Card 2 */}
//               <div className="bg-yellow-50 p-8 rounded-lg shadow-sm">
//                 <div className="flex justify-center">
//                   <Image
//                     src="/icons/delivery-icon.png" // Replace with your actual icon path
//                     alt="Delivery Icon"
//                     width={40}
//                     height={40}
//                   />
//                 </div>
//                 <h3 className="mt-4 text-lg font-semibold text-gray-800">
//                   Fast & Reliable Delivery
//                 </h3>
//                 <p className="mt-2 text-gray-600">
//                   Get your orders on time, every time.
//                 </p>
//               </div>
//               {/* Feature Card 3 */}
//               <div className="bg-yellow-50 p-8 rounded-lg shadow-sm">
//                 <div className="flex justify-center">
//                   <Image
//                     src="/icons/pricing-icon.png" // Replace with your actual icon path
//                     alt="Pricing Icon"
//                     width={40}
//                     height={40}
//                   />
//                 </div>
//                 <h3 className="mt-4 text-lg font-semibold text-gray-800">
//                   Affordable Pricing
//                 </h3>
//                 <p className="mt-2 text-gray-600">
//                   Competitive rates without compromising on quality.
//                 </p>
//               </div>
//               {/* Feature Card 4 */}
//               <div className="bg-yellow-50 p-8 rounded-lg shadow-sm">
//                 <div className="flex justify-center">
//                   <Image
//                     src="/icons/design-icon.png" // Replace with your actual icon path
//                     alt="Design Icon"
//                     width={40}
//                     height={40}
//                   />
//                 </div>
//                 <h3 className="mt-4 text-lg font-semibold text-gray-800">
//                   Custom Designs
//                 </h3>
//                 <p className="mt-2 text-gray-600">
//                   Bring your own design or let our experts craft something unique for you.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Section 5: Let's Print Something Amazing! (New Section) */}
//         <section className="py-12">
//           <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16">
//             <div className="bg-yellow-50 p-8 rounded-lg text-center">
//               <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
//                 Let’s Print Something Amazing!
//               </h2>
//               <p className="mt-4 text-gray-600 max-w-xl mx-auto">
//                 Whether you’re a business looking to stand out or an individual celebrating a special moment, PrintShop Naija is here to make your prints unforgettable.
//               </p>
//               <Link href="/shop">
//                 <button className="mt-6 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
//                   Shop Now
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </section>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default About;

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar"; // Assuming you have a Navbar component
import Footer from "@/app/components/Footer"; // Assuming you have a Footer component

const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-white">
        {/* Section 1: About Us Header */}
        <section className="bg-black py-12 text-center">
          <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16">
            <p className="text-lg text-white">About Us</p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
              Bringing Your Ideas to Life, One Print at a Time
            </h1>
          </div>
        </section>

        {/* Section 2: Who We Are (Updated) */}
        <section className="py-12 text-center">
          <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16">
            <p className="text-lg text-yellow-600">Who We Are</p>
            <h3 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
              The PrintShop Naija Story
            </h3>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              We are Nigeria’s go-to print shop, combining innovation with craftsmanship to create stunning prints that make an impact. With a passion for excellence, we use state-of-the-art printing technology to ensure your prints come out just the way you envision them—crisp, vibrant, and professional.
            </p>
            <div className="mt-8">
              <Image
                src="/images/printing-image.jpg" // Replace with your actual image path
                alt="Printing Illustration"
                width={600}
                height={400}
                className="mx-auto rounded-lg object-cover"
              />
            </div>
          </div>
        </section>

        {/* Section 3: What We Do (Updated Typography) */}
        <section className="py-12">
          <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16 text-center">
            <p className="text-lg text-yellow-600">What We Do</p>
            <h3 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
              Services Our Printshop Renders
            </h3>
            <p className="mt-2 text-gray-600">
              From Business Essentials to Custom Creations—We’ve Got You Covered!
            </p>
            <div className="mt-12 space-y-12">
              {/* Service 1: Business & Marketing Prints (Image Left, Text Right) */}
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="w-full lg:w-1/2">
                  <Image
                    src="/images/business-prints.jpg" // Replace with your actual image path
                    alt="Business & Marketing Prints"
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover rounded-lg border border-yellow-50"
                  />
                </div>
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Business & Marketing Prints
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Business cards, flyers, posters, and brochures that leave a lasting impression.
                  </p>
                </div>
              </div>

              {/* Service 2: Large Format & Signage (Text Left, Image Right) */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
                <div className="w-full lg:w-1/2">
                  <Image
                    src="/images/large-format.jpg" // Replace with your actual image path
                    alt="Large Format & Signage"
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover rounded-lg border border-yellow-50"
                  />
                </div>
                <div className="w-full lg:w-1/2 text-center lg:text-right">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Large Format & Signage
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Banners, roll-up stands, and signage for maximum visibility.
                  </p>
                </div>
              </div>

              {/* Service 3: Customized Prints & Gifts (Image Left, Text Right) */}
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="w-full lg:w-1/2">
                  <Image
                    src="/images/custom-prints.jpg" // Replace with your actual image path
                    alt="Customized Prints & Gifts"
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover rounded-lg border border-yellow-50"
                  />
                </div>
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Customized Prints & Gifts
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Mugs, t-shirts, souvenirs, and more for personal or corporate branding.
                  </p>
                </div>
              </div>

              {/* Service 4: Express & Bulk Printing (Text Left, Image Right) */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
                <div className="w-full lg:w-1/2">
                  <Image
                    src="/images/express-printing.jpg" // Replace with your actual image path
                    alt="Express & Bulk Printing"
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover rounded-lg border border-yellow-50"
                  />
                </div>
                <div className="w-full lg:w-1/2 text-center lg:text-right">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Express & Bulk Printing
                  </h3>
                  <p className="mt-2 text-gray-600">
                    High-quality prints in record time to meet your deadlines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Why Choose Us (Updated Layout and Typography) */}
        <section className="py-12">
          <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16 text-center">
            <p className="text-lg text-yellow-600">What We Offer</p>
            <h3 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
              Why Choose Us
            </h3>
            <p className="mt-2 text-gray-600">
              Quality, Speed, and Affordability—Printing Made Simple!
            </p>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Feature Card 1 */}
              <div className="bg-yellow-50 p-8 rounded-lg shadow-sm">
                <div className="flex flex-row items-center gap-4">
                  <Image
                    src="/icons/quality-icon.png" // Replace with your actual icon path
                    alt="Quality Icon"
                    width={40}
                    height={40}
                  />
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Quality You Can Trust
                    </h3>
                    <p className="mt-2 text-gray-600">
                      We use premium materials and advanced printing techniques.
                    </p>
                  </div>
                </div>
              </div>
              {/* Feature Card 2 */}
              <div className="bg-yellow-50 p-8 rounded-lg shadow-sm">
                <div className="flex flex-row items-center gap-4">
                  <Image
                    src="/icons/delivery-icon.png" // Replace with your actual icon path
                    alt="Delivery Icon"
                    width={40}
                    height={40}
                  />
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Fast & Reliable Delivery
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Get your orders on time, every time.
                    </p>
                  </div>
                </div>
              </div>
              {/* Feature Card 3 */}
              <div className="bg-yellow-50 p-8 rounded-lg shadow-sm">
                <div className="flex flex-row items-center gap-4">
                  <Image
                    src="/icons/pricing-icon.png" // Replace with your actual icon path
                    alt="Pricing Icon"
                    width={40}
                    height={40}
                  />
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Affordable Pricing
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Competitive rates without compromising on quality.
                    </p>
                  </div>
                </div>
              </div>
              {/* Feature Card 4 */}
              <div className="bg-yellow-50 p-8 rounded-lg shadow-sm">
                <div className="flex flex-row items-center gap-4">
                  <Image
                    src="/icons/design-icon.png" // Replace with your actual icon path
                    alt="Design Icon"
                    width={40}
                    height={40}
                  />
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Custom Designs
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Bring your own design or let our experts craft something unique for you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Let's Print Something Amazing! */}
        <section className="py-12">
          <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-16">
            <div className="bg-yellow-50 p-8 rounded-lg text-center">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Let’s Print Something Amazing!
              </h2>
              <p className="mt-4 text-gray-600 max-w-xl mx-auto">
                Whether you’re a business looking to stand out or an individual celebrating a special moment, PrintShop Naija is here to make your prints unforgettable.
              </p>
              <Link href="/shop">
                <button className="mt-6 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;