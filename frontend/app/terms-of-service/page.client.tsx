// "use client";

// import Navbar from "@/app/components/Navbar";

// export default function TermsOfService() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navbar */}
//       <Navbar />

//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto p-4 md:p-8">
//         <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
//           <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Terms of Service</h1>
//           <p className="text-sm text-gray-500 mb-4">
//             Effective Date: TBD
//           </p>

//           <section className="mb-6">
//             <h2 className="text-xl md:text-2xl font-semibold mb-3">1. Overview</h2>
//             <p className="text-gray-700 text-sm md:text-base">
//               Print Shop Naija is an online platform for custom printing services. Users can place orders, upload designs, or request graphic design support.
//             </p>
//           </section>

//           <section className="mb-6">
//             <h2 className="text-xl md:text-2xl font-semibold mb-3">2. User Eligibility</h2>
//             <p className="text-gray-700 text-sm md:text-base">
//               Our platform is for users aged 18 and above. Users under 18 must have parental or guardian supervision.
//             </p>
//             <h3 className="text-lg md:text-xl font-medium mt-4 mb-2">Account Creation:</h3>
//             <p className="text-gray-700 text-sm md:text-base">
//               Users must provide accurate information during registration. Accounts must NOT be used to:
//             </p>
//             <ul className="list-disc pl-5 text-gray-700 text-sm md:text-base space-y-2">
//               <li>Impersonate others</li>
//               <li>Upload illegal, offensive, or copyrighted content</li>
//               <li>Abuse or disrupt the service</li>
//             </ul>
//             <p className="text-gray-700 text-sm md:text-base mt-2">
//               We reserve the right to suspend or delete accounts violating these terms.
//             </p>
//           </section>

//           <section className="mb-6">
//             <h2 className="text-xl md:text-2xl font-semibold mb-3">3. Payment and Refunds</h2>
//             <ul className="list-disc pl-5 text-gray-700 text-sm md:text-base space-y-2">
//               <li>All payments are securely processed via Paystack.</li>
//               <li>NO refunds or cancellations are allowed once a print job has started.</li>
//             </ul>
//             <p className="text-gray-700 text-sm md:text-base mt-2">
//               Please double-check your designs and orders before final submission.
//             </p>
//           </section>

//           <section className="mb-6">
//             <h2 className="text-xl md:text-2xl font-semibold mb-3">4. Content and Intellectual Property</h2>
//             <ul className="list-disc pl-5 text-gray-700 text-sm md:text-base space-y-2">
//               <li>Mockups and previews are owned by Print Shop Naija.</li>
//               <li>You retain full ownership of your uploaded designs.</li>
//               <li>By uploading, you grant us permission to use your design solely for fulfilling your order.</li>
//             </ul>
//           </section>

//           <section className="mb-6">
//             <h2 className="text-xl md:text-2xl font-semibold mb-3">5. Account Suspension or Termination</h2>
//             <p className="text-gray-700 text-sm md:text-base">
//               We may suspend or terminate accounts for:
//             </p>
//             <ul className="list-disc pl-5 text-gray-700 text-sm md:text-base space-y-2">
//               <li>Uploading prohibited content</li>
//               <li>Fraudulent activity</li>
//               <li>Violations of our Terms of Service</li>
//               <li>Abusive or threatening behavior toward staff or users</li>
//             </ul>
//           </section>

//           <section className="mb-6">
//             <h2 className="text-xl md:text-2xl font-semibold mb-3">6. Disclaimers and Limitations</h2>
//             <p className="text-gray-700 text-sm md:text-base">
//               We are not liable for:
//             </p>
//             <ul className="list-disc pl-5 text-gray-700 text-sm md:text-base space-y-2">
//               <li>Website downtime or interruptions</li>
//               <li>Loss of uploaded files</li>
//               <li>Delays caused by third-party services (e.g., courier companies or Paystack)</li>
//             </ul>
//           </section>

//           <section className="mb-6">
//             <h2 className="text-xl md:text-2xl font-semibold mb-3">7. Governing Law</h2>
//             <p className="text-gray-700 text-sm md:text-base">
//               These terms are governed by the laws of the Federal Republic of Nigeria. Disputes may be resolved through arbitration or legal proceedings within Nigerian jurisdiction.
//             </p>
//           </section>

//           <section className="mb-6">
//             <h2 className="text-xl md:text-2xl font-semibold mb-3">8. User Content</h2>
//             <p className="text-gray-700 text-sm md:text-base">
//               You retain full ownership of your designs. We use them only to fulfill your order and do not resell or reproduce them for any other purpose.
//             </p>
//           </section>

//           <section className="mb-6">
//             <h2 className="text-xl md:text-2xl font-semibold mb-3">9. Updates to Terms</h2>
//             <p className="text-gray-700 text-sm md:text-base">
//               We may update these terms periodically. You will be notified via email or on-site notification. Continued use of our service implies acceptance of the updated terms.
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

export default function TermsOfService() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Terms of Service</h1>
            <p className="text-sm text-gray-500 mb-4">
              Effective Date: TBD
            </p>

            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">1. Overview</h2>
              <p className="text-gray-700 text-sm md:text-base">
                Print Shop Naija is an online platform for custom printing services. Users can place orders, upload designs, or request graphic design support.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">2. User Eligibility</h2>
              <p className="text-gray-700 text-sm md:text-base">
                Our platform is for users aged 18 and above. Users under 18 must have parental or guardian supervision.
              </p>
              <h3 className="text-lg md:text-xl font-medium mt-4 mb-2">Account Creation:</h3>
              <p className="text-gray-700 text-sm md:text-base">
                Users must provide accurate information during registration. Accounts must NOT be used to:
              </p>
              <ul className="list-disc pl-5 text-gray-700 text-sm md:text-base space-y-2">
                <li>Impersonate others</li>
                <li>Upload illegal, offensive, or copyrighted content</li>
                <li>Abuse or disrupt the service</li>
              </ul>
              <p className="text-gray-700 text-sm md:text-base mt-2">
                We reserve the right to suspend or delete accounts violating these terms.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">3. Payment and Refunds</h2>
              <ul className="list-disc pl-5 text-gray-700 text-sm md:text-base space-y-2">
                <li>All payments are securely processed via Paystack.</li>
                <li>NO refunds or cancellations are allowed once a print job has started.</li>
              </ul>
              <p className="text-gray-700 text-sm md:text-base mt-2">
                Please double-check your designs and orders before final submission.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">4. Content and Intellectual Property</h2>
              <ul className="list-disc pl-5 text-gray-700 text-sm md:text-base space-y-2">
                <li>Mockups and previews are owned by Print Shop Naija.</li>
                <li>You retain full ownership of your uploaded designs.</li>
                <li>By uploading, you grant us permission to use your design solely for fulfilling your order.</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">5. Account Suspension or Termination</h2>
              <p className="text-gray-700 text-sm md:text-base">
                We may suspend or terminate accounts for:
              </p>
              <ul className="list-disc pl-5 text-gray-700 text-sm md:text-base space-y-2">
                <li>Uploading prohibited content</li>
                <li>Fraudulent activity</li>
                <li>Violations of our Terms of Service</li>
                <li>Abusive or threatening behavior toward staff or users</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">6. Disclaimers and Limitations</h2>
              <p className="text-gray-700 text-sm md:text-base">
                We are not liable for:
              </p>
              <ul className="list-disc pl-5 text-gray-700 text-sm md:text-base space-y-2">
                <li>Website downtime or interruptions</li>
                <li>Loss of uploaded files</li>
                <li>Delays caused by third-party services (e.g., courier companies or Paystack)</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">7. Governing Law</h2>
              <p className="text-gray-700 text-sm md:text-base">
                These terms are governed by the laws of the Federal Republic of Nigeria. Disputes may be resolved through arbitration or legal proceedings within Nigerian jurisdiction.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">8. User Content</h2>
              <p className="text-gray-700 text-sm md:text-base">
                You retain full ownership of your designs. We use them only to fulfill your order and do not resell or reproduce them for any other purpose.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">9. Updates to Terms</h2>
              <p className="text-gray-700 text-sm md:text-base">
                We may update these terms periodically. You will be notified via email or on-site notification. Continued use of our service implies acceptance of the updated terms.
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