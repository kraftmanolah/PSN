

// "use client";

// import React, { useRef, useState } from "react";

// interface DesignSpecificationsProps {
//   setDesignFile: (file: File | null) => void;
//   setAdditionalInfo: (info: string) => void;
//   designFile: File | null;
//   additionalInfo: string;
//   isEditingInfo: boolean;
//   onSaveInfo: () => void;
//   onEditInfo: () => void;
//   setIsEditingInfo: (value: boolean) => void; // Add setIsEditingInfo to props
// }

// const DesignSpecifications: React.FC<DesignSpecificationsProps> = ({
//   setDesignFile,
//   setAdditionalInfo,
//   designFile,
//   additionalInfo,
//   isEditingInfo,
//   onSaveInfo,
//   onEditInfo,
//   setIsEditingInfo,
// }) => {
//   const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
//   const [showCustomDesignOptions, setShowCustomDesignOptions] = useState(false);
//   const [selectedOption, setSelectedOption] = useState<"upload" | "custom" | "">("");
//   const uploadInputRef = useRef<HTMLInputElement>(null);
//   const customUploadRef = useRef<HTMLInputElement>(null);

//   const handleUploadDesign = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const file = event.target.files[0];
//       setDesignFile(file);
//       setSelectedOption("upload");
//     }
//   };

//   const handleUploadCustomDesign = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const file = event.target.files[0];
//       setDesignFile(file);
//       setSelectedOption("custom");
//     }
//   };

//   // Open the modal when editing
//   React.useEffect(() => {
//     if (isEditingInfo) {
//       setShowAdditionalInfo(true);
//     }
//   }, [isEditingInfo]);

//   return (
//     <div className="mt-4">
//       <h2 className="text-xl font-semibold mb-4 text-center">Help Us Give You the Best Services</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div
//           className={`border-2 p-6 text-center rounded-lg bg-white flex flex-col items-center ${
//             selectedOption === "custom" ? "opacity-50 pointer-events-none" : ""
//           }`}
//         >
//           {!designFile || selectedOption !== "upload" ? (
//             <>
//               <span className="text-3xl">📤</span>
//               <p className="text-gray-600 font-medium mt-2">Upload your Own Design</p>
//               <p className="text-gray-500 text-sm mt-2">
//                 <span
//                   className="text-yellow-500 font-semibold cursor-pointer"
//                   onClick={() => uploadInputRef.current?.click()}
//                 >
//                   Click Here
//                 </span>{" "}
//                 to upload your file or drag and drop.
//               </p>
//               <p className="text-gray-400 text-xs mt-1">Supported File Formats: JPG, PNG, PDF, DOCX (5MB Max)</p>
//               <input
//                 ref={uploadInputRef}
//                 type="file"
//                 className="hidden"
//                 onChange={handleUploadDesign}
//                 accept="image/*,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//               />
//             </>
//           ) : (
//             <>
//               <p className="text-gray-600 font-medium mb-2">Custom Design</p>
//               <div className="bg-gray-100 p-3 rounded-lg w-full flex justify-between items-center">
//                 <div>
//                   <p className="text-gray-700 font-medium">{designFile.name}</p>
//                   <p className="text-xs text-green-600">
//                     ✅ 100% ({(designFile.size / 1024).toFixed(2)}KB) • Upload Successful
//                   </p>
//                 </div>
//               </div>
//             </>
//           )}
//           {!additionalInfo && (
//             <button
//               className="mt-3 text-yellow-500 font-semibold"
//               onClick={() => setShowAdditionalInfo(true)}
//             >
//               ➕ Add Other Information
//             </button>
//           )}
//         </div>
//         <div
//           className={`border-2 p-6 text-center rounded-lg bg-yellow-50 flex flex-col items-center ${
//             selectedOption === "upload" ? "opacity-50 pointer-events-none" : ""
//           }`}
//         >
//           <span className="text-3xl">✈️</span>
//           <p className="text-gray-600 font-medium mt-2">Request a Custom Design</p>
//           <p className="text-gray-500 text-sm mt-2 text-center">
//             Upload a design inspo so we can help you create something good, or just leave a message.
//           </p>
//           {!showCustomDesignOptions ? (
//             <button
//               className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg"
//               onClick={() => setShowCustomDesignOptions(true)}
//             >
//               Send a Request
//             </button>
//           ) : (
//             <>
//               {!designFile || selectedOption !== "custom" ? (
//                 <button
//                   className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg"
//                   onClick={() => customUploadRef.current?.click()}
//                 >
//                   Upload Inspo (Optional)
//                 </button>
//               ) : (
//                 <div className="bg-gray-100 p-3 rounded-lg w-full flex justify-between items-center mt-3">
//                   <div>
//                     <p className="text-gray-700 font-medium">{designFile.name}</p>
//                     <p className="text-xs text-green-600">
//                       ✅ 100% ({(designFile.size / 1024).toFixed(2)}KB) • Upload Successful
//                     </p>
//                   </div>
//                 </div>
//               )}
//               <input
//                 ref={customUploadRef}
//                 type="file"
//                 className="hidden"
//                 onChange={handleUploadCustomDesign}
//                 accept="image/*,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//               />
//               {!additionalInfo && (
//                 <button
//                   className="mt-3 text-yellow-500 font-semibold"
//                   onClick={() => setShowAdditionalInfo(true)}
//                 >
//                   ➕ Add Other Information
//                 </button>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//       {showAdditionalInfo && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
//           <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
//             <button
//               className="absolute top-3 right-3 text-gray-600 text-xl"
//               onClick={() => {
//                 setShowAdditionalInfo(false);
//                 if (isEditingInfo) {
//                   setIsEditingInfo(false); // Reset editing state if closing without saving
//                 }
//               }}
//             >
//               ✖
//             </button>
//             <h3 className="text-xl font-semibold mb-4 text-gray-800">Additional Information</h3>
//             <textarea
//               className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-yellow-500"
//               rows={4}
//               value={additionalInfo}
//               onChange={(e) => setAdditionalInfo(e.target.value)}
//               placeholder="Add extra information for better service..."
//             ></textarea>
//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 className="px-4 py-2 bg-gray-300 rounded-lg"
//                 onClick={() => {
//                   setShowAdditionalInfo(false);
//                   if (isEditingInfo) {
//                     setIsEditingInfo(false); // Reset editing state if closing without saving
//                   }
//                 }}
//               >
//                 Back
//               </button>
//               <button
//                 className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
//                 onClick={() => {
//                   setShowAdditionalInfo(false);
//                   onSaveInfo();
//                 }}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DesignSpecifications;


"use client";

import React, { useRef, useState } from "react";

interface DesignSpecificationsProps {
  setDesignFile: (file: File | null) => void;
  setAdditionalInfo: (info: string) => void;
  designFile: File | null;
  additionalInfo: string;
  isEditingInfo: boolean;
  onSaveInfo: () => void;
  onEditInfo: () => void;
  setIsEditingInfo: (value: boolean) => void;
}

const DesignSpecifications: React.FC<DesignSpecificationsProps> = ({
  setDesignFile,
  setAdditionalInfo,
  designFile,
  additionalInfo,
  isEditingInfo,
  onSaveInfo,
  onEditInfo,
  setIsEditingInfo,
}) => {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [showCustomDesignOptions, setShowCustomDesignOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<"upload" | "custom" | "">("");
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const customUploadRef = useRef<HTMLInputElement>(null);

  const handleUploadDesign = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setDesignFile(file);
      setSelectedOption("upload");
    }
  };

  const handleUploadCustomDesign = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setDesignFile(file);
      setSelectedOption("custom");
    }
  };

  // Open the modal when editing
  React.useEffect(() => {
    if (isEditingInfo) {
      setShowAdditionalInfo(true);
    }
  }, [isEditingInfo]);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Help Us Give You the Best Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={`border-2 p-6 text-center rounded-lg bg-white flex flex-col items-center ${
            selectedOption === "custom" ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {!designFile || selectedOption !== "upload" ? (
            <>
              <span className="text-3xl">📤</span>
              <p className="text-gray-600 font-medium mt-2">Upload your Own Design</p>
              <p className="text-gray-500 text-sm mt-2">
                <span
                  className="text-yellow-500 font-semibold cursor-pointer"
                  onClick={() => uploadInputRef.current?.click()}
                >
                  Click Here
                </span>{" "}
                to upload your file or drag and drop.
              </p>
              <p className="text-gray-400 text-xs mt-1">Supported File Formats: JPG, PNG, PDF, DOCX (5MB Max)</p>
              <input
                ref={uploadInputRef}
                type="file"
                className="hidden"
                onChange={handleUploadDesign}
                accept="image/*,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              />
            </>
          ) : (
            <>
              <p className="text-gray-600 font-medium mb-2">Custom Design</p>
              <div className="bg-gray-100 p-3 rounded-lg w-full flex justify-between items-center">
                <div>
                  <p className="text-gray-700 font-medium">{designFile.name}</p>
                  <p className="text-xs text-green-600">
                    ✅ 100% ({(designFile.size / 1024).toFixed(2)}KB) • Upload Successful
                  </p>
                </div>
              </div>
            </>
          )}
          {!additionalInfo && (
            <button
              className="mt-3 text-yellow-500 font-semibold"
              onClick={() => setShowAdditionalInfo(true)}
            >
              ➕ Add Other Information
            </button>
          )}
        </div>
        <div
          className={`border-2 p-6 text-center rounded-lg bg-yellow-50 flex flex-col items-center ${
            selectedOption === "upload" ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <span className="text-3xl">✈️</span>
          <p className="text-gray-600 font-medium mt-2">Request a Custom Design</p>
          <p className="text-gray-500 text-sm mt-2 text-center">
            Upload a design inspo so we can help you create something good, or just leave a message.
          </p>
          <p className="text-red-500 text-xs mt-2 italic">
            *Note: Requesting a custom design may attract an additional fee, communicated after order review.
          </p>
          {!showCustomDesignOptions ? (
            <button
              className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setShowCustomDesignOptions(true)}
            >
              Send a Request
            </button>
          ) : (
            <>
              {!designFile || selectedOption !== "custom" ? (
                <button
                  className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => customUploadRef.current?.click()}
                >
                  Upload Inspo (Optional)
                </button>
              ) : (
                <div className="bg-gray-100 p-3 rounded-lg w-full flex justify-between items-center mt-3">
                  <div>
                    <p className="text-gray-700 font-medium">{designFile.name}</p>
                    <p className="text-xs text-green-600">
                      ✅ 100% ({(designFile.size / 1024).toFixed(2)}KB) • Upload Successful
                    </p>
                  </div>
                </div>
              )}
              <input
                ref={customUploadRef}
                type="file"
                className="hidden"
                onChange={handleUploadCustomDesign}
                accept="image/*,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              />
              {!additionalInfo && (
                <button
                  className="mt-3 text-yellow-500 font-semibold"
                  onClick={() => setShowAdditionalInfo(true)}
                >
                  ➕ Add Other Information
                </button>
              )}
            </>
          )}
        </div>
      </div>
      {showAdditionalInfo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-600 text-xl"
              onClick={() => {
                setShowAdditionalInfo(false);
                if (isEditingInfo) {
                  setIsEditingInfo(false);
                }
              }}
            >
              ✖
            </button>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Additional Information</h3>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-yellow-500"
              rows={4}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Add extra information for better service..."
            ></textarea>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => {
                  setShowAdditionalInfo(false);
                  if (isEditingInfo) {
                    setIsEditingInfo(false);
                  }
                }}
              >
                Back
              </button>
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                onClick={() => {
                  setShowAdditionalInfo(false);
                  onSaveInfo();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignSpecifications;