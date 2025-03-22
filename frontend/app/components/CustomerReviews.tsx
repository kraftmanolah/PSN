// import React from "react";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";

// const reviews = [
//   {
//     id: 1,
//     text: "We’ve been working with PrintShop Naija for all our custom printing needs, and the experience has been outstanding. From high-quality promotional materials to personalized corporate gifts, their attention to detail and fast turnaround times have been impressive. We highly recommend them for any business in need of reliable, top-notch print services!",
//     customer: "NNPC",
//     logo: "/images/nnpc-logo.png",
//   },
//   {
//     id: 2,
//     text: "PrintShop Naija has been a game-changer for us! Their ability to deliver high-quality, custom prints with such efficiency has been incredible. From our branded merchandise to event materials, everything has been spot-on and delivered on time. The customer service is excellent, and they’re always ready to go the extra mile to meet our needs. We wouldn’t trust anyone else for our printing needs.",
//     customer: "Seven30",
//     logo: "/images/seven30-logo.png",
//   },
//   {
//     id: 3,
//     text: "PrintShop Naija has been an invaluable partner for our printing needs. From customized materials for our programs to official documents, their quality and service have been exceptional. Their attention to detail, fast delivery, and ability to handle large orders efficiently have made the process smooth and stress-free. We highly recommend them to any organization looking for reliable and professional printing solutions!",
//     customer: "NYSC",
//     logo: "/images/nysc-logo.png",
//   },
//   {
//     id: 4,
//     text: "We’ve been working with PrintShop Naija for all our custom printing needs, and the experience has been outstanding. From high-quality promotional materials to personalized corporate gifts, their attention to detail and fast turnaround times have been impressive. We highly recommend them for any business in need of reliable, top-notch print services!",
//     customer: "NNPC",
//     logo: "/images/nnpc-logo.png",
//   },
//   {
//     id: 5,
//     text: "PrintShop Naija has been a game-changer for us! Their ability to deliver high-quality, custom prints with such efficiency has been incredible. From our branded merchandise to event materials, everything has been spot-on and delivered on time. The customer service is excellent, and they’re always ready to go the extra mile to meet our needs. We wouldn’t trust anyone else for our printing needs.",
//     customer: "Seven30",
//     logo: "/images/seven30-logo.png",
//   },
//   {
//     id: 6,
//     text: "PrintShop Naija has been an invaluable partner for our printing needs. From customized materials for our programs to official documents, their quality and service have been exceptional. Their attention to detail, fast delivery, and ability to handle large orders efficiently have made the process smooth and stress-free. We highly recommend them to any organization looking for reliable and professional printing solutions!",
//     customer: "NYSC",
//     logo: "/images/nysc-logo.png",
//   },
//   {
//     id: 7,
//     text: "We’ve been working with PrintShop Naija for all our custom printing needs, and the experience has been outstanding. From high-quality promotional materials to personalized corporate gifts, their attention to detail and fast turnaround times have been impressive. We highly recommend them for any business in need of reliable, top-notch print services!",
//     customer: "NNPC",
//     logo: "/images/nnpc-logo.png",
//   },
//   {
//     id: 8,
//     text: "PrintShop Naija has been a game-changer for us! Their ability to deliver high-quality, custom prints with such efficiency has been incredible. From our branded merchandise to event materials, everything has been spot-on and delivered on time. The customer service is excellent, and they’re always ready to go the extra mile to meet our needs. We wouldn’t trust anyone else for our printing needs.",
//     customer: "Seven30",
//     logo: "/images/seven30-logo.png",
//   },
//   {
//     id: 9,
//     text: "PrintShop Naija has been an invaluable partner for our printing needs. From customized materials for our programs to official documents, their quality and service have been exceptional. Their attention to detail, fast delivery, and ability to handle large orders efficiently have made the process smooth and stress-free. We highly recommend them to any organization looking for reliable and professional printing solutions!",
//     customer: "NYSC",
//     logo: "/images/nysc-logo.png",
//   },
// ];

// const CustomerReviews: React.FC = () => {
//   return (
//     <section className="py-16 bg-white">
//       <div className="container mx-auto">
//         <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
//           Customer Reviews
//         </h2>

//         <Swiper
//           modules={[Pagination, Autoplay]}
//           spaceBetween={30}
//           pagination={{
//             clickable: true,
//             renderBullet: (index, className) =>
//               `<span class="${className} w-8 h-1 block mx-1 bg-gray-300 rounded"></span>`,
//           }}
//           autoplay={{ delay: 5000, disableOnInteraction: false }}
//           breakpoints={{
//             640: {
//               slidesPerView: 1, // One review per slide on mobile
//             },
//             768: {
//               slidesPerView: 2, // Two reviews per slide on tablets
//             },
//             1024: {
//               slidesPerView: 3, // Three reviews per slide on desktops
//             },
//           }}
//         >
//           {reviews.map((review) => (
//             <SwiperSlide key={review.id}>
//               <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6">
//                 <p className="text-gray-700 text-lg leading-relaxed mb-4">
//                   {review.text}
//                 </p>
//                 <div className="flex items-center mt-4">
//                   <Image
//                     src={review.logo}
//                     alt={`${review.customer} logo`}
//                     width={40}
//                     height={40}
//                     className="rounded-full"
//                   />
//                   <span className="ml-3 text-gray-800 font-medium">
//                     {review.customer}
//                   </span>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// };

// export default CustomerReviews;

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    id: 1,
    text: "This is a test review. All reviews have the same length for testing alignment.",
    customer: "NNPC",
    logo: "/images/nnpc-logo.png",
  },
  {
    id: 2,
    text: "This is a test review. All reviews have the same length for testing alignment.",
    customer: "Seven30",
    logo: "/images/seven30-logo.png",
  },
  {
    id: 3,
    text: "This is a test review. All reviews have the same length for testing alignment.",
    customer: "Lighter's hub",
    logo: "/images/lightershub-logo.png",
  },
  {
    id: 4,
    text: "This is a test review. All reviews have the same length for testing alignment.",
    customer: "NNPC",
    logo: "/images/nnpc-logo.png",
  },
  {
    id: 5,
    text: "This is a test review. All reviews have the same length for testing alignment.",
    customer: "Seven30",
    logo: "/images/seven30-logo.png",
  },
  {
    id: 6,
    text: "This is a test review. All reviews have the same length for testing alignment.",
    customer: "Lighter's hub",
    logo: "/images/lightershub-logo.png",
  },
];

const CustomerReviews: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-8 md:px-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Customer Reviews
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          pagination={{
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className} w-8 h-1 block mx-1 bg-gray-300 rounded"></span>`,
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 1, // One review per slide on mobile
            },
            768: {
              slidesPerView: 2, // Two reviews per slide on tablets
            },
            1024: {
              slidesPerView: 3, // Three reviews per slide on desktops
            },
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="bg-white border border-gray-200 shadow-lg rounded-lg flex flex-col justify-between items-center p-6 min-h-[350px]">
                  {/* Top Border */}
                  <div className="w-full h-1 bg-yellow-500"></div>

                  {/* Review Text Section */}
                  <div className="text-center flex-grow flex flex-col justify-center relative">
                    {/* Top Left Quote */}
                    <div className="absolute top-0 left-0 text-4xl text-gray-400 -translate-x-4 -translate-y-4">
                      &ldquo;
                    </div>

                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      {review.text}
                    </p>

                    {/* Bottom Right Quote */}
                    <div className="absolute bottom-0 right-0 text-4xl text-gray-400 translate-x-4 translate-y-4">
                      &rdquo;
                    </div>
                  </div>

                  {/* Bottom Border */}
                  <div className="w-full h-1 bg-yellow-500"></div>

                  {/* Logo and Customer Name */}
                  <div className="mt-4 flex items-center justify-center">
                    <Image
                      src={review.logo}
                      alt={`${review.customer} logo`}
                      width={40} // Ensure logos have a fixed width
                      height={40} // Ensure logos have a fixed height
                      className="rounded-full"
                    />
                    <span className="ml-3 text-gray-800 font-medium">
                      {review.customer}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default CustomerReviews;









