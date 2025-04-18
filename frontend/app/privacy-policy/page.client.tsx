// "use client";

// import Navbar from "@/app/components/Navbar";

// export default function PrivacyPolicy() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navbar */}
//       <Navbar />

//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto p-4 md:p-8">
//         <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
//           <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Privacy Policy</h1>
//           <p className="text-sm text-gray-500 mb-4">
//             Effective Date: TBD<br />
//             Contact: <a href="mailto:info@printshopnaija.com.ng" className="text-[#ECAA39] hover:underline">info@printshopnaija.com.ng</a>
//           </p>

//           <section className="mb-6">
//             <h2 className="text-xl md:text-2xl font-semibold mb-3">1. Who We Are</h2>
//             <p className="text-gray-700 text-sm md:text-base">
//               Print Shop Naija is an e-commerce platform that offers a wide range of custom printing services in Nigeria.
//             </p>
//           </section>

//           <section className="mb-6">
//             <h2 className="text-xl md:text-2xl font-semibold mb-3">2. Information We Collect</h2>
//             <ul className="list-disc pl-5 text-gray-700 text-sm md:text-base space-y-2">
//               <li><strong>Personal Information:</strong> Name, email address, phone number, and delivery address.</li>
//               <li><strong>Technical Information:</strong> Browser type, device type, IP address, and other standard logs.</li>
//               <li><strong>Payment Information:</strong> We do NOT collect or store your payment details. All payments are securely processed by our third-party provider, Paystack.</li>
//             </ul>
//           </section>

//           <section className="mb-6">
//             <h2 className="text-xl md:text-2xl font-semibold mb-3">3. How We Collect Data</h2>
//             <p className="text-gray-700 text-sm md:text-base">
//               We collect data when you fill out forms such as account registration and order checkout.<br />
//               <span className="italic">Note: We currently do not use tracking tools (e.g., analytics or cookies), but may introduce them in the future.</span>
//             </p>
//           </section>

//           <section className="mb-6">
//             <h2 className="text-xl md:text-2xl font-semibold mb-3">4. How We Use Your Information</h2>
//             <ul className="list-disc pl-5 text-gray-700 text-sm md:text-base space-y-2">
//               <li>Process and fulfill your orders</li>
//               <li>Send order updates and promotional offers (you can opt out at any time)</li>
//               <li>Improve our website and customer experience</li>
//             </ul>
//           </section>

//           <section className="mb-6">
//             <h2 className="text-xl md:text-2xl font-semibold mb-3">5. Sharing of Information</h2>
//             <ul className="list-disc pl-5 text-gray-700 text-sm md:text-base space-y-2">
//               <li>We do NOT sell your personal information.</li>
//               <li>We may use your contact details to send promotions or advertisements related to Print Shop Naija.</li>
//             </ul>
//           </section>

//           <section className="mb-6">
//             <h2 className="text-xl md:text-2xl font-semibold mb-3">6. Data Storage & Security</h2>
//             <p className="text-gray-700 text-sm md:text-base">
//               Your data is stored on secure servers hosted by Namecheap with SSL encryption, firewall protection, and 24/7 monitoring.
//             </p>
//           </section>

//           <section className="mb-6">
//             <h2 className="text-xl md:text-2xl font-semibold mb-3">7. Your Rights</h2>
//             <p className="text-gray-700 text-sm md:text-base">
//               You have the right to:
//             </p>
//             <ul className="list-disc pl-5 text-gray-700 text-sm md:text-base space-y-2">
//               <li>Request a copy of your data</li>
//               <li>Correct inaccurate information</li>
//               <li>Request deletion of your data</li>
//             </ul>
//             <p className="text-gray-700 text-sm md:text-base mt-2">
//               To exercise these rights, contact us at: <a href="mailto:info@printshopnaija.com.ng" className="text-[#ECAA39] hover:underline">info@printshopnaija.com.ng</a>
//             </p>
//           </section>

//           <section className="mb-6">
//             <h2 className="text-xl md:text-2xl font-semibold mb-3">8. Cookies</h2>
//             <p className="text-gray-700 text-sm md:text-base">
//               We do not currently use cookies. If we implement cookies in the future, we will update this policy and provide options to manage your preferences.
//             </p>
//           </section>

//           <section className="mb-6">
//             <h2 className="text-xl md:text-2xl font-semibold mb-3">9. Children’s Privacy</h2>
//             <p className="text-gray-700 text-sm md:text-base">
//               Our services are not directed at children under 13. If we become aware that we have collected data from a child without parental consent, we will delete it immediately.
//             </p>
//           </section>

//           <section className="mb-6">
//             <h2 className="text-xl md:text-2xl font-semibold mb-3">10. Policy Updates</h2>
//             <p className="text-gray-700 text-sm md:text-base">
//               We may update this Privacy Policy. Major changes will be communicated via email or a notice on our website.
//             </p>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Privacy Policy</h1>
            <p className="text-sm text-gray-500 mb-4">
              Effective Date: TBD<br />
              Contact: <a href="mailto:info@printshopnaija.com.ng" className="text-[#ECAA39] hover:underline">info@printshopnaija.com.ng</a>
            </p>

            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">1. Who We Are</h2>
              <p className="text-gray-700 text-sm md:text-base">
                Print Shop Naija is an e-commerce platform that offers a wide range of custom printing services in Nigeria.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">2. Information We Collect</h2>
              <ul className="list-disc pl-5 text-gray-700 text-sm md:text-base space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and delivery address.</li>
                <li><strong>Technical Information:</strong> Browser type, device type, IP address, and other standard logs.</li>
                <li><strong>Payment Information:</strong> We do NOT collect or store your payment details. All payments are securely processed by our third-party provider, Paystack.</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">3. How We Collect Data</h2>
              <p className="text-gray-700 text-sm md:text-base">
                We collect data when you fill out forms such as account registration and order checkout.<br />
                <span className="italic">Note: We currently do not use tracking tools (e.g., analytics or cookies), but may introduce them in the future.</span>
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">4. How We Use Your Information</h2>
              <ul className="list-disc pl-5 text-gray-700 text-sm md:text-base space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Send order updates and promotional offers (you can opt out at any time)</li>
                <li>Improve our website and customer experience</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">5. Sharing of Information</h2>
              <ul className="list-disc pl-5 text-gray-700 text-sm md:text-base space-y-2">
                <li>We do NOT sell your personal information.</li>
                <li>We may use your contact details to send promotions or advertisements related to Print Shop Naija.</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">6. Data Storage & Security</h2>
              <p className="text-gray-700 text-sm md:text-base">
                Your data is stored on secure servers hosted by Namecheap with SSL encryption, firewall protection, and 24/7 monitoring.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">7. Your Rights</h2>
              <p className="text-gray-700 text-sm md:text-base">
                You have the right to:
              </p>
              <ul className="list-disc pl-5 text-gray-700 text-sm md:text-base space-y-2">
                <li>Request a copy of your data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
              </ul>
              <p className="text-gray-700 text-sm md:text-base mt-2">
                To exercise these rights, contact us at: <a href="mailto:info@printshopnaija.com.ng" className="text-[#ECAA39] hover:underline">info@printshopnaija.com.ng</a>
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">8. Cookies</h2>
              <p className="text-gray-700 text-sm md:text-base">
                We do not currently use cookies. If we implement cookies in the future, we will update this policy and provide options to manage your preferences.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">9. Children’s Privacy</h2>
              <p className="text-gray-700 text-sm md:text-base">
                Our services are not directed at children under 13. If we become aware that we have collected data from a child without parental consent, we will delete it immediately.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">10. Policy Updates</h2>
              <p className="text-gray-700 text-sm md:text-base">
                We may update this Privacy Policy. Major changes will be communicated via email or a notice on our website.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}