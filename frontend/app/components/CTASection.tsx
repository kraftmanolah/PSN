

// "use client";

// import React from "react";

// const CTASection: React.FC = () => {
//   return (
//     <>
//       {/* Custom CSS for animations */}
//       <style jsx>{`
//         @keyframes slideInLeft {
//           from {
//             transform: translateX(-100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }

//         @keyframes slideInRight {
//           from {
//             transform: translateX(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }

//         .animate-slideInLeft {
//           animation: slideInLeft 0.5s ease-out forwards;
//         }

//         .animate-slideInRight {
//           animation: slideInRight 0.5s ease-out forwards;
//         }
//       `}</style>

//       <section className="flex justify-center py-12 px-2 mb-8">
//         <div
//           className="bg-black text-white rounded-2xl w-full py-8 px-4 flex flex-col md:flex-row items-center justify-between lg:w-[1312px] lg:h-[220px]"
//         >
//           {/* Left Content */}
//           <div className="text-center md:text-left mb-6 md:mb-0 animate-slideInRight">
//             <h2 className="text-lg font-semibold tracking-wide">
//               LOOKING FOR CUSTOM PRINTS WITH FAST DELIVERY?
//             </h2>
//             <p className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow-500 mt-2">
//               Shop PrintShop Naija for fast, high-quality custom prints!
//             </p>
//           </div>

//           {/* Right Button */}
//           <div className="animate-slideInLeft">
//             <button className="bg-yellow-500 text-black font-medium py-2 px-4 md:py-3 md:px-6 rounded-md hover:bg-yellow-600 transition duration-300 text-sm md:text-base">
//               Shop Now
//             </button>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default CTASection;

"use client";

import React from "react";

const CTASection: React.FC = () => {
  return (
    <>
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
        }
      `}</style>

      <section className="flex justify-center px-16 pb-28 pt-12">
        <div
          className="bg-black text-white rounded-[40px] w-full py-8 px-16 flex flex-col md:flex-row items-center justify-between lg:h-[220px]"
        >
          {/* Left Content */}
          <div className="text-center md:text-left mb-6 md:mb-0 animate-slideInRight">
            <h2 className="text-lg font-semibold tracking-wide">
              LOOKING FOR CUSTOM PRINTS WITH FAST DELIVERY?
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow-500 mt-2">
              Shop PrintShop Naija for fast, high-quality custom prints!
            </p>
          </div>

          {/* Right Button */}
          <div className="animate-slideInLeft">
            <button className="bg-yellow-500 text-black font-medium py-2 px-4 md:py-3 md:px-6 rounded-md hover:bg-yellow-600 transition duration-300 text-sm md:text-base">
              Shop Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTASection;