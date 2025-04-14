

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-white">
        {/* Section 1: About Us Header */}
        <section className="bg-black py-12 text-center">
          <div className="mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              About Us
            </h1>
            <h4 className="mt-2 text-lg text-white">
              Bringing Your Ideas to Life, One Print at a Time
            </h4>
          </div>
        </section>

        {/* Section 2: Who We Are */}
        <section className="py-12 text-center">
          <div className="max-w-[1140px] mx-auto px-4">
            <p className="text-lg text-yellow-600">Who We Are</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
              The PrintShop Naija Story
            </h2>
            <p className="mt-4 text-gray-600">
              We are Nigeria’s go-to print shop, combining innovation with craftsmanship to create stunning prints that make an impact. With a passion for excellence, we use state-of-the-art printing technology to ensure your prints come out just the way you envision them—crisp, vibrant, and professional.
            </p>
            <div className="mt-8">
              <Image
                src="/images/about-1.jpg"
                alt="Printing Illustration"
                width={1140}
                height={760}
                className="w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </section>

        {/* Section 3: What We Do */}
        <section className="py-12">
          <div className="max-w-[1140px] mx-auto px-4 text-center">
            <p className="text-lg text-yellow-600">What We Do</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
              Services Our Printshop Renders
            </h2>
            <h5 className="mt-2 text-gray-600">
              From Business Essentials to Custom Creations—We’ve Got You Covered!
            </h5>
            <div className="mt-12 space-y-12">
              {/* Service 1: Business & Marketing Prints */}
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-[550px] w-full">
                  <Image
                    src="/images/about-2.jpg"
                    alt="Business & Marketing Prints"
                    width={550}
                    height={309.53}
                    className="w-full h-[309.53px] object-cover rounded-lg border border-yellow-50"
                  />
                </div>
                <div className="md:w-[550px] w-full flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-gray-800 text-left m-0 leading-normal uppercase tracking-normal text-indent-0">
                    Business & Marketing Prints
                  </h3>
                  <p className="mt-2 text-gray-600 text-left m-0 leading-normal tracking-normal text-indent-0">
                    Business cards, flyers, posters, and brochures that leave a lasting impression.
                  </p>
                </div>
              </div>

              {/* Service 2: Large Format & Signage */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-10">
                <div className="md:w-[550px] w-full">
                  <Image
                    src="/images/about-3.jpg"
                    alt="Large Format & Signage"
                    width={550}
                    height={309.53}
                    className="w-full h-[309.53px] object-cover rounded-lg border border-yellow-50"
                  />
                </div>
                <div className="md:w-[550px] w-full flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-gray-800 text-left m-0 leading-normal uppercase tracking-normal text-indent-0">
                    Large Format & Signage
                  </h3>
                  <p className="mt-2 text-gray-600 text-left m-0 leading-normal tracking-normal text-indent-0">
                    Banners, roll-up stands, and signage for maximum visibility.
                  </p>
                </div>
              </div>

              {/* Service 3: Customized Prints & Gifts */}
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-[550px] w-full">
                  <Image
                    src="/images/about-4.jpg"
                    alt="Customized Prints & Gifts"
                    width={550}
                    height={309.53}
                    className="w-full h-[309.53px] object-cover rounded-lg border border-yellow-50"
                  />
                </div>
                <div className="md:w-[550px] w-full flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-gray-800 text-left m-0 leading-normal uppercase tracking-normal text-indent-0">
                    Customized Prints & Gifts
                  </h3>
                  <p className="mt-2 text-gray-600 text-left m-0 leading-normal tracking-normal text-indent-0">
                    Mugs, t-shirts, souvenirs, and more for personal or corporate branding.
                  </p>
                </div>
              </div>

              {/* Service 4: Express & Bulk Printing */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-10">
                <div className="md:w-[550px] w-full">
                  <Image
                    src="/images/about-5.jpg"
                    alt="Express & Bulk Printing"
                    width={550}
                    height={309.53}
                    className="w-full h-[309.53px] object-cover rounded-lg border border-yellow-50"
                  />
                </div>
                <div className="md:w-[550px] w-full flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-gray-800 text-left m-0 leading-normal uppercase tracking-normal text-indent-0">
                    Express & Bulk Printing
                  </h3>
                  <p className="mt-2 text-gray-600 text-left m-0 leading-normal tracking-normal text-indent-0">
                    High-quality prints in record time to meet your deadlines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Why Choose Us */}
        <section className="py-12">
          <div className="max-w-[1140px] mx-auto px-4 text-center">
            <p className="text-lg text-yellow-600">What We Offer</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
              Why Choose Us
            </h2>
            <h5 className="mt-2 text-gray-600">
              Quality, Speed, and Affordability—Printing Made Simple!
            </h5>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-yellow-50 p-8 rounded-lg shadow-sm">
                <div className="flex flex-row items-center gap-4">
                  <Image
                    src="/icons/quality-icon.png"
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
              <div className="bg-yellow-50 p-8 rounded-lg shadow-sm">
                <div className="flex flex-row items-center gap-4">
                  <Image
                    src="/icons/delivery-icon.png"
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
              <div className="bg-yellow-50 p-8 rounded-lg shadow-sm">
                <div className="flex flex-row items-center gap-4">
                  <Image
                    src="/icons/pricing-icon.png"
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
              <div className="bg-yellow-50 p-8 rounded-lg shadow-sm">
                <div className="flex flex-row items-center gap-4">
                  <Image
                    src="/icons/design-icon.png"
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
          <div className="max-w-[1140px] mx-auto px-4">
            <div className="bg-yellow-50 p-8 rounded-lg text-center">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Let’s Print Something Amazing!
              </h2>
              <p className="mt-4 text-gray-600">
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